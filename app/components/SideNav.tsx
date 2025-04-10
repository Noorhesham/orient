"use client";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
const SideNav = ({
  icon,
  text,
  link,
  logout,
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
  logout?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  const { handleLogout } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const lang = cookies.get("NEXT_LOCALE");
  const isActive = pathName.replace(`/${lang}`, "") === `${link}`;
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted &&
    (logout ? (
      <div
        onClick={() => {
          handleLogout();
          router.push("/");
        }}
        className={`flex  hover:bg-gray-100 hover:text-gray-800 duration-150 cursor-pointer w-full rounded-lg  p-1  lg:py-2 lg:px-4 items-center gap-2 self-start 
        ${isActive ? "bg-gray-100" : ""}`}
      >
        {icon} {text}
      </div>
    ) : (
      <li className="w-full">
        <Link
          href={link}
          className={`flex hover:bg-gray-100 hover:text-gray-800 duration-150 cursor-pointer  rounded-lg  p-1  lg:py-2 lg:px-4 items-center gap-2 self-start 
       ${isActive ? "bg-gray-100" : ""}`}
        >
          {icon}
          <p className=" font-semibold ">{text}</p>
        </Link>
      </li>
    ))
  );
};

export default SideNav;
