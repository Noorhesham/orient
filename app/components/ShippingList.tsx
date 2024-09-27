"use client";
import IconWidget from "./IconWidget";
import { Location } from "./Icons";
import React, { useEffect, useState, useTransition } from "react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ShippingList = ({ user_addresses, user_address }: { user_addresses: any; user_address: any }) => {
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(user_address || ""); // Ensure initial value is set
  const router = useRouter();

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
    });
  };

  useEffect(() => {
    if (selected) update(selected);
  }, [selected]);

  return (
    <div className="flex flex-col items-start">
      {/* Default Address */}
      {user_address && (
        <label
          htmlFor="default"
          onClick={() => {
            setSelected(user_address.id);
          }}
          className="flex items-center gap-2"
        >
          <input
            disabled={isPending}
            value={user_address?.id}
            checked={selected === user_address?.id}
            name="shipping-address"
            type="radio"
            id={"default"}
          />
          <IconWidget paragraph={user_address?.address} header="DEFAULT" icon={<Location />} />
        </label>
      )}

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
