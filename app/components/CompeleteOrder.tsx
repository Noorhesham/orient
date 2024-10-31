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
import { WEBSITEURL } from "../constants";
import { useQueryClient } from "@tanstack/react-query";

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
      label: t("name"),
    },
    {
      email: true,
      name: "email",
      placeholder: t("email"),
      type: "email",
      required: true,
      label: t("email"),
    },
    {
      name: "phone",
      phone: true,
      placeholder: t("phone"),
      required: true,
      type: "phoneNumber",
      label: t("phone"),
      returnFullPhone: false,
    },
    { country: true, countryName: "country_id", stateName: "state_id", cityName: "city_id" },
    {
      name: "address",
      placeholder: t("address"),
      type: "text",
      required: true,
      label: t("address"),
    },
  ];
  const queryClinet = useQueryClient();
  const completeOrder = async (data?: any, setError?: any) => {
    const dataBody = {
      ...data,
      country_key: parseInt(data.phone?.country_key, 10),
      phone: parseInt(data.phone?.phone, 10),
      callback: `${WEBSITEURL}/success`,
    };

    try {
      const res = await Server({
        resourceName: "completeOrder",
        body: dataBody,
      });
      console.log(res);

      if (res.status === true) {
        toast.success(res.message);
        setCartCount(0);
        setError(null);
        queryClinet.invalidateQueries({ queryKey: ["checkout"] });
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
    <div className="flex w-full   mx-auto flex-col">
      {userSettings && !loading ? (
        <Button
          onClick={() => {
            startTransition(async () => {
              const res = await Server({
                resourceName: "completeOrder",
                body: {
                  callback: `${WEBSITEURL}/success`,
                },
              });
              console.log(res);
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
