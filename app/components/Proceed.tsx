"use client";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

const Proceed = () => {
  const router = useRouter();
  const { loading, generalSettings, userSettings } = useAuth();
  if (loading) return <Spinner />;
  const CanCreate = !userSettings && !generalSettings.visitors_create_order;
  return (
    <>
      <Button
        disabled={CanCreate}
        className="lg:flex hidden rounded-full py-6 px-2 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2"
      >
        <Link href="/checkout" className="flex gap-2 items-center">
          <CreditCard />
          PROCEED TO CHECKOUT
        </Link>
      </Button>
      {CanCreate && (
        <div className=" mt-2 text-sm flex items-center  flex-col  ">
          You cannot publicly order now , please <Link className=" font-semibold text-main" href="/login">LOGIN FIRST</Link>
        </div>
      )}
    </>
  );
};

export default Proceed;