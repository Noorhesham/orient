"use client";
import React, { useState } from "react";
import CustomForm, { InputProps } from "./CustomForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalCustom from "./ModalCustom";
import CustomButton from "./CustomButton";
const schema = z.object({
  name: z.string(),
  phone: z.string().email(),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  postalCode: z.string(),
});
const AddressForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [open, setIsOpen] = useState(false);
  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  const shippingArray = [
    {
      name: "name",
      placeholder: "YOUR NAME",
    },
    { name: "phone", phone: true, select: true, placholder: "COUNTRY KEY" },
    { name: "country", placeholder: "COUNTRY" },
    { name: "city", placeholder: "city" },
    { name: "street", placeholder: "YOUR STREET" },
    { name: "postal code", placeholder: "YOUR POSTAL CODE" },
  ];
  return (
    <ModalCustom cancelBtn={false}
      btn={<CustomButton text="ADD SHIPPING ADDRESS" />}
      content={
        <div className=" px-20">
          <CustomForm 
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
