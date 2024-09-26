"use client";
import React, { useState, useTransition } from "react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const CompeleteOrder = () => {
  const [isPending, startTransition] = useTransition();
  const { generalSettings, setCartCount } = useAuth();
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const completeOrder = () => {
    startTransition(async () => {
      try {
        const res = await Server({
          resourceName: "completeOrder",
          body: {
            callback: "http://localhost:3000/success",
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
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };
  return (
    <div className="flex w-fit pt-5  mx-auto mt-3 flex-col">
      <Button
        onClick={completeOrder}
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
    </div>
  );
};

export default CompeleteOrder;
