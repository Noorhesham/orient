"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
const SideNav = ({ icon, text, link }: { icon: React.ReactNode; text: string; link: string }) => {
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();
  const lang = cookies.get("NEXT_LOCALE");
  const isActive = pathName.replace(`/${lang}`, "") === `${link}`;
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <Link
        href={link}
        className={`flex hover:bg-gray-100 hover:text-gray-800 duration-150 cursor-pointer w-full rounded-lg  py-2 px-4 items-center gap-2 self-start 
         ${isActive ? "bg-gray-100" : ""}`}
      >
        {icon}
        <p className=" font-semibold ">{text}</p>
      </Link>
    )
  );
};

export default SideNav;
