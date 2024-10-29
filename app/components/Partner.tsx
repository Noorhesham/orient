"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { useParams } from "../hooks/useParams";
import SwiperCards from "./SwiperCards";
import { useLocale } from "next-intl";

const Partner = ({ tabs }: { tabs: any[] }) => {
  const [param, handleParam, deleteParam] = useParams("category", "coloring-centers");

  const local = useLocale();
  return (
    <>
      <div
        className={`hidden flex-1 ${
          local === "en" ? "mr-auto " : "ml-auto "
        }  flex-grow md:flex w-full xl:w-[88%] self-start justify-start items-center  flex-col gap-5`}
      >
        {tabs.map(({ link, text }, i) => (
          <CustomButton
            onClick={() => handleParam(link)}
            backgroundColor={param !== link ? "dark" : "light"}
            key={i}
            className=" py-6 w-full "
            text={text}
          />
        ))}
      </div>
      <div className="flex justify-center w-full">
        <div className="  w-full  md:hidden flex mx-auto items-center justify-center max-w-full  md:max-w-lg overflow-hidden h-20 ">
          <SwiperCards
            className=" w-full h-full"
            slidesPerView={1.2}
            samePhone
            items={tabs.map(({ link, text }, i) => ({
              card: (
                <CustomButton
                  stopPropagation
                  onClick={() => handleParam(link)}
                  backgroundColor={param !== link ? "dark" : "light"}
                  key={i}
                  className="py-6   w-full"
                  text={text}
                />
              ),
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default Partner;
