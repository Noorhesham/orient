"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { ReactNode } from "react";

const ZoomImage = ({ btn, src, content }: { btn: ReactNode; src?: string; content?: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="w-full bg-transparent border-none h-full sm:max-w-7xl max-h-[80vh]">
        <div className="select-none relative h-full w-full">
          {content ? (
            content
          ) : (
            <Image
              width={1000}
              height={1000}
              loading="eager"
              src={src||""}
              alt="product image"
              className="h-full w-full object-contain object-center"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImage;
