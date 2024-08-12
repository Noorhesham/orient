"use client";
import React, { ReactNode, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type SwiperType from "swiper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
const SwiperCards = ({
  items,
  className,
  slidesPerView,
  spaceBetween,
  btns,
  paginationImage,
  rounded = false,
}: {
  items: any;
  className?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  btns?: boolean;
  paginationImage?: boolean;
  rounded?: boolean;
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [slideConfig, setSlideConfig] = React.useState({
    isBeginning: true,
    isEnd: activeIndex === (items.length ?? 0) - 1,
  });
  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (items.length ?? 0) - 1,
      });
    });
  }, [swiper, items]);
  return (
    <div className=" flex h-full w-full  flex-col gap-2">
      <Swiper
        breakpoints={{
          0: { slidesPerView: 1, centeredSlides: true },
          768: { slidesPerView: slidesPerView || 2 },
          1024: { slidesPerView: slidesPerView || 3 },
          1280: { slidesPerView: slidesPerView || 3.4 },
        }}  
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={spaceBetween || 10}
        slidesPerView={slidesPerView || 3.4}
        className={`w-full  ${className || "h-96"}`}
      >
        {items.map(({ src, text,card }: { src: string; text: string,card:ReactNode }, i: number) => (
          <SwiperSlide className={`w-full h-full overflow-hidden ${rounded ? "rounded-2xl" : ""}`} key={i}>
            {card ? (
              card
            ) : (
              <>
                <Image
                  fill
                  loading="eager"
                  src={src}
                  alt="product image"
                  className={`object-contain object-center h-full w-full ${rounded ? "rounded-2xl object-cover" : ""}`}
                />
                {text && (
                  <h1 className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
                    {text}
                  </h1>
                )}
                {text && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[95%] h-[97%] border-2 border-white"></div>
                )}
              </>
            )}
          </SwiperSlide>
        ))}
        {btns && (
          <div className=" flex mb-[104px] items-center justify-center gap-4 mt-20">
            <Button
              onClick={() => swiper?.slidePrev()}
              className=" rounded-full flex px-6 py-4 items-center  border  border-main bg-white text-main duration-150 hover:text-white hover:bg-main"
            >
              <ArrowLeft className="mr-1" />
              Perv
            </Button>
            <Button
              onClick={() => swiper?.slideNext()}
              className=" rounded-full flex px-6 py-4 items-center  border border-main bg-white text-main duration-150 hover:text-white hover:bg-main"
            >
              Next <ArrowRight />
            </Button>
          </div>
        )}
      </Swiper>
      {paginationImage && (
        <div className="p-3 flex z-10 mt-4 relative items-center gap-2">
          {items.map(({ src }: { src: string }, i: number) => (
            <div
              className={cn(
                "overflow-hidden cursor-pointer hover:opacity-95 duration-200 relative aspect-square h-20 w-20 rounded-xl",
                { "opacity-80": i !== activeIndex },
                { "border border-rose-500": i === activeIndex }
              )}
              key={i}
              onClick={() => swiper?.slideTo(i)}
            >
              <Image
                fill
                loading="eager"
                src={src}
                alt="product image"
                className="-z-10 h-full absolute w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwiperCards;
