"use client";
import Section from "@/app/components/Section";
import { useState, useTransition } from "react";
import CustomForm from "@/app/components/CustomForm";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/schema";
import { Server } from "../../Server";
import { useDevice } from "@/app/context/DeviceContext";
import Logo from "@/app/components/Logo";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import { useTranslations } from "next-intl";
import cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
const Signup = () => {
  const t = useTranslations();
  const singup = signupSchema(t);
  const form = useForm({
    resolver: zodResolver(singup),
    defaultValues: {
      useEmail: true,
      email: "",
      name: "",
      password: "",
      referealCode: "",
      sms: false,
      phone: "",
    },
    mode: "onChange",
  });
  const [serverError, setServerError] = useState<string[] | null>(null);
  const { deviceInfo } = useDevice();
  const [isPending, startTransition] = useTransition();
  const [methods, setMethods] = useLocalStorageState([], "methods");
  const router = useRouter();
  const { setLogin } = useAuth();
  const signupArray = [
    {
      name: "phone",
      placeholder: t("ADD_YOUR_PHONE"),
      phone: true,
      returnFullPhone: false,
    },

    {
      name: "password",
      type: "password",
      password: true,
      placeholder: t("ADD_YOUR_PASSWORD"),
    },
    {
      name: "name",
      placeholder: t("ADD_YOUR_NAME"),
    },
    {
      name: "email",
      placeholder: t("ADD_YOUR_EMAIL"),
      optional: true,
    },
    {
      name: "referral_code",
      optional: true,
      placeholder: t("REFERRAL_CODE"),
    },
  ];

  const onSubmit = async (data: z.infer<typeof singup>) => {
    console.log(data);
    //@ts-ignore
    if (data.phone) data.country_key = data.phone.country_key;
    if (data.phone) data.phone = data.phone.phone;
    if (!data.email) delete data.email;

    startTransition(async () => {
      const res = await Server({
        resourceName: "signup",
        body: {
          ...data,
          device_info: deviceInfo,
        },
      });
      console.log(res);
      if (!res.status) setServerError(res.message || res.errors);
      if (res.status) {
        setServerError(null);

        if (res.activation_methods) {
          setMethods(res.activation_methods);
          toast.success(`${res.message} ...`);
          redirect(`/login?uuid=${res.activation_uuid}`);
        } else if (res.token) {
          cookies.set("jwt", res.token);
          setLogin(true);
          router.push("/");
        } else {
          router.push("/login");
          toast.success(`${res.message} ...`);
        }
      }
    });
  };

  return (
    <Section className=" bg-gray-50 flex flex-1 justify-center flex-col items-center">
      <div className=" mx-auto flex flex-col items-center justify-center w-full ">
        <Logo size={{ width: 863, height: 338 }} type="blue" />
        <h1 className="text-center text-2xl mt-5 font-bold text-main2">{t("CREATE_NEW_ACCOUNT")}</h1>
        <div className="w-full px-5 md:px-14 flex flex-col">
          <CustomForm
            btnStyles="w-full"
            isPending={isPending}
            serverError={serverError}
            btnText={t("CREATE")}
            form={form}
            inputs={signupArray}
            onSubmit={onSubmit}
          />
          <div className="mt-4 text-sm flex items-center">
            <span className="font-[400] text-main2">{t("ALREADY_ON_ORIENT")}</span>
            <Link href={"/login"} className="hover:underline duration-150 ml-1 text-main font-[700]">
              {t("LOGIN")}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Signup;
