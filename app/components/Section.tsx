import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import MotionItem from "./MotionItem";
import MotionContainer from "./MotionContainer";

const Section = ({
  heading,
  link,
  children,
  linkText,
  className,
  headingColor,
  paragraph,
  CustomePadding,
}: {
  heading?: string;
  link?: string;
  children: React.ReactNode;
  linkText?: string;
  className?: string;
  headingColor?: string;
  paragraph?: string;
  CustomePadding?: string;
}) => {
  return (
    <section className={`${className || ""} ${CustomePadding || "lg:px-20 px-5 md:px-10 py-8 lg:py-16"} `}>
      <div className=" w-full px-4">
        <MotionContainer className="flex sm:flex-row flex-col justify-between">
          {heading && (
            <MotionItem 
              className={` text-2xl  md:text-3xl  ${
                headingColor ? `text-[${headingColor}]` : "text-[#0D3B6F]"
              }   font-[700]`}
            >
              {heading}
            </MotionItem>
          )}
          {paragraph && <MotionItem className="text-lg text-[20px] text-[#0D3B6F]">{paragraph}</MotionItem>}
          {link && (
            <Link
              href={link}
              className="text-[#E6007E] text-xs md:text-sm font-semibold flex items-center gap-1 md:gap-2"
            >
              {linkText} <ArrowRight className=" md:w-5 md:h-5 w-3 h-3" />
            </Link>
          )}
        </MotionContainer>
        {children}
      </div>
    </section>
  );
};

export default Section;
