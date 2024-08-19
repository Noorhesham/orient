import Head1 from "@/app/components/Head1";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const DashMain = ({ name }: { name: string }) => {
  const t = useTranslations();
  return (
    <div>
      <Head1 className="text-3xl" text={t("hello")} text2={` ${name}`} />
      <p className="font-medium max-w-[38rem] text-muted-foreground text-sm mt-2 mb-5">
        {t("accountDashboard")}{" "}
        <Link href={"/orders"} className="text-main">
          {t("recentOrders")}{" "}
        </Link>
        , {t("manage")}{" "}
        <Link href={"/shipping-address"} className="text-main">
          {t("shippingAndBillingAddresses")}{" "}
        </Link>{" "}
        {t("andEdit")}{" "}
        <Link href={"/settings"} className="text-main">
          {t("password")}{" "}
        </Link>{" "}
        {t("and")} {' '}
        <Link href={"/settings"} className="text-main">
          {t("accountDetails")}
        </Link>
        .
      </p>
    </div>
  );
};

export default DashMain;
