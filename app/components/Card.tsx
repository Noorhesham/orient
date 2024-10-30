import Image from "next/image";
import { ReactNode, useState } from "react";
import MotionItem from "./MotionItem";
import Link from "next/link";

interface CardProps {
  img: string;
  text: string;
  price?: any;
  children?: ReactNode;
  width?: string;
  className?: string;
  id?: string | number;
  sell?: number | string | null;
  desc?: string;
}

const Card = ({ img, text, children, width, className, price, id, sell, desc }: CardProps) => {
  return (
    <MotionItem
      className={`hover:shadow-md after:w-0 after:h-full after:z-20 z-10 hover:after:w-full after:opacity-0 hover:after:opacity-100
         after:duration-300   after:bg-main2/50
         group-hover:w-full duration-200 after:absolute group w-full h-full self-center flex-grow cursor-pointer  bg-white flex flex-col justify-start items-center relative rounded-2xl overflow-hidden border border-gray-400 ${className}`}
    >
      <div className=" group-hover:opacity-100 scale-90 group-hover:scale-100 w-full h-full absolute opacity-0">
        {desc && <p className=" text-sm text-center text-gray-50 z-30">{desc}</p>}
      </div>
      <Link href={id ? `/product/${id}` : "#"} className="flex flex-col w-full items-center">
        <div className={`${width ? width : "aspect-[403/400]"} h-auto mb-auto self-start w-full relative`}>
          <Image src={img} className="object-contain object-top" fill alt="Product Image" />
        </div>
        <div className="md:px-8 flex flex-col items-center text-center px-4  gap-1 pb-2  ">
          <h3 className="uppercase line-clamp-2 text-sm text-center  text-gray-900 font-semibold">{text}</h3>
          {price && (
            <bdi className="text-main flex flex-col  uppercase mt-auto text-center text-xs lg:text-base font-semibold">
              {price} EGP
              {sell && <del>{sell} EGP</del>}
            </bdi>
          )}
          {children}
        </div>
      </Link>
    </MotionItem>
  );
};

export default Card;
