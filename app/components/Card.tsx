import Image from "next/image";
import { ReactNode } from "react";
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
     after:duration-300 after:bg-main2/80  group-hover:w-full duration-200 after:absolute group w-full h-full self-center flex-grow cursor-pointer bg-white flex flex-col justify-start items-center relative rounded-2xl overflow-hidden border border-gray-400 ${className}`}
    >
      <Link
        href={id ? `/product/${id}` : "#"}
        className="absolute after:absolute group-hover:after:border-l-2  
        before:absolute before:border-t-2 before:border-gray-50 after:delay-200 p-8
         before:scale-0 group-hover:before:scale-100   before:duration-300 before:right-0
          before:top-2 before:border-b-2 before:w-[110%] before:h-full
       after:border-gray-50 after:scale-0 group-hover:after:scale-100 
        after:duration-300 after:-left-1 after:h-[116%] before:left-[-6px] before:delay-100  after:-top-0 after:w-[104%] 
          group-hover:after:border-r-2 top-1/2 h-fit left-1/2 -translate-x-1/2 -translate-y-1/2 
           w-full z-30 max-w-[14rem]  group-hover:opacity-100 opacity-0 transition-opacity duration-300"
      >
        {<p className="md:text-sm  text-sm capitalize  font-semibold mb-1 text-main text-center  z-30">{text}</p>}
        {desc && <p className="md:text-xs  text-xs text-center text-gray-50 line-clamp-5 z-30">{desc}</p>}
      </Link>
      <Link href={id ? `/product/${id}` : "#"} className="flex flex-col w-full items-center">
        <div className={`${width ? width : "aspect-[403/400]"} h-auto mb-auto self-start w-full relative`}>
          <Image src={img} className="object-contain object-top" fill alt="Product Image" />
        </div>
        <div className="md:px-8 flex flex-col items-center text-center px-4 gap-1 pb-2">
          <h3 className="uppercase line-clamp-2 text-sm text-center text-gray-900 font-semibold">{text}</h3>
          {price && (
            <bdi className="text-main flex flex-col uppercase mt-auto text-center text-xs lg:text-base font-semibold">
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
