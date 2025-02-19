"use client";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { SkeletonCard } from "./SkeletonCard";
import Link from "next/link";
import { HeadPhones, Phone } from "./Icons";

const Locations = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { generalSettings, loading } = useAuth();
  if (loading) return <SkeletonCard />;
  const { company_contacts } = generalSettings;
  const { branches } = company_contacts;
  return (
    <div className=" flex flex-col gap-3">
      {" "}
      <div className="flex items-center mx-auto lg:text-justify text-center lg:mx-0 gap-3">
        <div className=" ">
          <Phone />
        </div>
        <Link href={`tel:${company_contacts.phone}`} className="ml-2 tracking-wide text-white text-3xl font-[600]">
          {company_contacts.phone}
        </Link>
      </div>
      <div className="text-white flex gap-3 w-full flex-col">
        {branches.map((branch: any, i: number) => (
          <div className=" w-full flex items-start" key={i}>
            <div className=" flex flex-col  w-full items-center lg:items-start">
              <h3 className="ml-2 flex gap-6 flex-row-reverse flex-1 tracking-wide text-center  lg:text-justify text-lg font-semibold ">
                {branch.title[locale]}
                <div className="">
                  <HeadPhones />
                </div>
              </h3>
              <div className="ml-2 flex-1 flex justify-center lg:justify-between w-full flex-col lg:flex-row gap-3 items-center  text-sm">
                <p className="text-center  lg:text-justify ">{branch.co_info_address[locale]}</p>
                <Link
                  target="_blank"
                  href={branches[i].co_info_location_url}
                  className="py-1 lg:mx-0 mx-auto  text-nowrap lg:text-justify text-center self-end px-4 w-fit text-xs bg-gray-400/40 rounded-full"
                >
                  {t("footer.showMap")} {/* 'Show Map' */}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
