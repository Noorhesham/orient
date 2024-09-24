import React from "react";
import Logo from "./Logo";
import { Phone, HeadPhones, Google, Apple, PayPal } from "./Icons";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import SwiperCards from "./SwiperCards";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Download from "./Download";
import FooterWrapper from "./FooterWrapper";
import Locations from "./Locations";
import MobileWrapper from "./MobileWrapper";
// Assuming you're using a translation library

const Footer = () => {
  const t = useTranslations(); // Initialize translation hook

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
      <footer className="relative py-5 lg:py-0 uppercase bg-main2">
        <MaxWidthWrapper className="relative z-10 items-center   ">
          <div className="border-b border-gray-400 pb-5 grid gap-10 lg:gap-20 xl:gap-32 grid-cols-5 xl:grid-cols-8">
            <div className="col-span-full lg:col-span-3 items-center lg:items-start flex gap-4 flex-col">
              <Logo />

              <Locations />
            </div>

            <div className="lg:ml-5 col-span-full lg:col-span-2 text-gray-50">
              <p className="text-center  lg:text-justify">{t("footer.whoAre")}</p> {/* 'ABOUT ORIENT' */}
              <ul className="grid text-center grid-cols-2 uppercase lg:items-start items-center lg:flex lg:flex-col mt-2 lg:mt-10 gap-3">
                <Link href="/">{t("footer.home")}</Link>
                <Link href="/about-us">{t("footer.aboutus")}</Link>
                <Link href="/products">{t("footer.products")}</Link>
                <Link href="/color-trend">{t("footer.colorTrend")}</Link> {/* 'COLOR TREND' */}
                <Link href="/become-parteners">{t("footer.becomepartener")}</Link>
                <Link href="/get-inspired">{t("footer.getinspired")}</Link>
                <Link href="/blog">{t("footer.blog")}</Link>
              </ul>
            </div>

            <div className="col-span-full  xl:col-span-3 pb-5 lg:pb-10 items-center lg:items-start flex gap-5 flex-col">
              <div>
                <p className="text-center  lg:text-justify text-white">{t("footer.downloadApp")}</p>{" "}
                {/* 'DOWNLOAD APP' */}
                <Download />
                <div className="flex flex-col items-center lg:items-start mt-5">
                  <p className="text-white">{t("footer.followUs")}</p> {/* 'FOLLOW US' */}
                  <SocialMedia />
                  <div className="h-10  w-full mt-4 lg:h-20 relative">
                    <Image src="/payments.png" alt="payments" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MobileWrapper
            desktop={
              <div className="px-5 lg:mt-5 grid  grid-cols-7 gap-10 justify-center mx-auto pt-5">
                {images.map((img, i) => (
                  <div key={i} className="relative h-24 w-full">
                    <Image src={img} alt="logo" fill className="object-contain" />
                  </div>
                ))}
              </div>
            }
            mobile={
              <div className=" mt-5 h-40">
                <SwiperCards
                  autoplay
                  logo={true}
                  spaceBetween={10}
                  contain
                  mobile={3}
                  md={3}
                  slidesPerView={4}
                  samePhone
                  className=" w-full  h-32 "
                  items={images.map((item: any, index: number) => {
                    return { src: item };
                  })}
                />
              </div>
            }
          />
          <FooterWrapper images={images} />
        </MaxWidthWrapper>
      </footer>
    </>
  );
};

export default Footer;
