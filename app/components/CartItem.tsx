"use client";
import { IoIosHeart } from "react-icons/io";

import Image from "next/image";
import React from "react";
import { formatPrice } from "../helpers/utils";
import Counter from "./Counter";
import { cn } from "@/lib/utils";

import CartDelete from "./CartDelete";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCreateEntity } from "@/lib/queries";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import PriceWithSale from "./PriceWithSale";
import AddToWishlist from "./AddToWishlist";
import { useTranslations } from "next-intl";

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
  quantity?: number;
  id?: any;
  productId: string;
  retrive?: boolean;
  remove?: any;
  handleAdd?: any;
  product_id;
}) => {
  const {
    text,
    price,
    discount,
    img,
    wishlist,
    size,
    nocheck,
    quantity,
    id,
    productId,
    retrive,
    remove,
    handleAdd,
    product_id,
  } = props;
  const { mutate, isPending } = useCreateEntity("addToCart", "cart");
  const router = useRouter();
  const t = useTranslations();
  console.log(id, productId);
  return (
    <div>
      <div className=" flex lg:flex-row flex-col  items-start lg:items-center">
        {retrive && (
          <TrashIcon
            className=" text-red-500 hover:text-red-600 duration-150 cursor-pointer
          mx-3"
            onClick={() => remove(id)}
          />
        )}
        <div className=" flex   items-center gap-2">
          <div className=" flex items-center gap-2">
            {!nocheck && <CartDelete handleAdd={handleAdd} id={id} />}
            <Link
              href={`/product/${productId}?child=true`}
              className={`${retrive && " grayscale"} aspect-square relative w-full h-20`}
            >
              <Image src={img} fill alt="product" className=" object-contain" />
            </Link>
          </div>
          <div className="flex mx-3 flex-col">
            <Link
              href={`/product/${productId}?child=true`}
              className={cn(" uppercase line-clamp-1  font-semibold text-xs md:text-base lg:text-lg", {
                "text-sm  text-main": size && size === "sm",
              })}
            >
              {text}
            </Link>
            <div className={cn({ "flex items-center gap-1 mt-2 text-xs md:text-sm": size && size === "sm" })}>
              {
                <div className=" text-gray-500 text-xs md:text-sm">
                  {<PriceWithSale discount={discount} price={price} size="sm" />}
                </div>
              }
            </div>
          </div>
        </div>
        {size !== "sm" && (
          <div className=" flex flex-col items-end gap-2 mr-auto">
            {wishlist && <AddToWishlist title={text} wishlistStatus={true} noshare id={id} />}
            {quantity && nocheck ? (
              <p className=" text-main2 lg:text-base text-sm font-semibold">
                {t("quantity")} : {quantity}
              </p>
            ) : (
              <Counter handleAdd={handleAdd} value={id} defaultcount={quantity} />
            )}
          </div>
        )}
        {retrive && (
          <Button
            disabled={isPending}
            onClick={() => {
              console.log(id);
              mutate({ product_id: product_id, qty: 1 });
              router.refresh();
              if (!isPending) remove(id);
            }}
            variant={"default"}
            size={"sm"}
          >
            {t("RETRIVE")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
