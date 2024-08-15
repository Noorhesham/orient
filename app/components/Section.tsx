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
  // ${CustomePadding || "lg:px-20 px-5 md:px-10 py-8 lg:py-16"}
  return (
    <section className={`${className || ""}  `}>
      <div className=" flex flex-col items-stretch w-full px-4">
        <MotionContainer className="flex flex-row items-center justify-between">
          {heading && (
            <MotionItem  nohover
              className={` text-xl sm:text-2xl  md:text-3xl  ${
                headingColor ? `text-[${headingColor}]` : "text-[#0D3B6F]"
              }   font-[700]`}
            >
              {heading}
            </MotionItem>
          )}
          {paragraph && <MotionItem nohover className=" text-sm sm:text-lg text-[20px] text-[#0D3B6F]">{paragraph}</MotionItem>}
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
