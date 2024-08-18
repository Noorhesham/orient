import Signup from "@/app/main/authentication/components/SignUp";
import { Server } from "@/app/main/Server";
import React from "react";

const page = async () => {
  const res = Server({ resourceName: "MGS", body: { needed: ["general_settings"] }, cache: true });
  return <Signup />;
};

export default page;
