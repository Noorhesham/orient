"use client";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
const SocialMedia = () => {
  const { generalSettings, loading } = useAuth();
  if (loading)
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
    console.log(generalSettings)
  const { company_contacts } = generalSettings;

  return (
    <div className=" flex mt-2 items-center gap-2">
      {company_contacts?.whatsapp && (
        <Link
          target="_blank"
          href={company_contacts?.whatsapp}
          className=" text-white p-2 text-xl rounded-full bg-main"
        >
          <FaWhatsapp />
        </Link>
      )}
      {company_contacts?.linkedin && (
        <Link
          target="_blank"
          href={company_contacts?.linkedin}
          className=" text-white p-2 text-xl rounded-full bg-main"
        >
          <FaLinkedin />
        </Link>
      )}
      {company_contacts?.youtube && (
        <Link target="_blank" href={company_contacts?.youtube} className=" text-white p-2 text-xl rounded-full bg-main">
          <FaYoutube />
        </Link>
      )}
      {company_contacts?.instagram && (
        <Link
          target="_blank"
          href={company_contacts?.instagram}
          className=" text-white p-2 text-xl rounded-full bg-main"
        >
          <FaInstagram />
        </Link>
      )}
      {company_contacts?.facebook && (
        <Link
          target="_blank"
          href={company_contacts?.facebook}
          className=" text-white p-2 text-xl rounded-full bg-main"
        >
          <FaFacebook />
        </Link>
      )}
      {company_contacts?.twitter && (
        <Link target="_blank" href={company_contacts?.twitter} className=" text-white p-2 text-xl rounded-full bg-main">
          <FaXTwitter />
        </Link>
      )}
    </div>
  );
};

export default SocialMedia;
