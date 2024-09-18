"use client";
import IconWidget from "./IconWidget";
import { Location } from "./Icons";
import React, { useState, useTransition } from "react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ShippingList = ({ user_addresses, user_address }: { user_addresses: any; user_address: any }) => {
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(user_address.id);
  const router = useRouter();

  const onChange = (id: string) => {
    startTransition(async () => {
      try {
        const res = await Server({
          resourceName: "updateCart",
          body: { address_id: id },
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
    });
  };
  console.log(user_address);
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <input
          disabled={isPending}
          value={user_address.id}
          checked={selected === user_address.id}
          name="shipping-address"
          onChange={() => {
            setSelected(user_address.id);
            onChange(user_address.id);
          }}
          type="radio"
          id={user_address.id}
        />
        <IconWidget paragraph={user_address.address} header="DEFAULT" icon={<Location />} />
      </div>

      {user_addresses.map((item: any) => (
        <label htmlFor={`address${item.id}`} className="flex items-center gap-2" key={item.id}>
          <input
            disabled={isPending}
            value={item.id}
            checked={selected === item.id}
            name="shipping-address"
            onChange={() => {
              setSelected(item.id);
              onChange(item.id);
            }}
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
