"use client";
import React, { ReactNode, Suspense } from "react";
import Box from "./Box";
import PriceFilter from "./PriceFilter";
import { useTranslations } from "next-intl";

const Filters = ({ colseBtn, filters }: { colseBtn?: ReactNode; filters?: any }) => {
  const [category, attributes, ] = filters;
  const t = useTranslations("filters");
  return (
    <div className="  max-h-screen   rounded-2xl border bg-white shadow-md border-gray-400 overflow-y-auto lg:max-h-full col-span-full ">
      <div className="   flex flex-col py-4  px-3">
        {colseBtn}
        <Suspense>
          <Box filter="category_id" text={t("category")} options={category} />
          <PriceFilter />
          {attributes?.map((attribute: any) => (
            <Box
              id={attribute.id}
              key={attribute.slug}
              filter={attribute.slug}
              color={attribute.slug === "color"}
              text={attribute.title}
              options={attribute.options}
            />
          ))}
          {/* <Box filter="tags" text={t("tags")} options={tags} /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default Filters;
