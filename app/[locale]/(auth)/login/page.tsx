"use client";
import { useAuth } from "@/app/context/AuthContext";
import Login from "@/app/main/authentication/components/Login";
import { Server } from "@/app/main/Server";

const Page = () => {
  const { generalSettings } = useAuth();
  const loginMethods = generalSettings?.data?.login_types;
  return <Login />;
};

export default Page;
