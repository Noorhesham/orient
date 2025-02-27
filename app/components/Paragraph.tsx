import React from "react";

const Paragraph = ({
  description,
  size = "sm",
  full = false,
  className,
  danger,
}: {
  description: string;
  size?: "sm" | "lg";
  full?: boolean;
  className?: string;
  danger?: boolean;
}) => {
  return danger ? (
    <div
      dangerouslySetInnerHTML={{ __html: description }}
      className={` ${className || ""} content text-black ${size === "lg" ? "text-lg" : "text-sm"} ${
        full ? "max-w-full" : "lg:max-w-2xl"
      } font-medium my-2 leading-[1.7]  `}
    />
  ) : (
    <p
      className={` ${className || ""} text-black ${size === "lg" ? "text-lg" : "text-sm"} ${
        full ? "max-w-full" : "lg:max-w-2xl"
      } font-medium my-2 leading-[1.7] `}
    >
      {description}
    </p>
  );
};

export default Paragraph;
