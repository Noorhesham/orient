import React from "react";

const MaxWidthWrapper = ({ className, children,noPadding=false }: { className?: string; children: React.ReactNode,noPadding?:boolean }) => {
  return <div className={`${className || ""} max-w-screen-[1375px] w-full mx-auto ${noPadding?'px-0':'px-8'} lg:px-20`}>{children}</div>;
};

export default MaxWidthWrapper;
