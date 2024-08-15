import React from "react";
import Logo from "./Logo";
import { Phone, HeadPhones, Google, Apple, PayPal } from "./Icons";

import Image from "next/image";
import SocialMedia from "./SocialMedia";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import SwiperCards from "./SwiperCards";

const Footer = () => {
  const images = [
    "/Vector Smart Object 1 (1).png",
    "/PROUDLY MADE IN EGYPT بكل فخر صنع في مصر 23-02 1.svg",
    "/Group 1321317229 (2).svg",
    "/Group 1321317229 (3).svg",
    "/t 1 (2).svg",
    "/eos_logo 1.svg",
    "/12 1.svg",
  ];
  return (
    <>
      <footer className=" relative bg-main2  ">
        <MaxWidthWrapper className=" relative z-10  items-center py-10 lg:py-20 lg:pt-28 md:pt-20 pt-10  ">
          <div className=" border-b border-gray-400 pb-5 grid gap-10 lg:gap-20 xl:gap-32  grid-cols-5 xl:grid-cols-8">
            <div className=" col-span-full md:col-span-3 items-center lg:items-start flex gap-4 flex-col">
              <Logo />
              <div className=" flex items-center gap-3">
                <Phone /> <p className=" ml-2 tracking-wide text-white text-3xl font-[600]">19842</p>
              </div>
              <div className=" flex items-start gap-3 ">
                <HeadPhones />
                <div className="text-white flex gap-1 flex-col">
                  <p className=" ml-2 tracking-wide  text-xl font-[500]">HEED OFFICE</p>
                  <div className="ml-2  flex flex-col lg:flex-row gap-3 items-center text-[14px]">
                    <p>Head Office Maadi, Cairo.</p>
                    <p className=" py-1 px-4 w-fit text-xs bg-gray-400/40 rounded-full">Show Map</p>
                  </div>
                </div>
              </div>
              <div className=" flex items-start gap-3 ">
                <HeadPhones />
                <div className="text-white flex gap-1 flex-col">
                  <p className=" ml-2 tracking-wide  text-xl font-[500]">Factory</p>
                  <div className="ml-2  flex flex-col lg:flex-row  gap-3 items-center text-[14px]">
                    <p>Head Office Maadi, Cairo.</p>
                    <p className=" py-1 px-4 w-fit text-xs bg-gray-400/40 rounded-full">Show Map</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" ml-5  col-span-full md:col-span-2 text-gray-50">
              <p className=" text-center lg:text-left">ABOUT ORIENT</p>
              <ul className=" grid  text-center grid-cols-2 lg:items-start items-center lg:flex lg:flex-col mt-10 gap-3">
                <Link href="/">HOME</Link>
                <Link href={"/about-us"}>ABOUT US</Link>
                <Link href={"products"}>PRODUCTS</Link>
                <Link href={"/color-trend"}>COLOR TREND</Link>
                <Link href={"/become-parteners"}>EXPORT</Link>
                <Link href={"/get-inspired"}>GET INSPIRED</Link>
              </ul>
            </div>

            <div className="  col-span-full xl:col-span-3 pb-5 md:pb-10 items-center lg:items-start  flex gap-5 flex-col">
              <div>
                <p className=" text-center lg:text-left  text-white">DOWNLOAD APP</p>
                <div className=" flex lg:justify-normal justify-center items-center gap-3 mt-5">
                  <Google />
                  <Apple />
                </div>
                <div className="flex flex-col items-start mt-5">
                  <p className=" text-white">FOLLOW US</p>
                  <SocialMedia />
                  <div className=" h-10 w-[23rem] mt-4 md:h-20  relative">
                    <Image src="/payments.png" alt="payments" fill className=" object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  px-5 md:mt-5 md:grid  hidden md:grid-cols-7 gap-10 justify-center mx-auto pt-5">
            {images.map((img, i) => (
              <div key={i} className="relative h-24  w-full ">
                <Image src={img} alt="logo" fill className=" object-contain" />
              </div>
            ))}
          </div>
          <div className=" justify-center  mt-4  md:hidden flex items-center">
            <SwiperCards
              logo={true}
              spaceBetween={15}
              slidesPerView={2.5}
              samePhone
              className=" w-full  h-32 "
              items={images.map((img) => {
                return { src: img };
              })}
            />
          </div>
        </MaxWidthWrapper>
      </footer>
    </>
  );
};

export default Footer;
