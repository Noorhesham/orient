"use client";
import React, { ReactNode, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
interface TabingProps {
  defaultValue: string;
  options: { label: string; content: ReactNode; href: string }[];
  categories: any[];
}
import type SwiperType from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import ImageGrid from "./ImageGrid";
import { useIsLoading } from "../context/LoadingContext";
import { Skeleton } from "@/components/ui/skeleton";
import Paragraph from "./Paragraph";
import { Autoplay } from "swiper/modules";

const Tabing = ({ defaultValue, options, categories }: TabingProps) => {
  const searchParams = useSearchParams();
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { setLoading, loading } = useIsLoading();
  const [isPending, startTransition] = useTransition();
  const category = searchParams.get("category");
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);
  useEffect(() => {
    startTransition(() => {
      if (category && window.location.search.includes(category)) setCurrentPath(category);
      else {
        setCurrentPath(defaultValue);

        router.push(`${window.location.pathname}?category=${defaultValue}`, { scroll: false });
      }
    });
  }, [category, defaultValue]);
  const handleClick = (href: string) => {
    startTransition(() => {
      router.push(`${window.location.pathname}?category=${href}`, { scroll: false });
      setCurrentPath(href);
    });
  };
  const t = useTranslations();
  const locale = useLocale();
  const isSlide = categories.length > 5;
  return (
    <div className="w-full ">
      <div
        className={cn(
          "flex items-center gap-2 justify-between w-full",
          locale === "ar" ? "flex-row-reverse" : "flex-row"
        )}
      >
        {isSlide && (
          <button
            disabled={activeIndex === 0}
            className={` ${
              activeIndex === 0 && " opacity-50"
            } p-1 rounded-full bg-gray-200  text-xs hover:bg-gray-300  duration-150`}
            onClick={() => swiper?.slidePrev()}
          >
            <ArrowLeft />
          </button>
        )}
        <Swiper
          breakpoints={{
            0: { slidesPerView: 2.5 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 5 },
          }}
          modules={[Autoplay]}
          onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)}
          onSwiper={(swiper) => setSwiper(swiper)}
          spaceBetween={-5}
          slidesPerView={5}
          autoplay
          className=" w-full justify-center flex items-center"
        >
          {categories.map((option, i) => (
            <SwiperSlide key={i}>
              <Button
                onClick={() => handleClick(option.id)}
                className={` ${
                  currentPath === option.id.toString() ? " text-white bg-main" : "bg-gray-200 text-gray-900"
                } rounded-full h-[40px] py-4 px-12 mx-3 lg:w-[200px] hover:bg-main hover:text-white  capitalize `}
              >
                <div>{option.title}</div>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
        {isSlide && (
          <button
            disabled={activeIndex === options.length - 1}
            className=" p-1 rounded-full bg-gray-200  text-xs hover:bg-gray-300  duration-150"
            onClick={() => swiper?.slideNext()}
          >
            <ArrowRight />
          </button>
        )}
      </div>
      <Paragraph className="text-center my-8 mx-auto" description={t("inspired")} />

      {loading ? (
        <div className=" gap-5 grid grid-cols-1 mt-5 lg:grid-cols-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <Skeleton key={i} className=" h-96 w-full" />
          ))}
        </div>
      ) : (
        <ImageGrid id={category} images={options} />
      )}
    </div>
  );
};

export default Tabing;
