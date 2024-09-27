"use client";
import Head1 from "@/app/components/Head1";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const DashMain = () => {
  const t = useTranslations();
  const { userSettings, loading } = useAuth();
  return (
    <div className="">
      <Head1 className="text-3xl" text={t("hello")} text2={` ${!loading ? userSettings?.name : ""}`} />
      <div className="font-medium  min-h-[50vh] max-w-[38rem] text-muted-foreground text-sm mt-2 mb-5">
        {t("accountDashboard")}{" "}
        <Link href={"/orders"} className="text-main">
          {t("recentOrders")}{" "}
        </Link>
        {t("manage")}{" "}
        <Link href={"/shipping-address"} className="text-main">
          {t("shippingAndBillingAddresses")}{" "}
        </Link>{" "}
        {t("andEdit")}{" "}
        <Link href={"/settings"} className="text-main">
          {t("password")}{" "}
        </Link>{" "}
        {t("and")}{" "}
        <Link href={"/settings"} className="text-main">
          {t("accountDetails")}
        </Link>
      </div>
    </div>
  );
};

export default DashMain;
