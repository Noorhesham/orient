"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import MotionItem from "./MotionItem";
import MotionContainer from "./MotionContainer";
import cookies from "js-cookie";
import { useLocale } from "next-intl";

const Section = ({
  heading,
  link,
  children,
  linkText,
  className,
  headingColor,
  paragraph,

  id,
  headingclass,
}: {
  heading?: string;
  link?: string;
  children: React.ReactNode;
  linkText?: string;
  className?: string;
  headingColor?: string;
  paragraph?: string;

  id?: string;
  headingclass?: string;
}) => {
  const locale = useLocale();
  return (
    <section id={id} className={`${className || ""}  `}>
      <div className=" flex flex-col items-stretch gap-2  w-full ">
        <MotionContainer className="flex flex-row items-center justify-between">
          {heading && (
            <MotionItem
              nohover
              className={` text-lg sm:text-2xl  ${headingclass || ""}    lg:mx-0  md:text-3xl  ${
                headingColor ? `text-[${headingColor}]` : "text-[#0D3B6F]"
              }   capitalize font-[700]`}
            >
              {heading}
            </MotionItem>
          )}
          {paragraph && (
            <MotionItem nohover className=" text-sm sm:text-lg text-[20px] text-[#0D3B6F]">
              {paragraph}
            </MotionItem>
          )}
          {link && (
            <Link
              href={`${link}`}
              className={`text-[#E6007E] text-xs  md:text-sm font-semibold flex flex-row items-center gap-1 md:gap-2 `}
            >
              {linkText} <ArrowRight className={`${locale === "ar" && " rotate-180 "}  md:w-5 md:h-5 w-3 h-3`} />
            </Link>
          )}
        </MotionContainer>
        {children}
      </div>
    </section>
  );
};

export default Section;
