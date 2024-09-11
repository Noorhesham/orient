import React, { ReactNode } from "react";
import Box from "./Box";
import PriceFilter from "./PriceFilter";

const Filters = ({ colseBtn, filters }: { colseBtn?: ReactNode; filters?: any }) => {
  const [category, attributes, tags] = filters;
  return (
    <div className="  max-h-screen   rounded-2xl border bg-white shadow-md border-gray-400 overflow-y-auto lg:max-h-full col-span-full ">
      <div className="   flex flex-col py-4  px-3">
        {colseBtn}
        <Box filter="category_id" text="Category" options={category} />
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
        <Box filter="tags" text="POPULAR TAGS" options={tags} />
      </div>
    </div>
  );
};

export default Filters;
