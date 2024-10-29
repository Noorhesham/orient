"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon, XCircle, XIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Server } from "../main/Server";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const CoponApply = ({ applied_coupon }: { applied_coupon: any }) => {
  const [code, setCode] = useState<string>(applied_coupon || "");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();
  const applyCoupon = async () => {
    startTransition(async () => {
      try {
        const res = applied_coupon
          ? await Server({ resourceName: "deleteCoupon", body: { coupon: code } })
          : await Server({ resourceName: "applyCoupon", body: { coupon: code } });
        router.refresh();
        if (res.status) toast.success(res.message);
        if (!res.status) toast.error(res.message);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    });
  };

  return (
    <div className=" flex flex-col px-4 items-center gap-4">
      <Input
        disabled={applied_coupon!! || isPending}
        onChange={(e) => setCode(e.target.value)}
        value={code}
        className="  py-2"
        placeholder={t("coupon")}
      />
      {applied_coupon && (
        <Badge className="gap-2">
          {applied_coupon} <XCircle onClick={applyCoupon} className=" w-4 h-4 cursor-pointer" />
        </Badge>
      )}

      <Button
        disabled={isPending || applied_coupon!! || code.length < 6}
        onClick={applyCoupon}
        className="flex   w-[70%] rounded-full py-6 px-2 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2"
      >
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <CheckIcon />
            {t("applyCoupon")}
          </>
        )}
      </Button>
    </div>
  );
};

export default CoponApply;
