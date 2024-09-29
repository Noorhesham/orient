import Card from "@/app/components/Card";
import FilterMobile from "@/app/components/FilterPhone";
import Filters from "@/app/components/Filters";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import MotionItem from "@/app/components/MotionItem";
import { PaginationDemo } from "@/app/components/Pagination";
import Sort from "@/app/components/Sort";
import { Server } from "@/app/main/Server";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React, { Suspense } from "react";

const page = async ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  const { price_from, price_to, category_id, brand_id, page, sort, color, volume, search } = searchParams;
  unstable_setRequestLocale(locale);
  const queryParams = new URLSearchParams({
    price_from: price_from || "",
    price_to: price_to || "",
    category_id: category_id || "",
    brand_id: brand_id || "",
    page: page || "",
    sort: sort || "",
    search: search || "",
  });
  const array = color
    ?.split(",")
    .concat(volume?.split(","))
    .filter((f: any) => f !== undefined);
  if (array) {
    array.forEach((element: any) => {
      console.log(array);
      const [key, value] = element?.split(":");
      queryParams.append(`attributes[${key}][]`, value);
    });
  }

  const t = await getTranslations({ locale });
  const data = await Server({
    resourceName: "getSearch",
    queryParams,
  });

  const { products, categories, attributes, tags, count } = data;

  return (
    <MaxWidthWrapper className=" bg-gray-50">
      <section className=" min-h-screen  ">
        <Suspense>
          <MotionItem nohover initial={{ y: -100 }} animate={{ y: 1 }} className=" flex justify-center">
            <section className=" flex flex-col w-full lg:grid lg:gap-10 lg:grid-cols-9  mt-5 ">
              <div className="col-span-3 lg:block hidden">
                <Filters filters={[categories, attributes, tags]} />
              </div>
              <div className=" lg:col-span-6 grid-cols-3 ">
                <div className="  gap-3 w-full flex-col md:flex-row  flex  lg:items-center sm:flex-row flex-grow justify-between">
                  <div className="flex  gap-1  items-center">
                    <h1 className=" text-black font-semibold">{data.count}</h1>{" "}
                    <p className=" text-muted-foreground ml-2">
                      {t("found")}
                      {search ? (
                        <span>
                          {" "}
                          FOR <span className=" font-semibold text-main"> {search}</span>
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
                      ]}
                    />
                    <FilterMobile filters={[categories, attributes, tags]} />
                  </div>
                </div>
                <MotionContainer
                  serverAnimate
                  className="grid duration-150  w-full grid-cols-2  md:grid-cols-3 lg:grid-cols-3 items-center gap-3 mt-10 "
                >
                  {products.map((product: Product) => (
                    <Card
                      key={product.id}
                      id={product.id || ""}
                      text={product.title}
                      sell={product.sell_price ? product.regular_price : null}
                      img={product.main_cover[0].sizes.medium || "/default-thumbnail.jpg"}
                      price={product.price.toString()}
                    />
                  ))}
                  <div className="flex justify-center col-span-full">
                    <PaginationDemo totalPages={Math.ceil(count / 18)} />
                  </div>
                </MotionContainer>
              </div>
            </section>
          </MotionItem>
        </Suspense>
      </section>
    </MaxWidthWrapper>
  );
};

export default page;
