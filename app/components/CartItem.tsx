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
}) => {
  const { text, price, discount, img, wishlist, size, nocheck, quantity, id, productId, retrive, remove, handleAdd } =
    props;
  const { mutate, isPending } = useCreateEntity("addToCart", "cart");
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <div>
      <div className=" flex   items-center">
        {retrive && (
          <TrashIcon
            className=" text-red-500 hover:text-red-600 duration-150 cursor-pointer
          mx-3"
            onClick={() => remove(id)}
          />
        )}
        <div className=" flex  items-center gap-2">
          {!nocheck && <CartDelete handleAdd={handleAdd} id={id} />}
          <Link
            href={`/product/${productId}?child=true`}
            className={`${retrive && " grayscale"} aspect-square relative w-full h-20`}
          >
            <Image src={img} fill alt="product" className=" object-contain" />
          </Link>
        </div>
        <div className="flex ml-3 flex-col">
          <Link
            href={`/product/${productId}?child=true`}
            className={cn(" uppercase line-clamp-1  font-semibold text-xs md:text-base lg:text-lg", {
              "text-sm  text-main": size && size === "sm",
            })}
          >
            {text}
          </Link>
          <div className={cn({ "flex items-center gap-1 mt-2 text-xs md:text-sm": size && size === "sm" })}>
            <p className=" text-gray-800"> {<PriceWithSale price={price} size="sm" />}</p>
            <p className=" line-through text-gray-500 text-xs md:text-sm">
              {<PriceWithSale price={discount} size="sm" />}
            </p>
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
            {!nocheck && <Counter handleAdd={handleAdd} value={id} defaultcount={quantity} />}
          </div>
        )}
        {retrive && (
          <Button
            disabled={isPending}
            onClick={() => {
              mutate({ product_id: productId, qty: 1 });
              router.refresh();
              queryClient.invalidateQueries({ queryKey: ["user2_settings"] });
              if (!isPending) remove(id);
            }}
            variant={"default"}
            size={"sm"}
          >
            RETRIVE
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
