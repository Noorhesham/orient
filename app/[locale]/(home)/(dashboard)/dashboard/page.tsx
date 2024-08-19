import { Server } from "@/app/main/Server";
import React from "react";
import DashMain from "./DashMain,";
import { cookies } from "next/headers";

const page = async () => {
  const res = await Server({
    resourceName: "MGS",
    body: {
      needed: ["user_settings"],
      token: cookies().get("jwt")?.value,
      device_id: JSON.parse(cookies().get("deviceInfo")?.value || "{}")?.device_unique_id,
      cache: true,
    },
  });
  const user = res.user_settings.data;
  const { name, email, birthday, phone, photo } = user;
  return (
    <section className=" ">
      <div className="   ml-5 flex flex-col items-start">
        <DashMain name={name} />
      </div>
    </section>
  );
};

export default page;
