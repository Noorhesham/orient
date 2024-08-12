"use client";

import React, { useEffect, useLayoutEffect, useState, useTransition } from "react";
import Section from "@/app/components/Section";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schema";
import CustomForm from "@/app/components/CustomForm";
import Link from "next/link";
import { Server } from "../../Server";
import Logo from "@/app/components/Logo";
import { useDevice } from "@/app/context/DeviceContext";
import Socials from "@/app/components/Socials";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Head1 from "@/app/components/Head1";
import { useParams } from "@/app/hooks/useParams";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import Methods from "./Methods";
import { InputOTPPattern } from "./OTP";

const Login = () => {
  const [useEmail, setUseEmail] = useState(false);
  const [activate, setActivate] = useState(false);
  const [methods, setMethods] = useLocalStorageState([], "methods");
  const [message, setMessage] = useLocalStorageState("", "message");
  const [isCode, setIsCode] = useState("");
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      useEmail: false,
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const [param, handleParam, deleteParam] = useParams("uuid", "");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { deviceInfo } = useDevice();
  const [serverError, setServerError] = useState<string[] | null>(null);
  const [isPending, startTransition] = useTransition();
  useLayoutEffect(() => {
    if (param !== "") setActivate(true);
  }, [param]);
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const res = await Server({
        method: "POST",
        resourceName: "login",
        body: {
          ...data,
          device_info: deviceInfo,
        },
        headers: {
          "device-unique-id": deviceInfo.device_unique_id,
          Accept: "application/json",
        },
      });
      console.log(res);
      if (!res.status) setServerError(res.errors || res.message);
      if (res.status) {
        setServerError(null);
        toast.success(`${res.message} ...`);
        if (res.require_activation || res.tfa) {
          setActivate(true);
          if (res.require_activation) handleParam(res.activation_uuid, "uuid");
          setMethods(res.activation_methods || res.tfa_methods);
          if (res.tfa) {
            const updatedParams = new URLSearchParams(searchParams);
            updatedParams.set("tfa", "true");
            updatedParams.set("uuid", res.tfa_uuid);
            router.push(`?${updatedParams.toString()}`, { scroll: false });
          }
          setMessage(res.message);
        }
        if (!res.require_activation && !res.tfa) {
          cookies.set("jwt", res.token);
          router.push(redirect || "/");
        }
      }
    });
  };
  const handleSend = async (sendType?: string) => {
    const res = await Server({
      method: "POST",
      resourceName: searchParams.get("tfa") === "true" ? "tfaSend" : "verify",
      id: param,
      body: {
        send_by: sendType,
      },
    });
    console.log(res);
    if (!res.status) setServerError(Array.isArray(res.errors)?res.errors:res.errors.send_by||res.message);
    if (res.status) {
      setServerError(null);
      toast.success(res.message);
      setIsCode(sendType || "");
    }
  };
  const loginArray = [
    {
      name: "username",
      placeholder: `Add Your ${useEmail ? "Email" : "Phone"}...`,
      phone: !useEmail,
    },
    {
      name: "password",
      type: "password",
      password: true,
      noProgress: true,
      placeholder: "Add Your Password...",
    },
  ];
  return (
    <Section CustomePadding="px-5 py-20" className="bg-gray-50 flex flex-1 flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <Logo size={{ width: 863, height: 338 }} type="blue" />
        {!activate && (
          <>
            <h1 className="text-center text-2xl mt-8 font-bold text-main2">LOGIN TO YOUR ACCOUNT</h1>
            <div className="w-full mt-5 px-14 flex flex-col">
              <div className="text-main2 self-center mx-auto text-base flex items-center gap-2">
                <p className="text-main2 font-medium text-sm">BY PHONE</p>
                <Switch
                  noSwitch={true}
                  checked={useEmail}
                  onCheckedChange={() => {
                    setUseEmail((e) => !e);
                    form.setValue("useEmail", !useEmail);
                  }}
                />
                <p className="text-main2 font-medium text-sm">BY EMAIL</p>
              </div>
              <CustomForm
                serverError={serverError}
                link="/forgot-password?level=prepare"
                linkText="Forgot Password ?"
                btnText="LOGIN"
                isPending={isPending}
                form={form}
                inputs={loginArray}
                btnStyles=" w-full"
                onSubmit={onSubmit}
              >
                <Controller
                  name="useEmail"
                  control={form.control}
                  //@ts-ignore
                  render={({ field }) => <input type="hidden" {...field} value={useEmail} />}
                />
              </CustomForm>

              <Socials />
            </div>
            <div className="mt-8 text-sm flex items-center">
              <span className="font-[400] text-main2">NOT REGISTERED YET?</span>
              <Link href="/signup" className="hover:underline duration-150 ml-1 text-main font-[700]">
                CREATE NEW ACCOUNT
              </Link>
            </div>
          </>
        )}
        {activate && !isCode && (
          <Methods tfa={searchParams.get("tfa") || ""} handleSend={handleSend} message={message} methods={methods} />
        )}
        {isCode !== "" && activate && (
          <InputOTPPattern
            forgot={false}
            tfa={Boolean(searchParams.get("tfa")==='true')}
            setServerError={setServerError}
            sendType={isCode}
            handleSend={handleSend}
          />
        )}
        {activate && serverError && (
          <p className="text-red-500 text-center mt-3 text-sm font-semibold">{serverError}</p>
        )}
      </div>
    </Section>
  );
};

export default Login;
