"use client";
import React, { useState, useTransition } from "react";
import CustomForm from "./CustomForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCustom from "./ModalCustom";
import { Button } from "@/components/ui/button";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
const schema = z.object({
  // name: z.string(),
  phone: z.union([z.string().min(1, { message: "Phone is required" }), z.number()]),
  country_id: z.union([z.string().min(1, { message: "Country is required" }), z.number()]),
  state_id: z.union([z.string().min(1, { message: "State is required" }), z.number()]),
  address: z.string().min(1, { message: "Address is required" }),
});
const AddressForm = ({ item }: { item?: any }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      // name: item?.name || "",
      phone: item?.phone || "",
      address: item?.address || "",
      country_id: item?.country_id || "",
      state_id: item?.state_id || "",
    },
  });
  const [open, setIsOpen] = useState(false);
  const { userSettings, loading } = useAuth();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      startTransition(async () => {
        //@ts-ignore
        const country_key = data.phone.toString().slice(0, 2);
        const res = item
          ? await Server({
              resourceName: "updateEntity",
              entityName: "shipping-addresses",
              body: { ...data, country_key, user_id: userSettings?.user_id },
              id: item.id,
            })
          : await Server({
              resourceName: "createShipping",
              entityName: "shipping-addresses",
              body: { ...data, country_key, user_id: userSettings?.user_id },
            });
        console.log(res);
        router.refresh();
        if (res.status) toast.success(res.message);
        if (!res.status) toast.error(res.message);
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const shippingArray = [
    // {
    //   name: "name",
    //   placeholder: "YOUR NAME",
    // },
    { name: "phone", phone: true, placholder: "COUNTRY KEY", type: "text" },
    { country: true, countryName: "country_id", stateName: "state_id" },

    { name: "address", placeholder: "YOUR ADDRESS" },
  ];
  return (
    <ModalCustom
      cancelBtn={false}
      btn={
        <Button
          className={`min-w-[130px] w-fit  bg-main2 hover:bg-white hover:border-main2 border hover:text-main2 text-white text-sm  rounded-full  px-6   flex items-center gap-2 duration-150`}
        >
          {item ? "EDIT" : "ADD SHIPPING ADDRESS"}
        </Button>
      }
      content={
        <div className=" px-20">
          <CustomForm
            isPending={isPending}
            disabled={loading || isPending}
            btnStyles="my-2"
            cancel={() => setIsOpen(false)}
            form={form}
            onSubmit={onSubmit}
            inputs={shippingArray}
          />
        </div>
      }
    />
  );
};
export default AddressForm;
