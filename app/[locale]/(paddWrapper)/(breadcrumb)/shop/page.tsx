import DesktopOnly from "@/app/components/DesktopOnly";
import Empty from "@/app/components/Empty";
import FilterMobile from "@/app/components/FilterPhone";
import Filters from "@/app/components/Filters";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MobileOnly from "@/app/components/MobileOnly";
import MotionContainer from "@/app/components/MotionContainer";
import MotionItem from "@/app/components/MotionItem";
import Products from "@/app/components/Products";
import Sort from "@/app/components/Sort";
import { Server } from "@/app/main/Server";
import { cn } from "@/lib/utils";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

const page = async ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  const { price_from, price_to, category_id, brand_id, page, sort, color, wight, search } = searchParams;
  unstable_setRequestLocale(locale);
  const queryParams = new URLSearchParams({
    price_from: price_from || "",
    price_to: price_to || "",
    category_id: category_id || "",
    brand_id: brand_id || "",
    page: page || "1",
    sort: sort || "",
    search: search || "",
    itemsCount: "18",
  });
  if (category_id) {
    const categoryIds = Array.isArray(category_id) ? category_id : [category_id];
    categoryIds.forEach((id) => queryParams.append("category_id[]", id));
  }

  // Handle attributes (color & weight)
  const array = color
    ?.split(",")
    .concat(wight?.split(","))
    .filter((f) => f !== undefined);

  if (array) {
    array.forEach((element) => {
      const [key, value] = element.split(":");
      if (key && value) {
        queryParams.append(`attributes[${key}][]`, value);
      }
    });
  }
  const t = await getTranslations({ locale });
  const data = await Server({
    resourceName: "getSearch",
    queryParams,
    cache: 3600,
  });

  const { products, categories, attributes, tags, count } = data;
  const totalPages = Math.ceil(count / 18);
  return (
    <MaxWidthWrapper className=" ">
      {" "}
      <section className="  lg:overflow-x-visible overflow-x-hidden  min-h-screen  ">
        <div className=" flex justify-center">
          <section className=" flex flex-col w-full lg:grid lg:gap-10 lg:grid-cols-9  mt-5 ">
            <DesktopOnly>
              <div className="col-span-3 lg:block hidden">
                <Filters filters={[categories, attributes, tags]} />
              </div>
            </DesktopOnly>
            <div className=" lg:col-span-6 grid-cols-3 ">
              <div className="  gap-3 w-full flex-col md:flex-row  flex  lg:items-center sm:flex-row flex-grow justify-between">
                <div className={cn("flex  gap-1  items-center", { " flex-row-reverse": locale === "ar" })}>
                  <h4 className=" text-black font-semibold">{data.count}</h4>{" "}
                  <p className={cn(`text-muted-foreground flex items-center  ml-2`)}>
                    {t("found")}
                    {search ? (
                      <span>
                        {" "}
                        <span className=" font-semibold text-main"> {search}</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-auto ">
                  <Sort
                    options={[
                      { label: t("lth"), value: "price_lth" },
                      {
                        label: t("htl"),
                        value: "price_htl",
                      },
                      {
                        label: t("latest"),
                        value: "",
                      },
                    ]}
                  />
                  <MobileOnly>
                    <FilterMobile filters={[categories, attributes, tags]} />
                  </MobileOnly>
                </div>
              </div>
              {products.length > 0 ? (
                <MotionContainer className="grid duration-150 overflow-x-hidden   w-full grid-cols-2  md:grid-cols-3 lg:grid-cols-3 items-center gap-3 mt-10 ">
                  <Products totalPages={totalPages} products={products} />
                </MotionContainer>
              ) : (
                <div className=" mt-10">
                  <Empty textLink={t("Reset Filters")} link="/shop" text={t("empty")} />
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default page;
