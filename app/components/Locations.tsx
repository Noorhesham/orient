"use client";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { SkeletonCard } from "./SkeletonCard";
import Link from "next/link";
import { HeadPhones } from "./Icons";

const Locations = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { generalSettings, loading } = useAuth();
  if (loading) return <SkeletonCard />;
  const { company_contacts } = generalSettings;
  const { branches } = company_contacts;
  return (
    <div className="text-white flex gap-1 items-start flex-col">
      {branches.map((branch: any,i:number) => (
        <div className=" flex items-start" key={i}>
          <div className=" lg:block hidden">
            <HeadPhones />
          </div>
          <div className=" flex flex-col items-start">
            <h3 className="ml-2 tracking-wide text-center  lg:text-justify text-lg font-semibold ">
              {branch.title[locale]}
            </h3>
            <div className="ml-2 flex justify-center flex-col lg:flex-row gap-3 items-center  text-sm">
              <p className="text-center  lg:text-justify mx-auto">{branch.co_info_address[locale]}</p>
              <Link
                target="_blank"
                href={branches[0].co_info_location_url}
                className="py-1  text-nowrap ml-auto self-end px-4 w-fit text-xs bg-gray-400/40 rounded-full"
              >
                {t("footer.showMap")} {/* 'Show Map' */}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Locations;
