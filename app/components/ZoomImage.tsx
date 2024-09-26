"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { ReactNode } from "react";

const ZoomImage = ({
  btn,
  src,
  content,
  className,
}: {
  btn: ReactNode;
  src?: string;
  content?: ReactNode;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      {/*@ts-ignore*/}
      <DialogContent
        src="."
        className={` ${src ? "" : " "} w-full ${className || " bg-transparent "} outline-none border-none h-auto  `}
      >
        {content ? (
          content
        ) : (
          <img
            loading="lazy"
            src={src || ""}
            alt="product image"
            className="h-auto lg:scale-125 xl:scale-150 absolute  top-1/2  left-1/2 -translate-x-1/2  -translate-y-1/2 object-contain w-full "
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImage;
