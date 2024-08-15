import React from "react";
import { Calender, DashBoard } from "./Icons";
import Image from "next/image";
import Link from "next/link";
import MotionItem from "./MotionItem";

const CardHuge = ({ h1, h2, href }: { h1?: string; h2?: string; href?: string }) => {
  return (
    <MotionItem>
      <Link href={href || ""} className="   ">
        <div className=" max-w-[424px] xl:max-w-full   mt-5 lg:mt-10 px-5  shadow-md pb-10 mb-5 lg:mb-10 rounded-2xl border border-gray-300  flex flex-col">
          <div className=" self-center rounded-2xl w-full   mt-10  relative h-[248px]">
            <Image src={"/unsplash_FWoq_ldWlNQ.png"} fill className=" rounded-2xl object-contain" alt="" />
          </div>
          <div className=" mt-[14px] py-3">
            <div className="flex  gap-2 ">
              <div className=" flex items-center gap-2">
                <Calender />
                <p className=" text-xs sm:text-sm font-medium text-[#475156]">1 FEB,2025</p>
              </div>
              <div className=" flex items-center gap-2">
                <DashBoard />
                <p className=" text-xs sm:text-sm font-medium text-[#475156]">Blog</p>
              </div>
            </div>
            <h1 className=" mt-2   text-base font-semibold  text-[#0D3B6F]">
              Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.{" "}
            </h1>
            <p className=" text-[#77878F] font-[300]  text-base">
              Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit
              blandit lorem.{" "}
            </p>
          </div>
        </div>
      </Link>
    </MotionItem>
  );
};

export default CardHuge;
