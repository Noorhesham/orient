import React from "react";
import { Calender, DashBoard } from "./Icons";
import Image from "next/image";
import Link from "next/link";
import MotionItem from "./MotionItem";
import { convertToHTML } from "@/lib/utils";


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
  const { title, main_gallery, content } = item;
  const contentHTML = convertToHTML(content.slice(0,150));

  return (
    <MotionItem className=" h-full" >
      <Link href={`/blog/${item.id}`} className="  w-full  h-full  ">
        <div className=" max-w-[424px] h-full  w-full xl:max-w-full  px-5 shadow-md pb-10 mb-5 lg:mb-10 rounded-2xl border border-gray-300 flex flex-col justify-between">
          <div className="self-center rounded-2xl w-full mt-10 relative h-[248px]">
            <Image
              src={main_gallery[0].sizes.large}
              fill
              className="rounded-2xl object-cover"
              alt={main_gallery[0].alt}
            />
          </div>
          <div className="mt-[14px] flex-1 py-3">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Calender />
                <p className="text-xs sm:text-sm font-medium text-[#475156]">1 FEB, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <DashBoard />
                <p className="text-xs sm:text-sm font-medium text-[#475156]">Blog</p>
              </div>
            </div>
            <h1 className="mt-2 text-base font-semibold text-[#0D3B6F]">{title}</h1>
            {/* Render HTML content */}
            <div className="text-[#77878F] font-[300] text-base" dangerouslySetInnerHTML={{ __html: contentHTML }} />
          </div>
        </div>
      </Link>
    </MotionItem>
  );
};

export default CardHuge;
