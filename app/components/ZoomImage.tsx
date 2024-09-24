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
        className={` ${src ? "" : " "} w-full ${className || " bg-transparent "} outline-none border-none h-full  `}
      >
        <div className="select-none   relative h-full w-full">
          {content ? (
            content
          ) : (
            <Image
              fill
              loading="lazy"
              src={src || ""}
              alt="product image"
              className="h-full lg:scale-125 xl:scale-150 absolute inset-0 object-contain w-full "
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImage;
