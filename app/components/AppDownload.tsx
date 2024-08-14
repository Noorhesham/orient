import React from "react";
import Logo from "./Logo";
import Image from "next/image";
import { DialogContent } from "@/components/ui/dialog";

const AppDownload = () => {
  return (
    <DialogContent whiteClose className="  min-w-[100vw]  bg-black/90 border-none outline-none  h-screen w-full  ">
      <main className="  flex justify-center items-center flex-col  h-screen">
        <div className=" flex justify-center items-center py-20 px-40 flex-col gap-2">
          <Logo />
          <h1 className=" text-4xl my-3 text-white font-bold">DOWNLOAD THE APP</h1>
          <p className=" max-w-lg text-white text-center">
            Founded in 1946, Orient is built on a legacy of integrity, quality assurance, and innovative technology.
            With a continuous effort to hold a unique leading position in the industry, Orient brings together Egyptian
            manufacturing .
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Image
            alt=" download from google play"
            src={"/google.png"}
            width={200}
            height={200}
            className=" object-cover cursor-pointer"
          />
          <Image
            alt=" download from apple store"
            src={"/apple.png"}
            width={200}
            height={200}
            className="  cursor-pointerobject-cover"
          />
        </div>
      </main>{" "}
    </DialogContent>
  );
};

export default AppDownload;
