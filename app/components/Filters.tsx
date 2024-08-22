import React, { ReactNode } from "react";
import Box from "./Box";
import PriceFilter from "./PriceFilter";

const Filters = ({ colseBtn }: { colseBtn?: ReactNode }) => {
  return (
    <div className="  max-h-screen   rounded-2xl border bg-white shadow-md border-gray-400 overflow-y-auto lg:max-h-full col-span-full ">
      <div className="   flex flex-col py-4  px-3">
        {colseBtn}
        <Box filter="category" text="Category" options={["All", "Paints", "Accessories", "Tools"]} />
        <PriceFilter />
        <Box
          filter="colors"
          text="Popular Colors"
          options={[
            "#3F3F46",
            "#F43F5E",
            "#FECDD3",
            "#DB2777",
            "#A21CAF",
            "#7E22CE",
            "#1D4ED8",
            "#0369A1",
            "#99F6E4",
            "#2DD4BF",
            "#854D0E",
            "#713F12",
            "#FDE68A",
            "#B91C1C",
            "#7F1D1D",
            "#1E293B",
          ]}
        />
        <Box
          filter="tags"
          text="POPULAR TAGS"
          options={[
            "Color Trend",
            "wall paints",
            "paints",
            "master paints",
            "colors",
            "trends",
            "color trends",
            "paints",
          ]}
        />
      </div>
    </div>
  );
};

export default Filters;
