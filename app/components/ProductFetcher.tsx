import React, { Suspense } from "react";
import Filters from "./Filters";
import FilterMobile from "@/app/components/FilterPhone";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import MotionItem from "@/app/components/MotionItem";
import Products from "@/app/components/Products";
import Sort from "@/app/components/Sort";
import { Server } from "../main/Server";
import { getTranslations } from "next-intl/server";
import MobileOnly from "./MobileOnly";
const ProductFetcher = async ({ queryParams, search }: any) => {
  const data = await Server({
    resourceName: "getSearch",
    queryParams,
  });
  const t = await getTranslations();
  const { products, categories, attributes, tags, count } = data;
  const totalPages = Math.ceil(count / 18);
  return (
    <section className=" min-h-screen  ">
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
                    {
                      label: t("latest"),
                      value: "",
                    },
                  ]}
                />
                <MobileOnly>
                  {" "}
                  <FilterMobile filters={[categories, attributes, tags]} />
                </MobileOnly>
              </div>
            </div>

            <MotionContainer
              serverAnimate
              className="grid duration-150  w-full grid-cols-2  md:grid-cols-3 lg:grid-cols-3 items-center gap-3 mt-10 "
            >
              <Products totalPages={totalPages} products={products} />
            </MotionContainer>
          </div>
        </section>
      </MotionItem>
    </section>
  );
};

export default ProductFetcher;
