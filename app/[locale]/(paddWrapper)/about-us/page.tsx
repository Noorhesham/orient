import React from "react";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Image from "next/image";
import { PlayIcon } from "../../../components/Icons";
import SwiperCards from "../../../components/SwiperCards";
import ZoomImage from "@/app/components/ZoomImage";
import Paragraph from "@/app/components/Paragraph";
import { cookies } from "next/headers";
import { Server } from "@/app/main/Server";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const local = cookies().get("NEXT_LOCALE")?.value;
  const t = await getTranslations();
  const data = await Server({ resourceName: "about-us", cache: Infinity });
  const { page } = data;
  console.log(page);
  const { certificates } = page;
  return (
    <>
      <section className=" relative min-h-screen 2xl:min-h-[80vh]">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${page.cover_for_pc[0].file})`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
      </section>
      <MaxWidthWrapper>
        <section className="">
          <div className=" flex lg:flex-row flex-col items-start lg:items-center">
            <div className="flex max-w-2xl flex-col gap-4">
              <h1 className=" text-main uppercase text-2xl lg:text-4xl font-bold">{page.mission_title}</h1>
              <Paragraph
                className={` ${local === "ar" ? "lg:ml-[6.3rem]" : "lg:mr-[6.3rem]"}`}
                description={t("aboutusPage.desc1")}
              />
              <Paragraph
                className={`  ${local === "ar" ? "lg:ml-[5.25rem]" : "lg:mr-[5.25rem]"}`}
                description={t("aboutusPage.desc1")}
              />
            </div>
            <div className=" lg:my-0 my-3  flex-grow flex-col flex  w-full xl:w-[35%]  h-[616px] relative ">
              <Image src="/about1.png" alt="about" className=" object-cover" fill />
              <Image
                src="/about2.png"
                alt="about"
                width={348}
                height={297}
                className={` ${
                  local === "ar" ? "right-10 " : "left-10 lg:left-[-13%]"
                } absolute  w-[60%]   top-[50%]  md:top-[40%]`}
              />
            </div>
          </div>
        </section>
      </MaxWidthWrapper>

      <ZoomImage
        btn={
          <div className=" cursor-pointer h-[400px] lg:h-[571px] w-full relative">
            <div className=" cursor-pointer hover:opacity-90 duration-150 absolute  bottom-10 left-40 -translate-x-1/2 -translate-y-1/2 z-10">
              <PlayIcon />
            </div>
            <Image src={page.video_image_for_pc[0].file} alt="about" className=" sm:block hidden object-contain" fill />
            <Image
              src={page.video_image_for_mob[0].file}
              alt="about"
              className=" sm:hidden block object-contain"
              fill
            />
          </div>
        }
        content={
          <div className=" w-full h-full flex items-center justify-center">
            <iframe
              width="80%"
              height="100%"
              src="https://www.youtube.com/embed/E8lXC2mR6-k?si=mUOcdTwpLWz7Zusb"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        }
      />

      <MaxWidthWrapper className="">
        <div className="flex md:flex-row gap-4 flex-col items-center">
          <div className=" w-full lg:min-w-[576px] flex-grow h-[200px] relative">
            <Image src={page.vision_image[0].file} alt="about" className=" object-cover" fill />
          </div>
          <div className=" flex-shrink flex flex-col gap-2">
            <h1 className=" text-3xl font-bold text-main">{page.vision_title}</h1>
            <Paragraph full description={page.vision_content} />
          </div>
        </div>

        <div className="flex md:flex-row flex-col mt-10 gap-4 items-center">
          <div className=" flex-shrink flex flex-col gap-2">
            <h1 className=" text-3xl font-bold text-main">{page.mission_title}</h1>
            <Paragraph full description={page.mission_content} />
          </div>
          <div className=" w-full lg:min-w-[576px] lg:mt-0 mt-10 flex-grow h-[200px] relative">
            <Image src={page.mission_image[0].file} alt="about" className=" object-cover" fill />
          </div>
        </div>

        <div className="flex  lg:my-10 my-5 gap-4 lg:gap-8 items-start flex-col md:flex-row lg:items-end">
          <div className=" flex-grow  relative">
            {local === "en" && <h1 className=" text-main2 text-3xl lg:text-5xl font-semibold">OUR</h1>}
            <h1 className=" text-main2 text-3xl lg:text-5xl font-semibold">{t("aboutusPage.certificate")}</h1>
          </div>

          <Paragraph full description={page.certificates_content} />
        </div>

        <div className="h-52  block">
          <SwiperCards
            btns={true}
            logo={true}
            spaceBetween={50}
            contain
            slidesPerView={5}
            className=" w-full  h-32 "
            items={page.certificates.map((item: any, index: number) => {
              return { src: item.file };
            })}
          />
        </div>
        <div className="">
          <div className="flex mt-5  gap-4 lg:gap-8 items-start flex-col md:flex-row lg:items-end">
            <div className=" flex-grow  relative">
              <h1 className=" text-main2 text-3xl lg:text-5xl font-semibold">{t("aboutusPage.parteners")}</h1>
            </div>

            <Paragraph full description={page.partners_content} />
          </div>

          <div className=" justify-center  h-52 lg:mt-8  flex items-center">
            <SwiperCards
              btns={true}
              logo={true}
              spaceBetween={50}
              slidesPerView={5}
              contain
              className=" w-full  object-contain  h-32 "
              items={page.partners.map((item: any, index: number) => {
                return { src: item.file };
              })}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
