"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPriceWithCommas } from "@/lib/utils";
import { useTranslations } from "next-intl";

const PriceWithSale = ({
  price,
  discount,
  size = "lg",pricetext=false
}: {
  price: number | string;
  discount?: number | null;
  size?: "lg" | "sm" | "xs";pricetext?:boolean
}) => {
  const t = useTranslations();
  const { generalSettings, loading, isStoreActive } = useAuth();
  if (loading) return <Skeleton />;
  const { default_currency } = generalSettings;
  console.log(default_currency);
  if (!isStoreActive) return null;
  return (
    <div className="flex  gap-1">
       { pricetext && <h2>{t("price")} :</h2>}
      <div className=" isStore flex flex-wrap gap-3 items-center">
        <bdi
          className={`${
            size === "sm"
              ? "text-base text-black"
              : size === "xs"
              ? "text-xs text-black"
              : "text-3xl md:text-2xl text-main2 font-semibold"
          }  text-nowrap  `}
        >
          {formatPriceWithCommas(Number(price))} {default_currency?.code}
        </bdi>
        {discount && (
          <del
            className={`  ${
              size === "xs" ? "text-xs" : "text-sm md:text-base"
            }   mx-2 font-medium text-muted-foreground `}
          >
            {formatPriceWithCommas(Number(discount))} {default_currency?.code}
          </del>
        )}{" "}
      </div>
    </div>
  );
};

export default PriceWithSale;
