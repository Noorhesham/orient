"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { BsHandbag } from "react-icons/bs";
import { useCreateEntity } from "@/lib/queries";
import Counter from "./Counter";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const AddToCart = ({
  id,
  max,
  disabled,
  cartStatus,
  reverse = false,
}: {
  id: number;
  max?: number;
  cartCount?: number;
  inCart?: boolean;
  cartId?: any;
  cartStatus?: any;
  disabled?: boolean;
  reverse?: boolean;
}) => {
  const { mutate, isPending, data } = useCreateEntity("addToCart", "cart");
  const queryClient = useQueryClient();
  const t = useTranslations();
  const router = useRouter();
  console.log(cartStatus)
  return cartStatus?.in_cart && cartStatus?.in_cart_count !== 0 ? (
    <div className=" flex items-center ">
      <div className=" flex self-center mx-auto  items-center gap-2">
        <h2 className=" text-sm text-gray-200 lg:text-black font-medium">{t("amount")}</h2>
        <Counter defaultcount={cartStatus.in_cart_count} max={max} value={cartStatus.in_cart_item_id} />
      </div>
    </div>
  ) : (
    <CustomButton
      reverse={reverse}
      disabled={disabled}
      isPending={isPending}
      onClick={() => {
        mutate({ product_id: id, qty: 1 });
        queryClient.invalidateQueries({ queryKey: ["checkout", "cart"] });
        router.refresh();
      }}
      className=" px-8 py-4"
      icon={<BsHandbag />}
      text={disabled ? t("OUT OF STOCK") : t("ADD TO CART")}
    />
  );
};

export default AddToCart;
