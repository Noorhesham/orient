import React from "react";
import SwiperCards from "./SwiperCards";

const Variants = ({ options, optionsSize }: { options?: string[]; optionsSize?: any[] }) => {
  return (
    <>
      <div className="flex items-center  flex-col gap-2 py-5">
        <div className="  grid grid-cols-7 items-center   w-full">
          <h2 className=" col-span-2 text-nowrap text-sm text-black font-medium">COLOURS :</h2>

          <div className="  col-span-5  flex items-start  w-full">
            <SwiperCards
              slidesPerView={6} spaceBetween={-60}
              className=" w-full  h-5"
              items={options?.map((option, i) => ({
                card: (
                  <div
                    style={{ backgroundColor: option }}
                    key={i}
                    className={` flex items-start   cursor-pointer p-1 hover:opacity-90 duration-100 
                  shadow-sm     w-5 h-5 self-center my-auto rounded-md `}
                  ></div>
                ),
              }))}
            />
          </div>
        </div>
      </div>
      <div className="flex px-6  mx-auto items-center gap-2 py-2 pb-6 border-b border-input">
        <h2 className=" text-nowrap text-sm text-black font-medium">SIZE :</h2>
        <ul className="flex  gap-3">
          {optionsSize?.map((option, i) => (
            <li
              key={i}
              className={`  w-8 text-center cursor-pointer p-1 hover:opacity-90 duration-100 
                    shadow-sm  text-xs text-black border bg-white border-black   rounded-md `}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Variants;
