"use client";

import React from "react";

import UpdatePassword from "@/app/main/authentication/components/UpdatePassword";
import UpdatePersonalInfo from "@/app/main/authentication/components/UpdatePersonalInfo";
import UpdateNotifications from "@/app/main/authentication/components/UpdateNotifications";
import DeleteAccount from "@/app/main/authentication/components/DeleteAccount";

const Page = () => {
  return (
    <>
      <div className="z-10 flex flex-col mx-auto justify-center flex-wrap lg:grid gap-4  lg:grid-cols-3">
        <UpdatePassword />
        <UpdateNotifications />
        <UpdatePersonalInfo />
      </div>
      <DeleteAccount />
    </>
  );
};

export default Page;
