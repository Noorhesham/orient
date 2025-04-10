"use client";
import React, { ReactNode, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type SwiperType from "swiper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Autoplay } from "swiper/modules"; // Correct import for Autoplay
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IoOpenOutline } from "react-icons/io5";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ZoomImage from "./ZoomImage";
import MaxWidthWrapper from "./MaxWidthWrapper";

const SwiperCards = ({
  items,
  className,
  slidesPerView,
  spaceBetween,
  btns=false,
  paginationImage,
  rounded = false,
  logo,
  samePhone,
  contain = false,
  autoplay,
  mobile,
  md,
  zoom,
  paginationImgs,
  activeSlide,
  btnClass,
  centeredSlides,
}: {
  items: any;
  className?: string;
  slidesPerView?: number;
  spaceBetween?: number;
  btns?: boolean;
  paginationImage?: boolean;
  rounded?: boolean;
  logo?: boolean;
  samePhone?: boolean;
  contain?: boolean;
  autoplay?: boolean;
  mobile?: number;
  md?: number;
  zoom?: boolean;
  paginationImgs?: string[];
  activeSlide?: number;
  btnClass?: string;
  centeredSlides?: boolean;
}) => {
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(activeSlide || 0);
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const [slideConfig, setSlideConfig] = React.useState({
    isBeginning: true,
    isEnd: activeIndex === (items?.length ?? 0) - 1,
  });
  useEffect(() => {
    if (activeSlide) swiper?.slideTo(activeSlide);
  }, [activeSlide, swiper]);
  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (items?.length ?? 0) - 1,
      });
    });
  }, [swiper, items]);
  const local = useLocale();

  const t = useTranslations();
  const pagination = paginationImage && paginationImgs?.length > 0 ? paginationImgs : items;
  return (
    <div className="relative h-full gap-3 w-full flex flex-col">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: mobile ? mobile : logo ? 2 : samePhone ? slidesPerView : 1,
            centeredSlides: logo ? false : true,
          },
          320: { slidesPerView: mobile || slidesPerView || 1 },
          580: { slidesPerView: md || mobile || slidesPerView || 2 },
          768: { slidesPerView: md || 2 },
          900: { slidesPerView: md || slidesPerView || 3 },
          1280: { slidesPerView: slidesPerView || 3.4 },
        }}
        modules={[Autoplay]}
        autoplay={autoplay ? { delay: 2000 } : false}
        loop={autoplay}
        centeredSlides={centeredSlides || false}
        initialSlide={0}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={spaceBetween || 10}
        slidesPerView={slidesPerView || 3.4}
        className={`w-full place-content-center h-full ${className || "h-96"} `}
      >
        {items?.map(
          ({ src, text, card, link }: { src: string; text: string; card: ReactNode; link?: string }, i: number) => (
            <SwiperSlide className={`w-full group ${rounded ? "rounded-2xl" : ""}`} key={i}>
              {card ? (
                card
              ) : zoom ? (
                <>
                  <ZoomImage
                    key={i}
                    src={src}
                    className=""
                    content={
                      <TransformWrapper
                        initialScale={1}
                        minScale={0.5}
                        maxScale={3}
                        centerOnInit
                        wheel={{ step: 0.1 }}
                        doubleClick={{ disabled: false }}
                      >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                          <>
                            <TransformComponent>
                              <img
                                loading="lazy"
                                src={src}
                                alt="product image"
                                className="h-full z-10 object-top object-contain w-full"
                              />
                            </TransformComponent>
                          </>
                        )}
                      </TransformWrapper>
                    }
                    btn={
                      <div className="relative     first:row-span-2  h-full  first:col-span-4 first:lg:col-span-2 cursor-pointer hover:opacity-90 duration-100 w-full col-span-4 lg:col-span-1 row-span-1">
                        <Image src={src} alt="image" fill className="object-cover w-full h-full" />
                      </div>
                    }
                  />
                </>
              ) : (
                <Image
                  fill
                  loading="eager"
                  src={src}
                  alt="product image"
                  className={`object-center h-full w-full ${
                    rounded && !contain ? "rounded-2xl object-cover" : "object-contain"
                  } ${contain ? "object-contain" : "object-contain  2xl:object-cover"}`}
                />
              )}

              {text && (
                <h4 className="text-white group-hover:text-main duration-300 group-hover:-translate-y-2 uppercase text-3xl md:text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
                  {text}
                </h4>
              )}

              {link ? (
                <Link
                  href={link}
                  className="absolute top-[3rem] lg:top-2 left-1/2 transform block -translate-x-1/2 opacity-0 group-hover:opacity-100
                   group-hover:w-[80%] lg:group-hover:w-[95%] w-0 duration-300  h-[70%] lg:h-[97%] border-0 group-hover:border-2 group-hover:border-main border-white"
                />
              ) : text ? (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2  group-hover:w-[95%] w-0 h-[97%] border-2 border-white" />
              ) : null}
            </SwiperSlide>
          )
        )}
      </Swiper>
      {btns && (
        <MaxWidthWrapper
          noPadding
          className={cn(
            "flex mb-4 h-fit items-center gap-20 md:gap-8 justify-between lg:justify-center mt-5",
            btnClass || "",
            local === "ar" ? "flex-row-reverse" : ""
          )}
        >
          <Button
            style={{ flexDirection: local === "ar" ? "row-reverse" : "row" }}
            onClick={() => swiper?.slidePrev()}
            className={`rounded-full flex px-6 py-4 items-center  border  border-main bg-white text-main duration-150 hover:text-white hover:bg-main `}
          >
            <ArrowLeft className="mr-1 w-4 h-4" />
            {t("previous")}
          </Button>
          <Button
            style={{ flexDirection: local === "ar" ? "row-reverse" : "row" }}
            onClick={() => swiper?.slideNext()}
            className={` rounded-full flex px-6 py-4 items-center  border border-main bg-white text-main duration-150 hover:text-white hover:bg-main`}
          >
            {t("next")} <ArrowRight className=" ml-1 w-4 h-4" />
          </Button>
        </MaxWidthWrapper>
      )}
      {paginationImage && (
        <div className="p-3 hidden justify-center md:flex z-10 mt-4 relative items-center gap-2">
          {pagination.map(({ src }: { src: string }, i: number) => (
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
