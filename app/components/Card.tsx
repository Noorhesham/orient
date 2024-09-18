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
  sell?: number | string;
}

const Card = ({ img, text, children, width, className, price, id, sell }: CardProps) => {
  return (
    <MotionItem
      className={`hover:shadow-md w-full h-full self-center flex-grow cursor-pointer duration-150 bg-white flex flex-col justify-start items-center relative rounded-2xl overflow-hidden border border-gray-400 ${className}`}
    >
      <Link href={id ? `/product/${id}` : "#"} className="flex flex-col w-full items-center">
        <div className={`${width ? width : "aspect-[590/400]"} h-auto mb-auto self-start w-full relative`}>
          <Image src={img} className="object-cover object-top" fill alt="Product Image" />
        </div>
        <div className="md:px-8 flex flex-col items-center text-center px-4 md:py-4 py-2">
          <h3 className="uppercase line-clamp-2 text-xs text-center mb-4 text-gray-900 font-semibold">{text}</h3>
          {price && (
            <bdi className="text-[#CA0096] flex flex-col  uppercase mt-auto text-center text-xs lg:text-base font-semibold">
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
