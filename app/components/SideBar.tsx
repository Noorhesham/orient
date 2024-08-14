import React from "react";
import Container from "./Container";
import SideNav from "./SideNav";
import { Location, PersonIcon } from "@/app/components/Icons";
import { Heart, LayoutDashboard, LogOutIcon, Settings } from "lucide-react";

import UserPhoto from "./UserPhoto";

const SideBar = () => {
  return (
    <Container className="flex   md:flex-col flex-row    col-span-2   gap-3">
      <ul className=" text-xs lg:text-sm items-start flex  md:flex-col flex-row  flex-wrap gap-5 mt-3 lg:flex-col text-gray-900 font-semibold">
        <div className=" hidden md:block">
          <UserPhoto />
        </div>
        <SideNav link="/dashboard" text="DASHBOARD" icon={<LayoutDashboard />} />
        <SideNav link="/orders" text="MY ORDERS" icon={<PersonIcon home={false} />} />
        <SideNav link="/shipping-address" text="SHIPPING ADDRESS" icon={<Location color="black" />} />
        <SideNav link="/wishlist" text="WISHLIST" icon={<Heart />} />
        <SideNav link="/settings" text="SETTINGS" icon={<Settings />} />
        <SideNav link="" text="LOG-OUT" icon={<LogOutIcon />} />
      </ul>
    </Container>
  );
};

export default SideBar;
