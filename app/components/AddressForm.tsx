"use client";
import React, { useRef, useState, useTransition } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { DialogClose } from "@/components/ui/dialog";
const schema = z.object({
  // name: z.string(),

  phone: z.any(),
  country_id: z.union([z.string().min(1, { message: "Country is required" }), z.number()]),
  state_id: z.union([z.string(), z.number()]),
  city_id: z.union([z.string(), z.number()]),
  address: z.string().min(1, { message: "Address is required" }),
});

const AddressForm = ({ item, setDefaultShipping }: { item?: any; setDefaultShipping?: any }) => {
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      // name: item?.name || "",
      phone: {
        phone: `${item?.phone}` || "",
        country_key: item?.country_key || "",
      },
      address: item?.address || "",
      country_id: item?.country_id || "",
      state_id: item?.state_id || "",
      city_id: item?.city_id || "",
    },
  });
  const [open, setIsOpen] = useState(false);
  const { userSettings, loading } = useAuth();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const closeModal = useRef();
  console.log(form.formState.errors);
  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      startTransition(async () => {
        //@ts-ignore
        const country_key = data.phone.country_key;
        const phone = data.phone.phone;
        const res = item
          ? await Server({
              resourceName: "updateEntity",
              entityName: "shipping-addresses",
              body: { ...data, country_key, user_id: userSettings?.user_id, phone },
              id: item.id,
            })
          : await Server({
              resourceName: "createShipping",
              entityName: "shipping-addresses",
              body: { ...data, country_key, phone, user_id: userSettings?.user_id },
            });
        console.log(res);
        router.refresh();
        if (res.status) {
          toast.success(res.message);
          form.reset();
          closeModal.current.click();
          queryClient.invalidateQueries({ queryKey: ["checkout"] });
          setDefaultShipping && setDefaultShipping(res.id);
          // router.push("/success");
        }
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
    {
      name: "phone",
      phone: true,
      placholder: "COUNTRY KEY",
      type: "text",
      required: true,
      returnFullPhone: false,
      label: t("address.phone"),
    },
    { country: true, countryName: "country_id", stateName: "state_id", cityName: "city_id" },

    { name: "address", placeholder: t("address.title"), label: t("address.title") },
  ];

  return (
    <ModalCustom
      cancelBtn={false}
      btn={
        <Button
          className={`min-w-[130px] w-fit  bg-main2 hover:bg-white hover:border-main2 border hover:text-main2 text-white text-sm  rounded-full  px-6   flex items-center gap-2 duration-150`}
        >
          {item ? t("update") : t("addshipping")}
        </Button>
      }
      content={
        <div className="  px-5 lg:px-20">
          <CustomForm
            isPending={isPending}
            disabled={loading || isPending}
            btnStyles="my-2"
            cancel={() => setIsOpen(false)}
            form={form}
            onSubmit={onSubmit}
            inputs={shippingArray}
          />
          <DialogClose ref={closeModal} className=" hidden"></DialogClose>
        </div>
      }
    />
  );
};
export default AddressForm;
