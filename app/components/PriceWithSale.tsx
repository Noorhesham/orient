"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const PriceWithSale = ({
  price,
  discount,
  size = "lg",
}: {
  price: number;
  discount?: number | null;
  size?: "lg" | "sm";
}) => {
  const { generalSettings, loading } = useAuth();
  if (loading) return <Skeleton />;
  const { default_currency } = generalSettings;
  console.log(default_currency);
  return (
    <div>
      <div className="  flex items-center">
        <bdi
          className={`${size === "sm" ? "text-base text-black" : "text-3xl md:text-2xl text-main2 font-semibold"}   `}
        >
          {price} {default_currency?.code}
        </bdi>
        {discount && (
          <del className=" mt-5 mx-3  md:text-base font-medium text-muted-foreground ">
            {discount} {default_currency?.code}
          </del>
        )}{" "}
      </div>
    </div>
  );
};

export default PriceWithSale;
