"use client";
import IconWidget from "./IconWidget";
import { Location } from "./Icons";
import React, { useEffect, useState, useTransition } from "react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const ShippingList = ({
  user_addresses,
  user_address,
  setSelected,
  selected,
}: {
  user_addresses: any;
  user_address: any;
  defaultShipping?: any;
  setSelected: any;
  selected: any;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const update = async (selected: string) => {
    startTransition(async () => {
      try {
        const res = await Server({
          resourceName: "updateCart",
          body: { address_id: selected },
        });
        if (res.status) {
          toast.success(res.message);
          router.refresh();
        } else {
          toast.error(res.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
      queryClient.invalidateQueries({ queryKey: ["checkout"] });
    });
  };

  useEffect(() => {
    if (selected) update(selected);
  }, [selected]);
  console.log(selected);
  return (
    <div className="flex flex-col gap-4 mt-4 items-start">
      {/* Default Address */}

      {/* Other Addresses */}
      {user_addresses.map((item: any) => (
        <label
          onClick={() => setSelected(item.id)}
          htmlFor={`address${item.id}`}
          className="flex items-center gap-2"
          key={item.id}
        >
          <input
            disabled={isPending}
            value={item.id}
            checked={selected === item.id}
            name="shipping-address"
            type="radio"
            id={`address${item.id}`}
          />
          <IconWidget paragraph={item.address} icon={<Location />} />
        </label>
      ))}
    </div>
  );
};

export default ShippingList;
