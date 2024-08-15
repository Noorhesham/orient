import React from "react";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Image from "next/image";
import { PlayIcon } from "../../../components/Icons";
import SwiperCards from "../../../components/SwiperCards";
import ModalCustom from "@/app/components/ModalCustom";
import ZoomImage from "@/app/components/ZoomImage";
import Paragraph from "@/app/components/Paragraph";

const page = () => {
  return (
    <>
      <section className=" relative min-h-screen">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('/about.png')`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
      </section>
      <MaxWidthWrapper>
        <section className=" mt-10">
          <div className=" flex lg:flex-row flex-col items-center">
            <div className="flex max-w-2xl flex-col gap-4">
              <h1 className=" text-main uppercase text-2xl lg:text-4xl font-bold">our history</h1>
              <Paragraph
                className=" text-center md:text-left md:mr-[6.3rem]"
                description="Founded in 1946, Orient is built on a legacy of integrity, quality assurance, and innovative technology.
                With a continuous effort to hold a unique leading position in the industry, Orient brings together
                Egyptian manufacturing and German technology to offer products that you can rely on and a name you can
                trust."
              />
              <Paragraph
                className=" text-center md:text-left md:mr-[5.25rem]"
                description="Founded in 1946, Orient is built on a legacy of integrity, quality assurance, and innovative technology.
                With a continuous effort to hold a unique leading position in the industry, Orient brings together
                Egyptian manufacturing and German technology to offer products that you can rely on and a name you can
                trust."
              />
            </div>
            <div className="  flex-grow flex-col flex  w-full lg:w-[461px] lg:mt-10 mb-10 mt-5 h-[616px] relative ">
              <Image src="/about1.png" alt="about" className=" object-cover" fill />
              <Image
                src="/about2.png"
                alt="about"
                width={348}
                height={297}
                className=" absolute  top-[60%] left-10  md:w-[60%]  md:-left-28  md:top-[40%]"
              />
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
      <div className=" h-[400px] lg:h-[571px] w-full relative">
        <ZoomImage
          btn={
            <div className=" cursor-pointer hover:opacity-90 duration-150 absolute  bottom-10 left-40 -translate-x-1/2 -translate-y-1/2 z-10">
              <PlayIcon />
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
        <Image src="/about3.png" alt="about" className=" object-contain" fill />
      </div>
      <MaxWidthWrapper className=" mt-20">
        <div className="flex md:flex-row gap-4 flex-col items-center">
          <div className=" w-full lg:min-w-[576px] flex-grow h-[200px] relative">
            <Image src="/About Oud 2.jpg" alt="about" className=" object-cover" fill />
          </div>
          <div className=" flex-shrink flex flex-col gap-2">
            <h1 className=" text-3xl font-bold text-main">OUR VISION</h1>
            <Paragraph
              description=" Donec mattis porta eros, aliquet finibus ri sus interdum at. Nulla vivethe as it was Donec mattis porta
              eros, aliquet finibus risus interdum at. Nulla vivethe as it wasDonec mattis porta eros, aliquet finibus
              risus interdum at. Nulla vivethe as it was"
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col mt-10 gap-4 items-center">
          <div className=" flex-shrink flex flex-col gap-2">
            <h1 className=" text-3xl font-bold text-main">OUR VISION</h1>
            <Paragraph
              description=" Donec mattis porta eros, aliquet finibus ri sus interdum at. Nulla vivethe as it was Donec mattis porta
              eros, aliquet finibus risus interdum at. Nulla vivethe as it wasDonec mattis porta eros, aliquet finibus
              risus interdum at. Nulla vivethe as it was"
            />
          </div>
          <div className=" w-full lg:min-w-[576px] flex-grow h-[200px] relative">
            <Image src="/About Oud 2.jpg" alt="about" className=" object-cover" fill />
          </div>
        </div>

        <div className="flex mt-10 mb-10 gap-4 items-start flex-col md:flex-row lg:items-end">
          <div className=" flex-grow  relative">
            <h1 className=" text-main2 text-3xl lg:text-5xl font-semibold">OUR</h1>
            <h1 className=" text-main2 text-3xl lg:text-5xl font-semibold">CERTIFICATES</h1>
          </div>
          <div className=" flex-shrink flex flex-col gap-2">
            <Paragraph
              full
              description=" Donec mattis porta eros, aliquet finibus ri sus interdum at. Nulla vivethe as it was Donec mattis porta
              eros, aliquet finibus risus interdum at. Nulla vivethe as it wasDonec mattis porta eros, aliquet finibus
              risus interdum at. Nulla vivethe as it was"
            />
          </div>
        </div>
        <div className=" mt-8 hidden  md:grid grid-cols-4 lg:grid-cols-7 pb-10 border-main border-b-2  justify-between items-center ">
          <div className=" w-24 aspect-square  relative">
            <Image src={"/Vector Smart Object 1.png"} alt="Vector Smart" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image
              src={"/PROUDLY MADE IN EGYPT بكل فخر صنع في مصر 23-02 1.png"}
              alt="PROUDLY MADE IN EGYPT بكل فخر صنع في مصر 23-02 1.png"
              className=" object-contain"
              fill
            />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/klml 1.png"} alt="/klml 1.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/t 1.png"} alt="/t 1.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/12 1.png"} alt="/12 1.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/2 5001.png"} alt="2 5001.png" className=" object-contain" fill />
          </div>
          <div className=" w-24 aspect-square  relative">
            <Image src={"/eos_logo 1.png"} alt="es logo" className=" object-contain" fill />
          </div>
        </div>
        <div className="md:hidden block">
          <SwiperCards
            btns={true}
            logo={true}
            spaceBetween={50}
            slidesPerView={5}
            className=" w-full  h-32 "
            items={[
              { src: "/Vector Smart Object 1.png" },
              { src: "/klml 1.png" },
              { src: "/t 1.png" },
              { src: "/12 1.png" },
              { src: "/2 5001.png" },
              { src: "/eos_logo 1.png" },
            ]}
          />
        </div>
        <div className=" pt-10">
          <div className="flex mt-5  gap-4 items-start flex-col md:flex-row lg:items-end">
            <div className=" flex-grow  relative">
              <h1 className=" text-main2 text-3xl lg:text-5xl font-semibold">OUR</h1>
              <h1 className=" text-main2 text-3xl lg:text-5xl font-semibold">PARTENERS</h1>
            </div>
            <div className=" flex-shrink flex flex-col gap-2">
              <Paragraph
                full
                description=" Donec mattis porta eros, aliquet finibus ri sus interdum at. Nulla vivethe as it was Donec mattis porta
              eros, aliquet finibus risus interdum at. Nulla vivethe as it wasDonec mattis porta eros, aliquet finibus
              risus interdum at. Nulla vivethe as it was"
              />
            </div>
          </div>

          <div className=" justify-center  mt-4  flex items-center">
            <SwiperCards
              btns={true}
              logo={true}
              spaceBetween={50}
              slidesPerView={5}
              className=" w-full  h-32 "
              items={[
                { src: "/Artboard-1@300x-1.png" },
                { src: "/Artboard-1@300x-1 (1).png" },
                { src: "/Artboard-1@300x-1 (2).png" },
                { src: "/Artboard-1@300x-1 (3).png" },
                { src: "/Artboard-1@300x-1 (4).png" },
                { src: "/Frame 1321317235.png" },
              ]}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default page;
