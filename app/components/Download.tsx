"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Apple, Google } from "./Icons";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const Download = () => {
  const { generalSettings, loading } = useAuth();
  if (loading) return <Skeleton />;
  const { store_url } = generalSettings;

  return (
    <div className="flex sm:flex-row flex-col lg:justify-normal justify-center items-center gap-3 mt-5">
      <Link target="_blank" href={store_url.play_store}>
        {" "}
        <Google />
      </Link>

      <Link target="_blank" href={store_url.app_store}>
        {" "}
        <Apple />
      </Link>
    </div>
  );
};

export default Download;