"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { SkeletonCard } from "./SkeletonCard";
import Link from "next/link";

const Locations = () => {
  const t = useTranslations();
  const { generalSettings, loading } = useAuth();
  if (loading) return <SkeletonCard />;
  const { company_contacts } = generalSettings;
  const { branches } = company_contacts;
  return (
    <div className="text-white flex gap-1 flex-col">
      <p className="ml-2 tracking-wide text-center  lg:text-justify text-xl font-[500]">
        {t("footer.headOffice")} {/* 'HEED OFFICE' in your translation file */}
      </p>
      <div className="ml-2 flex justify-center flex-col lg:flex-row gap-3 items-center text-[14px]">
        <p className="text-center  lg:text-justify mx-auto">
          {t("footer.headOfficeAddress")} {/* 'Head Office Maadi, Cairo.' */}
        </p>
        <Link target="_blank" href={branches[0].co_info_location_url} className="py-1 px-4 w-fit text-xs bg-gray-400/40 rounded-full">
          {t("footer.showMap")} {/* 'Show Map' */}
        </Link>
      </div>
    </div>
  );
};

export default Locations;
