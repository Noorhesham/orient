"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGeneralSettings } from "@/lib/queries";
import Image from "next/image";
import React from "react";
import { useAuth } from "../context/AuthContext";

const UserPhoto = () => {
  const { userSettings, loading } = useAuth();
  const user = userSettings;
  return (
    <>
      {loading ? (
        <Skeleton className="h-20  w-20 rounded-full" />
      ) : (
        <div className=" bg-gray-100    relative h-20 w-20 rounded-full">
          <Image
            src={userSettings?.photo || "/9723582.jpg"}
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
