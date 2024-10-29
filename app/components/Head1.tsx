import React from "react";

const Head1 = ({ text, text2, className }: { text: string; text2?: string; className?: string }) => {
  return (
    <h2 className={` ${className || ""}   font-semibold text-lg   md:text-xl text-main2  line-clamp-5`}>
      {text}
      <span className=" text-main">{text2}</span>
    </h2>
  );
};

export default Head1;
