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
const shippingArray = [
  {
    name: "name",
    placeholder: "YOUR NAME",
    type: "text",
    required: true,
  },
  {
    email: true,
    name: "email",
    placeholder: "YOUR EMAIL",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    phone: true,
    placeholder: "COUNTRY KEY",
    required: true,
    type: "phoneNumber",
    label: "Your Phone",
    returnFullPhone: false,
  },
  { country: true, countryName: "country_id", stateName: "state_id", cityName: "city_id" },

  { name: "address", placeholder: "YOUR ADDRESS", type: "text", required: true },
];
const CompeleteOrder = () => {
  const [isPending, startTransition] = useTransition();
  const { userSettings, setCartCount } = useAuth();
  const router = useRouter();
  const completeOrder = async (data?: any) => {
    console.log(data);

    const dataBody = {
      ...data,
      country_key: data.phone?.country_key,
      phone: data.phone?.phone,
      callback: "http://localhost:3001/success",
    };
    const res = await Server({
      resourceName: "completeOrder",
      body: dataBody,
    });

    if (res.status) {
      toast.success(res.message);
      setCartCount(0);
      if (res.url) router.push(res.url);
      else router.push("/success");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex w-fit pt-5  mx-auto mt-3 flex-col">
      {userSettings ? (
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
              COMPLETE ORDER
            </>
          )}
        </Button>
      ) : (
        <FormContainer submit={completeOrder} formArray={shippingArray} />
      )}
    </div>
  );
};

export default CompeleteOrder;
