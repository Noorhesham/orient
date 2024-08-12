"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGeneralSettings } from "@/lib/queries";
import Image from "next/image";
import React from "react";

const UserPhoto = () => {
  const { data, isLoading } = useGetGeneralSettings();
  const user = data?.user_settings;
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-20  w-20 rounded-full" />
      ) : (
        <div className=" bg-gray-100    relative h-20 w-20 rounded-full">
          <Image
            src="/9723582.jpg"
            alt="avatar"
            fill
            className=" ml-2  rounded-full w-full h-full object-center object-cover"
          />
        </div>
      )}
    </>
  );
};

export default UserPhoto;
