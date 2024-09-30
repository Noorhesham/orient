"use client";
import React, { useState, useTransition } from "react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import FormContainer from "./FormContainer";
import { useTranslations } from "next-intl";

const CompeleteOrder = () => {
  const [isPending, startTransition] = useTransition();
  const { userSettings, setCartCount, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations("form");
  const shippingArray = [
    {
      name: "name",
      placeholder: t("name"),
      type: "text",
      required: true,
    },
    {
      email: true,
      name: "email",
      placeholder: t("email"),
      type: "email",
      required: true,
    },
    {
      name: "phone",
      phone: true,
      placeholder: t("phone"),
      required: true,
      type: "phoneNumber",
      label: t("phoneLabel"),
      returnFullPhone: false,
    },
    { country: true, countryName: "country_id", stateName: "state_id", cityName: "city_id" },
    {
      name: "address",
      placeholder: t("address"),
      type: "text",
      required: true,
    },
  ];
  
  const completeOrder = async (data?: any, setError?: any) => {
    const dataBody = {
      ...data,
      country_key: parseInt(data.phone?.country_key, 10),
      phone: parseInt(data.phone?.phone, 10),
      callback: "http://localhost:3001/success", // Adjust the callback URL to match the one that works
    };

    try {
      const res = await Server({
        resourceName: "completeOrder",
        body: dataBody,
      });
      console.log(res);

      if (res.status === true) {
        toast.success(res.message);
        setError(null);
        if (res.url) router.push(res.url);
      } else {
        setError(res.message || res.errors);
      }
    } catch (error: any) {
      console.log("Error Response:", error?.response?.data);
      toast.error(error);
    }
  };
  if (loading) return <Spinner />;
  return (
    <div className="flex w-full pt-5  mx-auto flex-col">
      {userSettings && !loading ? (
        <Button
          onClick={() => {
            startTransition(async () => {
              const res = await Server({
                resourceName: "completeOrder",
                body: {
                  callback: "http://localhost:3001/success",
                },
              });
              if (res.status) {
                toast.success(res.message);
                setCartCount(0);
                if (res.url) router.push(res.url);
                else router.push("/success");
              } else {
                toast.error(res.message);
              }
            });
          }}
          className="flex rounded-full min-w-[150px] py-6 px-10 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2"
        >
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <CreditCard />
              {t("complete")}
            </>
          )}
        </Button>
      ) : (
        <FormContainer server={false} submit={completeOrder} formArray={shippingArray} />
      )}
    </div>
  );
};

export default CompeleteOrder;
