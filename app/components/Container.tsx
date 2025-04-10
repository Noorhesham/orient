import React from "react";

const Container = ({
  className,
  children,
  CustomePadding,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  CustomePadding?: string;
  onClick?: any;
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className || ""} ${
        onClick && "cursor-pointer"
      } bg-white border border-input rounded-2xl shadow-md ${CustomePadding || "py-4   px-4 lg:px-8"}`}
    >
      {children}
    </div>
  );
};

export default Container;
