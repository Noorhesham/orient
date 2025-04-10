import React from "react";
import MotionContainer from "./MotionContainer";
import MotionItem from "./MotionItem";
interface TextProps {
  className?: string;
  mainText: string;
  subText: string;
  MainTextColor?: string;
  SubTextColor?: string;
  paragraph?: string;
}
const Heading = ({ className, mainText, subText, MainTextColor, SubTextColor, paragraph }: TextProps) => {
  return (
    <MotionContainer className={`${className} text-center flex flex-col max-w-[695px] `}>
      <MotionItem nohover className={` text-2xl md:text-3xl  lg:text-4xl uppercase font-bold ${MainTextColor ? `text-[${MainTextColor}]` : "text-[#E6007E]"}`}>{mainText}</MotionItem>
      <MotionItem nohover className={`  text-xl md:text-2xl  lg:text-3xl uppercase font-bold ${MainTextColor ? `text-[${MainTextColor}]` : "text-[#0D3B6F]"}`}>{subText}</MotionItem>
      <MotionItem nohover className=" mt-4 text-sm">{paragraph}</MotionItem>
    </MotionContainer>
  );
};

export default Heading;
