"use client";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  const locale = useLocale();
  return (
    <div>
      <div className="button-container-2  relative rounded-full">
        <span className="mas  text-nowrap flex items-center gap-2">
          {text} <ArrowRight className={` ${locale === "ar" ? "rotate-180" : "rotate-0"}  text-black  w-4 h-4 ml-2"`} />
        </span>{" "}
        <Link href={`/${locale}${href}`} className={` px-8 flex items-center gap-2 rounded-full `}>
          <div className=" flex items-center gap-2 text-nowrap">
            {text}{" "}
            <ArrowRight className={` ${locale === "ar" ? "rotate-180" : "rotate-0"}  text-white  w-4 h-4 ml-2"`} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LinkButton;
