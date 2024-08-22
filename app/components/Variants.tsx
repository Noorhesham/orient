import React from "react";
import SwiperCards from "./SwiperCards";

const Variants = ({ options, optionsSize }: { options?: string[]; optionsSize?: any[] }) => {
  return (
    <>
      <div className="flex items-center gap-3  py-2 lg:py-5 flex-col ">
        <div className="grid grid-cols-4  lg:grid-cols-7 items-start lg:items-center   w-full">
          <h2 className="  col-span-1 lg:col-span-2 text-nowrap text-sm text-black font-medium">COLOURS :</h2>

          <div className="  col-span-3 lg:col-span-5 flex-wrap gap-4  flex items-start  w-full">
            {options?.map((option, i) => (
              <div
                style={{ backgroundColor: option }}
                key={i}
                className={` flex items-start   cursor-pointer p-1 hover:opacity-90 duration-100 
           shadow-sm   gap-2  w-5 h-5 self-center my-auto rounded-md `}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex   mr-auto mt-2   items-center gap-2  pb-6 lg:border-b border-input">
        <h2 className=" text-nowrap text-sm text-black font-medium">SIZE :</h2>
        <ul className="flex   xl:flex-nowrap flex-wrap  gap-3">
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
