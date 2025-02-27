import Image from "next/image";
import React, { useEffect, useTransition } from "react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentMethod = ({ logo, name, id, selected, setSelected }: any) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onChange = () => {
    startTransition(async () => {
      try {
        const res = await Server({ resourceName: "updateCart", body: { payment_method_id: id } });
        if (res.status) {
          toast.success(res.message);
          router.refresh();
        } else toast.error(res.message);
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };
  // useEffect(() => {
  //   if (id) onChange();
  // }, []);
  return (
    <label htmlFor={id} className=" flex  gap-2  flex-col items-center">
      <div className=" w-20 h-20 aspect-square relative">
        <Image className=" object-contain" src={logo[0].sizes.large} alt={name} fill />
      </div>
      <p className="text-main2 font-semibold text-xs">{name}</p>
      <input
        disabled={isPending}
        value={id}
        checked={selected}
        name="payment-method"
        onChange={(e) => {
          setSelected(id);
          onChange();
        }}
        type="radio"
        id={id}
      />
    </label>
  );
};

export default PaymentMethod;
