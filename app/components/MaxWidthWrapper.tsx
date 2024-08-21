import React from "react";

const MaxWidthWrapper = ({
  className,
  children,
  noPadding = false,
}: {
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
}) => {
  return (
    <div
      className={`${className || ""} max-w-[1330px] w-full mx-auto ${
        noPadding ? " py-0" : "py-5 lg:py-10"
      }   px-4 md:px-10 lg:px-0`}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
