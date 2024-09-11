"use client";
import React from "react";
import { useCreateEntity } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

const CartDelete = ({ id }: { id: number }) => {
  const { mutate, isPending } = useCreateEntity("addToCartQuantity", "cart");

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate({ item_id: id, qty: 0 })}
      variant={"ghost"}
      className=" rounded-full"
    >
      <XIcon />
    </Button>
  );
};

export default CartDelete;
