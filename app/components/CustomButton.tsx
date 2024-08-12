"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

const CustomButton = ({
  text,
  icon,
  onClick,
  className,
  backgroundColor = "dark",
  reverse,
  link,
}: {
  text: string;
  icon?: ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
  backgroundColor?: "light" | "dark";
  reverse?: boolean;
  link?: string;
}) => {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        onClick&&onClick();
      }}
      className={` ${
        backgroundColor === "dark"
          ? `${
              reverse
                ? " bg-white border-main2  border hover:bg-main2 hover:text-white  text-main2"
                : " bg-main2 hover:bg-white hover:border-main2 border hover:text-main2 text-white"
            }`
          : `${reverse ? " bg-white border-main border text-main" : " bg-main hover:bg-main/50"}`
      } ${className || " w-fit"} min-w-[130px]  text-sm  rounded-full  px-6   flex items-center gap-2 duration-150`}
    >
      {icon} {link && link ? <Link href={link}>{text}</Link> : text}
    </Button>
  );
};

export default CustomButton;
