"use client";
import CustomForm from "@/app/components/CustomForm";
import { ArrowRight } from "@/app/components/Icons";
import Logo from "@/app/components/Logo";
import Section from "@/app/components/Section";
import { forgotPasswordSchema } from "@/app/schema";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const forgotArray = [
  {
    name: "email",
    placeholder: "Add Your Email...",
  },
  {
    name: "phone",
    placeholder: "Add Your Phone...",
    phone: true,
  },
];
const ForgotPassword = () => {
  const [useEmail, setUseEmail] = useState(true);
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      useEmail: true,
      email: "",
      phone: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log(data);
  };
  return (
    <Section CustomePadding="px-5 py-10" className=" bg-gray-50 flex flex-1  flex-col items-center">
      <div className=" mx-auto flex flex-col items-center justify-center  w-full  ">
      <Logo size={{ width: 863, height: 338 }} type="blue" />

        <h1 className=" text-center text-2xl mt-8 font-bold text-main2">FORGOT PASSWORD</h1>
        <div className=" w-full mt-5 px-14 flex flex-col ">
          <div className=" text-main2  self-center mx-auto text-base  flex items-center gap-2">
            <p className=" text-main2 font-medium text-sm">BY EMAIL</p>
            <Switch checked={useEmail} onCheckedChange={() => setUseEmail(!useEmail)} />
            <p className=" text-main2 font-medium text-sm">BY PHONE</p>
          </div>
          <CustomForm btnText="SEND" form={form} inputs={forgotArray} onSubmit={onSubmit} />
        </div>
        <div className="  mt-8 text-sm flex items-center">
          <Link
            href={"/login"}
            className="flex items-center gap-2 hover:underline duration-150 ml-1 text-main font-[700]"
          >
            BACK TO LOGIN <ArrowRight />
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default ForgotPassword;
