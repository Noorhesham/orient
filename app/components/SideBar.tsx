import React from "react";
import Container from "./Container";
import SideNav from "./SideNav";
import { Location, PersonIcon } from "@/app/components/Icons";
import { Heart, LayoutDashboard, LogOutIcon, Settings } from "lucide-react";

import UserPhoto from "./UserPhoto";
import { useTranslations } from "next-intl";

const SideBar = () => {
  const t = useTranslations();
  return (
    <Container className="flex   md:flex-col flex-row    col-span-2   gap-3">
      <ul className=" text-xs lg:text-sm items-start flex md:flex grid grid-cols-2  md:flex-col flex-row  flex-wrap gap-5 mt-3 lg:flex-col text-gray-900 font-semibold">
        <div className=" hidden md:block">
          <UserPhoto />
        </div>
        <SideNav link="/dashboard" text={t("dashboard")} icon={<LayoutDashboard />} />
        <SideNav link="/orders" text={t('orders')} icon={<PersonIcon home={false} />} />
        <SideNav link="/shipping-address" text={t("shippingAddress")}icon={<Location color="black" />} />
        <SideNav link="/wishlist" text={t('wishlist')} icon={<Heart />} />
        <SideNav link="/settings" text={t("settings")} icon={<Settings />} />
        <SideNav logout link="" text={t("logout")} icon={<LogOutIcon />} />
      </ul>
    </Container>
  );
};

export default SideBar;
