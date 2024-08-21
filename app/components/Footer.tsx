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
  const local = cookies().get("locale")?.value;
  return (
    <>
      <footer className="relative uppercase bg-main2">
        <MaxWidthWrapper className="relative z-10 items-center py-10 lg:py-20 lg:pt-28 lg:pt-20 pt-10">
          <div className="border-b border-gray-400 pb-5 grid gap-10 lg:gap-20 xl:gap-32 grid-cols-5 xl:grid-cols-8">
            <div className="col-span-full lg:col-span-3 items-center lg:items-start flex gap-4 flex-col">
              <Logo />
              <div className="flex items-center gap-3">
                <Phone />
                <p className="ml-2 tracking-wide text-white text-3xl font-[600]">19842</p>
              </div>
              <div className="flex items-start gap-3">
                <HeadPhones />
                <div className="text-white flex gap-1 flex-col">
                  <p className="ml-2 tracking-wide text-center  lg:text-justify text-xl font-[500]">
                    {t("footer.headOffice")} {/* 'HEED OFFICE' in your translation file */}
                  </p>
                  <div className="ml-2 flex justify-center flex-col lg:flex-row gap-3 items-center text-[14px]">
                    <p className="text-center  lg:text-justify mx-auto">
                      {t("footer.headOfficeAddress")} {/* 'Head Office Maadi, Cairo.' */}
                    </p>
                    <p className="py-1 px-4 w-fit text-xs bg-gray-400/40 rounded-full">
                      {t("footer.showMap")} {/* 'Show Map' */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeadPhones />
                <div className="text-white flex gap-1 flex-col">
                  <p className="ml-2 tracking-wide text-center  lg:text-justify text-xl font-[500]">
                    {t("footer.factory")} {/* 'Factory' */}
                  </p>
                  <div className="ml-2 flex justify-center flex-col lg:flex-row gap-3 items-center text-[14px]">
                    <p>
                      {t("footer.factoryAddress")} {/* 'Factory Maadi, Cairo.' */}
                    </p>
                    <p className="py-1 px-4 w-fit text-xs bg-gray-400/40 rounded-full">
                      {t("footer.showMap")} {/* 'Show Map' */}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:ml-5 col-span-full lg:col-span-2 text-gray-50">
              <p className="text-center  lg:text-justify">{t("footer.aboutus")}</p> {/* 'ABOUT ORIENT' */}
              <ul className="grid text-center grid-cols-2 uppercase lg:items-start items-center lg:flex lg:flex-col mt-2 lg:mt-10 gap-3">
                <Link href="/">{t("footer.home")}</Link>
                <Link href="/about-us">{t("footer.aboutus")}</Link>
                <Link href="/products">{t("footer.products")}</Link>
                <Link href="/color-trend">{t("footer.colorTrend")}</Link> {/* 'COLOR TREND' */}
                <Link href="/become-parteners">{t("footer.becomepartener")}</Link>
                <Link href="/get-inspired">{t("footer.getinspired")}</Link>
              </ul>
            </div>

            <div className="col-span-full xl:col-span-3 pb-5 lg:pb-10 items-center lg:items-start flex gap-5 flex-col">
              <div>
                <p className="text-center  lg:text-justify text-white">{t("footer.downloadApp")}</p>{" "}
                {/* 'DOWNLOAD APP' */}
                <Download />
                <div className="flex flex-col items-start mt-5">
                  <p className="text-white">{t("footer.followUs")}</p> {/* 'FOLLOW US' */}
                  <SocialMedia />
                  <div className="h-10  w-full mt-4 lg:h-20 relative">
                    <Image src="/payments.png" alt="payments" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 lg:mt-5 lg:grid hidden lg:grid-cols-7 gap-10 justify-center mx-auto pt-5">
            {images.map((img, i) => (
              <div key={i} className="relative h-24 w-full">
                <Image src={img} alt="logo" fill className="object-contain" />
              </div>
            ))}
          </div>
          <div className="justify-center mt-4 lg:hidden flex items-center">
            <SwiperCards
              logo={true}
              spaceBetween={15}
              slidesPerView={2.5}
              samePhone
              className="w-full h-32"
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
