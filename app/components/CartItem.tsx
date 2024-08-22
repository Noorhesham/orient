import { CheckIcon } from "lucide-react";
import { IoIosHeart } from "react-icons/io";

import Image from "next/image";
import React from "react";
import { formatPrice } from "../helpers/utils";
import Counter from "./Counter";
import { cn } from "@/lib/utils";

const CartItem = ({
  ...props
}: {
  text: string;
  price: string;
  discount: string;
  img: string;
  wishlist?: boolean;
  size?: string;
  nocheck?: boolean;
}) => {
  const { text, price, discount, img, wishlist, size, nocheck } = props;
  return (
    <div>
      <div className=" flex items-center">
        <div className=" flex items-center gap-2">
          {!nocheck && <CheckIcon />}
          <div className=" aspect-square relative w-full h-20">
            <Image src={img} fill alt="product" className=" object-contain" />
          </div>
        </div>
        <div className="flex ml-3 flex-col">
          <h1
            className={cn(" uppercase  font-semibold text-xs md:text-base lg:text-lg", {
              "text-sm  text-main": size && size === "sm",
            })}
          >
            {text}
          </h1>
          <div className={cn({ "flex items-center gap-1 mt-2 text-xs md:text-sm": size && size === "sm" })}>
            <p className=" text-gray-800"> {formatPrice(price)}</p>
            <p className=" line-through text-gray-500 text-xs md:text-sm">{formatPrice(discount)}</p>
          </div>
        </div>
        {size !== "sm" && (
          <div className=" flex flex-col items-end gap-2 ml-auto">
            {wishlist && (
              <div className=" flex items-center gap-1">
                <IoIosHeart fill="#E6007E" />{" "}
                <p className=" cursor-pointer text-xs text-muted-foreground">Remove from Wishlist</p>
              </div>
            )}
            {!nocheck && <Counter />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
