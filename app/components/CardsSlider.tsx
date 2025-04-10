"use client";
import React, { useEffect, useRef } from "react";
import type SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const SliderCards = ({ cards }) => {
  const container = useRef<any>();
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className=" flex flex-col h-full parallax-end  relative z-40">
      <Swiper
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        ref={container}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={20}
        slidesPerView={4}
        className="h-full w-full flex flex-col  z-40 relative"
      >
        {cards.map((d, i) => (
          <SwiperSlide className="group w-full  opacity-0 mt-10 text-4xl" key={i}>
            <div className="flex flex-col relative z-40 w-72 max-w-xl bg-white">
              {/* <div className="  cursor-pointer overflow-hidden  w-full relative h-40">
                <Image
                  fill
                  src={d.img}
                  alt=""
                  className="w-full group-hover:scale-125  duration-200 h-full object-cover absolute"
                />
              </div> */}
              {d}
              <div className=" group-hover:text-muted-foreground px-4 py-2 text-gray-900">
                <p className=" text-xs font-medium line-clamp-4">{d.date}</p>
                <p className=" text-sm">{d.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderCards;
