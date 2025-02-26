"use client";
import SwiperCards from "@/app/components/SwiperCards";
import React from "react";

const IsMobSlide = ({ page }: any) => {
  const mobile = ();
  return (
    <div>
      <div className="h-52 block">
        <SwiperCards
          btns={page.certificates.length > 5}
          logo={true}
          centeredSlides
          spaceBetween={50}
          contain
          mobile={2}
          slidesPerView={5}
          className=" place-items-center place-content-center  w-full  h-32 "
          items={page.certificates.map((item: any, index: number) => {
            return { src: item.file };
          })}
        />
      </div>
    </div>
  );
};

export default IsMobSlide;
