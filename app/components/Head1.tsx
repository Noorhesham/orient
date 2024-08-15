import React from "react";

const Head1 = ({ text, text2, className }: { text: string; text2?: string; className?: string }) => {
  return (
    <h1 className={` ${className || ""}  font-[700] text-lg sm:text-2xl  md:text-3xl text-main2  line-clamp-5`}>
      {text}
      <span className=" text-main">{text2}</span>
    </h1>
  );
};

export default Head1;
