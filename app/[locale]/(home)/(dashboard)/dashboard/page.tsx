import Head1 from "@/app/components/Head1";
import { Server } from "@/app/main/Server";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const page = async () => {
  const res = await Server({
    method: "POST",
    resourceName: "MGS",
    body: {
      needed: ["user_settings"],
      token: cookies().get("jwt")?.value,
      device_id: JSON.parse(cookies().get("deviceInfo")?.value || "{}")?.device_unique_id,
    },
  });
  console.log(res);
  const user = res.user_settings;
  const { name, email, birthday, phone, photo } = user;
  return (
    <section className=" ">
      <div className="   ml-5 flex flex-col items-start">
        <Head1 className="text-3xl" text="HELLO," text2={` ${name}`} />
        <p className=" font-medium max-w-[38rem] text-muted-foreground text-sm  mt-2 mb-5">
          From your account dashboard. you can easily check & view your{" "}
          <Link href={"/orders"} className=" text-main">
            Recent Orders
          </Link>
          , manage your{" "}
          <Link href={"/shipping-address"} className=" text-main">
            Shipping and Billing Addresses
          </Link>{" "}
          and edit your{" "}
          <Link href={"/settings"} className=" text-main">
            Password
          </Link>{" "}
          and{" "}
          <Link href={"/settings"} className=" text-main">
            Account Details
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default page;
