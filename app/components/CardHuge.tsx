import React from "react";
import { Calender, DashBoard } from "./Icons";
import Image from "next/image";
import Link from "next/link";
import MotionItem from "./MotionItem";
import { convertToHTML } from "@/lib/utils";
import Paragraph from "./Paragraph";
import { format } from "date-fns";

export interface BlogProps {
  id: number;
  title: string;
  thumbnail: string;
  main_gallery: {
    alt: string;
    thumbnail: string;
    sizes: {
      thumbnail: string;
      large: string;
      medium: string;
      "1200_800": string;
      "300_1200": string;
      "800_1200": string;
    };
  }[];
  content: string;
}

const CardHuge = ({ h1, h2, href, item }: { h1?: string; h2?: string; href?: string; item: BlogProps }) => {
  const { title, main_gallery, content, main_thumbnail, short_description } = item;

  return (
    <MotionItem
      nohover
      className=" hover:-translate-y-2 group duration-300  w-full  h-fit lg:h-full  xl:max-w-full  px-5 shadow-md pb-5 mb-5 lg:mb-10 rounded-2xl border border-gray-300 flex flex-col justify-between"
    >
      <div className="self-center   rounded-2xl w-full  l overflow-hidden mt-10 relative h-[248px]">
        <Link href={item.id ? `/blog/${item.id}` : "#"} className="  rounded-2xl w-full   h-full  ">
          <Image
            src={main_thumbnail[0]?.sizes.medium}
            fill
            className="group-hover:scale-110  duration-200 group-hover:opacity-90 object-cover"
            alt={main_gallery[0]?.alt || "post"}
          />{" "}
        </Link>
      </div>
      <div className="mt-[14px] flex-1 py-3">
        <div className="flex gap-2">
          {item.created_at && (
            <div className="flex items-center gap-2">
              <Calender />
              <p className="text-xs sm:text-sm font-medium text-[#475156]">
                {format(new Date(item.created_at), "dd MMM, yyyy")}
              </p>
            </div>
          )}
          {item.category?.title && (
            <div className="flex items-center gap-2">
              <DashBoard />
              <p className="text-xs sm:text-sm font-medium text-[#475156]">{item.category?.title}</p>
            </div>
          )}
        </div>
        <Link href={item.id ? `/blog/${item.id}` : "#"} className="  w-full  h-full  ">
          <h2 className="mt-2 text-base font-semibold text-[#0D3B6F]">{title}</h2>
        </Link>
        {/* Render HTML content */}
        <Paragraph description={short_description} />
      </div>
    </MotionItem>
  );
};

export default CardHuge;
