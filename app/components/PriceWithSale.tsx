import React from "react";
import { formatPrice } from "../helpers/utils";

const PriceWithSale = ({ price, discount }: { price: number; discount: number }) => {
  return (
    <div>
      <div className=" flex items-end">
        <p className=" text-2xl font-semibold text-main2">{formatPrice(price)}</p>
        {discount && <p className=" mt-5 ml-2 text-muted-foreground line-through">{formatPrice(discount)}</p>}{" "}
      </div>
    </div>
  );
};

export default PriceWithSale;
