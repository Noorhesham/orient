import React from "react";
import { formatPrice } from "../helpers/utils";

const PriceWithSale = ({ price, discount }: { price: number; discount: number }) => {
  return (
    <div>
      <div className=" mt-2  flex items-end">
        <p className=" text-3xl md:text-2xl font-semibold text-main2">{formatPrice(price)}</p>
        {discount && <p className=" mt-5 ml-3  md:text-base font-medium text-muted-foreground line-through">{formatPrice(discount)}</p>}{" "}
      </div>
    </div>
  );
};

export default PriceWithSale;
