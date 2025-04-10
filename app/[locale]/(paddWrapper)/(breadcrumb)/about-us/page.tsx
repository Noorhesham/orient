import React from "react";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import Image from "next/image";
import { PlayIcon } from "../../../../components/Icons";
import SwiperCards from "../../../../components/SwiperCards";
import Paragraph from "@/app/components/Paragraph";
import { Server } from "@/app/main/Server";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import VideoZoom from "@/app/components/VideoZoom";
import { processYoutubeUrl } from "@/lib/utils";
import MotionItem from "@/app/components/MotionItem";
import MotionContainer from "@/app/components/MotionContainer";
import IsMobSlide from "./IsMobSlide";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const data = await Server({ resourceName: "about-us", cache: 0 });
  const { page } = data;
  return (
    <>
      <section className=" relative min-h-[23vh] lg:min-h-[80vh]">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${page.cover_for_pc?.[0]?.file})`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
      </section>
      <MaxWidthWrapper>
        <section className=" overflow-x-hidden">
          <div className=" flex lg:flex-row flex-col items-start lg:items-center">
            <div className="flex lg:max-w-2xl w-full lg:w-[65%] flex-col gap-4">
              <h2 className=" text-main uppercase text-2xl lg:text-3xl font-bold">{page.content_title}</h2>

              <Paragraph
                className={` ${locale === "ar" ? "lg:ml-[5.25rem]" : "lg:mr-[5.25rem]"}`}
                danger
                full
                description={page.content}
              />
            </div>
            <MotionItem
              nohover
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5, type: "spring" } }}
              className=" lg:my-0 my-3  flex-grow flex-col flex  w-full xl:w-[31%]  h-[616px] relative "
            >
              <Image src={page.content_images?.[0].file} alt="about" className=" object-cover" fill />
              <Image
                src={page.content_images?.[1].file}
                alt="about"
                width={348}
                height={297}
                className={` ${
                  locale === "ar"
                    ? " left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 lg:-right-16 "
                    : "left-1/2  -translate-x-1/2 lg:translate-x-0  lg:left-[-13%]"
                } absolute  w-[60%]   top-auto md:bottom-0 bottom-10  md:top-[40%]`}
              />
            </MotionItem>
          </div>
        </section>
      </MaxWidthWrapper>

      <div className="py-8 lg:py-16">
        {" "}
        <VideoZoom
          btn={
            <div className=" cursor-pointer h-[350px] lg:h-[400px] xl:h-[571px] w-full relative">
              <div className=" cursor-pointer hover:opacity-90 duration-150 absolute -bottom-10  lg:bottom-10 left-20 lg:left-40 -translate-x-1/2 -translate-y-1/2 z-10">
                <PlayIcon />
              </div>
              <Image
                src={page.video_image_for_pc?.[0].file}
                alt="about"
                className=" md:block hidden object-cover"
                fill
              />
              <Image
                src={page.video_image_for_mob?.[0].file}
                alt="about"
                className=" md:hidden block object-cover"
                fill
              />
            </div>
          }
          content={
            <div className="relative w-full h-auto overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={processYoutubeUrl(page.video_youtube_url).embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder="0"
              ></iframe>
            </div>
          }
        />{" "}
      </div>

      <MaxWidthWrapper className=" flex flex-col gap-5 lg:gap-10">
        <MotionContainer className="flex lg:flex-row gap-4 flex-col items-center">
          <MotionItem nohover className=" w-full lg:min-w-[576px] flex-grow h-[200px] relative">
            <Image src={page.vision_image[0]?.file} alt="about" className=" object-cover" fill />
          </MotionItem>
          <MotionItem nohover className=" flex-shrink flex flex-col gap-2">
            <h2 className=" text-3xl font-bold text-main">{page.vision_title}</h2>
            <Paragraph danger full description={page.vision_content} />
          </MotionItem>
        </MotionContainer>

        <MotionContainer className="flex lg:flex-row    flex-col-reverse gap-4 items-center">
          <MotionItem nohover className=" flex-shrink flex flex-col gap-2">
            <h2 className=" text-3xl font-bold text-main">{page.mission_title}</h2>
            <Paragraph danger full description={page.mission_content} />
          </MotionItem>
          <MotionItem nohover className=" w-full lg:min-w-[576px] lg:mt-0  flex-grow h-[200px] relative">
            <Image src={page?.mission_image[0]?.file} alt="about" className=" object-cover" fill />
          </MotionItem>
        </MotionContainer>

        <div className="flex   gap-4  lg:gap-8 items-start flex-col lg:flex-row lg:items-center">
          <div className=" flex-grow  relative">
            {locale === "en" && <h2 className=" text-main2 text-3xl lg:text-5xl font-semibold">OUR</h2>}
            <h2 className=" text-main2 text-3xl lg:text-5xl font-semibold">{t("aboutusPage.certificate")}</h2>
          </div>

          <Paragraph danger className=" " full description={page.certificates_content} />
        </div>

        <IsMobSlide items={page.certificates} />
        <div className="">
          <div className="flex mt-5  gap-4  lg:gap-8 items-start flex-col md:flex-row lg:items-center">
            <div className=" flex-grow  relative">
              <h2 className=" text-main2 text-3xl lg:text-5xl font-semibold">{t("aboutusPage.parteners")}</h2>
            </div>

            <Paragraph danger full description={page.partners_content} />
          </div>
          <IsMobSlide items={page.partners} />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
