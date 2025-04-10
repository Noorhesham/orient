"use client";
import { useTranslations } from "next-intl";
import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { useCreateEntity } from "@/lib/queries";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const BuyNow = ({ id }: { id: string }) => {
  const { isStoreActive } = useAuth();
  const { mutate, isPending, data } = useCreateEntity("addToCart", "cart");
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations();
  if (!isStoreActive) return null;

  return (
    <CustomButton
      disabled={isPending}
      onClick={() => {
        mutate({ product_id: id, qty: 1 });
        queryClient.invalidateQueries({ queryKey: ["checkout"] });
        router.push("/checkout");
      }}
      className=" px-8 py-4"
      reverse
      icon={<TbShoppingCartPlus />}
      text={t("buyNow")}
    />
  );
};

export default BuyNow;
