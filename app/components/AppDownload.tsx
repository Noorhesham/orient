"use client";
import React from "react";
import Logo from "./Logo";
import Image from "next/image";
import { DialogContent } from "@/components/ui/dialog";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

const AppDownload = () => {
  const { generalSettings, loading } = useAuth();
  const t = useTranslations();
  if (loading) return <Skeleton />;
  const { store_url } = generalSettings;
  return (
    <DialogContent whiteClose className="  min-w-[100vw]  bg-black/60 border-none outline-none  h-screen w-full  ">
      <main className="  flex justify-center items-center gap-5 flex-col  h-screen">
        <div className=" flex justify-center items-center  flex-col gap-2">
          <Logo />
          <h2 className=" text-4xl my-3 text-white  text-center font-bold">{t("downloadApp")}</h2>
          <p className=" max-w-lg text-white text-center">{t("download")}.</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link target="_blank" href={`${store_url.play_store}`}>
            <Image
              alt=" download from google play"
              src={"/google.png"}
              width={200}
              height={200}
              className=" object-cover cursor-pointer"
            />
          </Link>
          <Link target="_blank" href={`${store_url.app_store}`}>
            <Image
              alt=" download from apple store"
              src={"/Apple.png"}
              width={200}
              height={200}
              className="cursor-pointer object-cover"
            />
          </Link>
        </div>
      </main>{" "}
    </DialogContent>
  );
};

export default AppDownload;
