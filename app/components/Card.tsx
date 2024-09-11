import Image from "next/image";
import { ReactNode, useState } from "react";
import MotionItem from "./MotionItem";
import Link from "next/link";

interface CardProps {
  img: string;
  text: string;
  price?: string;
  children?: ReactNode;
  width?: string;
  className?: string;
  id?: string | number;
}

const Card = ({ img, text, children, width, className, price, id }: CardProps) => {
  return (
    <MotionItem
      className={`hover:shadow-md w-full h-full self-center flex-grow cursor-pointer duration-150 bg-white flex flex-col justify-start items-center relative rounded-2xl overflow-hidden border border-gray-400 ${className}`}
    >
      <Link href={`/product/${id}`} className="flex flex-col w-full items-center">
        <div className={`${width ? width : "aspect-[590/400]"} h-auto mb-auto self-start w-full relative`}>
          <Image src={img} className="object-cover object-top" fill alt="Product Image" />
        </div>
        <div className="md:px-8 flex flex-col items-center text-center px-4 md:py-4 py-2">
          <p className="uppercase text-xs text-center mb-4 text-gray-900 font-semibold">{text}</p>
          {price && (
            <p className="text-[#CA0096] uppercase mt-auto text-center text-xs lg:text-base font-semibold">
              {price} EGP
            </p>
          )}
          {children}
        </div>
      </Link>
    </MotionItem>
  );
};

export default Card;
