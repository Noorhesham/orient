"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPriceWithCommas } from "@/lib/utils";

const PriceWithSale = ({
  price,
  discount,
  size = "lg",
}: {
  price: number|string;
  discount?: number | null;
  size?: "lg" | "sm"|"xs";
}) => {
  const { generalSettings, loading } = useAuth();
  if (loading) return <Skeleton />;
  const { default_currency } = generalSettings;
  console.log(default_currency);
  return (
    <div>
      <div className="  flex flex-wrap gap-3 items-center">
        <bdi
          className={`${size === "sm" ? "text-base text-black":size==='xs'?"text-xs text-black" : "text-3xl md:text-2xl text-main2 font-semibold"}  text-nowrap  `}
        >
          {formatPriceWithCommas(price)} {default_currency?.code}
        </bdi>
        {discount && (
          <del className={`  ${size==='xs'?"text-xs":"text-sm md:text-base"}  font-medium text-muted-foreground `}>
            {formatPriceWithCommas(discount)} {default_currency?.code}
          </del>
        )}{" "}
      </div>
    </div>
  );
};

export default PriceWithSale;
