"use client";
import React from "react";
import MapComponent from "./Map";
import { useAuth } from "../context/AuthContext";
import { SkeletonCard } from "./SkeletonCard";
import Spinner from "./Spinner";
interface BranchProps {
  is_main_branch: boolean;
  co_info_email: string;
  co_info_phone: string;
  co_info_address: {
    en: string;
    ar: string;
  };
  co_info_location: string;
  co_info_location_url: string;
  lat: number;
  lng: number;
}
const ContactUsLocation = () => {
  const { generalSettings, loading } = useAuth();
  if (loading) return <Spinner />;
  const { company_contacts } = generalSettings;
  const { branches } = company_contacts;
  const markers = branches.map((branch: BranchProps) => ({
    position: {
      lat: branch.lat,
      lng: branch.lng,
    },
    title: branch.co_info_location,
  }));
  console.log(markers);
  return (
    <div className=" w-full h-[500px]">
      <MapComponent defaultLocation={markers[0].position} markers={markers} />
    </div>
  );
};

export default ContactUsLocation;
