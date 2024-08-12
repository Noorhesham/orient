import React from "react";

const Paragraph = ({ description, size = "sm",full=false }: { description: string; size?: "sm" | "lg" ,full?:boolean}) => {
  return (
    <p className={` text-black ${size === "lg" ? "text-lg" : "text-sm"} ${full?'max-w-full':'max-w-2xl'} font-medium my-2 leading-[1.7] `}>
      {description}
    </p>
  );
};

export default Paragraph;
