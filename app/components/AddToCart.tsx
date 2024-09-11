"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { BsHandbag } from "react-icons/bs";
import { useCreateEntity, useGetEntity } from "@/lib/queries";
import Counter from "./Counter";
import Spinner from "./Spinner";
import { useTranslations } from "next-intl";

const AddToCart = ({ id, max }: { id: number; max?: number }) => {
  console.log(id);
  const { data, isLoading } = useGetEntity("getActiveCart", "cart");
  const { mutate, isPending } = useCreateEntity("addToCart", "cart");
  const t = useTranslations();
  if (isLoading) return <Spinner />;
  const exists = data?.cart.items.find((item: any) => item.product_id === id);
  console.log(exists);
  return exists ? (
    <div className=" flex items-center ">
      <div className=" flex self-center mx-auto  items-center gap-2">
        <h2 className=" text-sm text-black font-medium">{t("amount")}</h2>
        <Counter defaultcount={exists.quantity} max={max} value={exists.id} />
      </div>
    </div>
  ) : (
    <CustomButton
      isPending={isPending}
      onClick={() => mutate({ product_id: id, qty: 1 })}
      className=" px-8 py-4"
      icon={<BsHandbag />}
      text="ADD TO CART"
    />
  );
};

export default AddToCart;
