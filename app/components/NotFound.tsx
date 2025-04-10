"use client";
import React from "react";
import Head1 from "./Head1";
import Link from "next/link";
import MyLink from "./MyLink";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import MaxWidthWrapper from "./MaxWidthWrapper";

const NotFound = ({ message, link, linkText }: { message?: string; link?: string; linkText?: string }) => {
  const locale = useLocale();
  return (
    <MaxWidthWrapper className=" flex items-center flex-col gap-4">
      <Head1 text={message || "NOT FOUND"} />
      {linkText && (
        <Link
          href={`${link}`}
          className={`text-[#E6007E]  text-xs md:text-sm font-semibold flex flex-row items-center gap-1 md:gap-2 ${
            locale?.trim() === "ar" ? "flex-row-reverse" : " "
          }`}
        >
          {linkText} <ArrowRight className=" md:w-5 md:h-5 w-3 h-3" />
        </Link>
      )}
    </MaxWidthWrapper>
  );
};

export default NotFound;
