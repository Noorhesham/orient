"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { useParams } from "../hooks/useParams";
import SwiperCards from "./SwiperCards";

const Partner = ({ tabs }: { tabs: any[] }) => {
  const [param, handleParam, deleteParam] = useParams("category", "all");
  console.log(param);

  return (
    <>
      <div className="hidden flex-1 flex-grow md:flex w-full xl:w-[70%] justify-center mx-auto  flex-col gap-5">
        {tabs.map(({ link, text }, i) => (
          <CustomButton
            onClick={() => handleParam(link)}
            reverse={param === link}
            backgroundColor="dark"
            key={i}
            className=" py-6 "
            text={text}
          />
        ))}
      </div>
      <div className="  w-full  md:hidden flex mx-auto items-center justify-center  max-w-[30rem] h-20 ">
        <SwiperCards
          className=" w-full h-full"
          slidesPerView={1.6}
          items={tabs.map(({ link, text }, i) => ({
            card: (
              <CustomButton
                onClick={() => handleParam(link)}
                reverse={param === link}
                backgroundColor="dark"
                key={i}
                className="py-6  w-full"
                text={text}
              />
            ),
          }))}
        />
      </div>
    </>
  );
};

export default Partner;
