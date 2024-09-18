"use client";
import React from "react";
import { useCreateEntity } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

const CartDelete = ({ id, handleAdd }: { id: number; handleAdd: any }) => {
  const { mutate, isPending } = useCreateEntity("addToCartQuantity", "cart");

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        mutate({ item_id: id, qty: 0 });
        if (!isPending) handleAdd(id);
      }}
      variant={"ghost"}
      className=" rounded-full"
    >
      <XIcon className=" w-4 h-4 lg:w-5 lg:h-5" />
    </Button>
  );
};

export default CartDelete;
