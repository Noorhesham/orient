import Image from "next/image";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ImageSlider from "../../components/ImageMainSlider";
import Section from "../../components/Section";
import Card from "../../components/Card";
import SwiperCards from "../../components/SwiperCards";
import Heading from "../../components/Heading";
import CardHuge from "../../components/CardHuge";
import LinkButton from "../../components/LinkButton";
import Link from "next/link";
import dynamic from "next/dynamic";
import Calculate from "../../components/Calculate";
import Paragraph from "@/app/components/Paragraph";
import { cookies } from "next/headers";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import AppDownload from "@/app/components/AppDownload";
import { getTranslations } from "next-intl/server";
import { Server } from "@/app/main/Server";
import MobileWrapper from "@/app/components/MobileWrapper";
const MotionContainer = dynamic(() => import("../../components/MotionContainer"), {
  ssr: false,
});

export default async function Home() {
  const local = cookies().get("NEXT_LOCALE")?.value;
  const t = await getTranslations();
  const { page } = await Server({ resourceName: "home", cache: 0 });
  const {
    products_list,
    blogs,
    products_categories,
  }: { products_list: Product[]; blogs: any[]; products_categories: any } = page;

  return (
    <main style={{ padding: "0px 0px !important" }} className="">
      <section className="relative h-full min-h-[100vh] 2xl:min-h-[100vh] lg:min-h-[110vh] w-full">
        <ImageSlider covers={page.cover} />
      </section>
      <MaxWidthWrapper className="my-2 ">
        <Section link="#" className="  min-h-[30vh]" heading={page.products_sction_title} linkText={t("browse")}>
          <MobileWrapper
            desktop={
              <MotionContainer className="lg:grid justify-items-center   hidden   lg:grid-cols-4 items-center gap-5 lg:gap-8 mt-5 lg:mt-10 justify-center">
                {products_list.map((item: Product, index: number) => (
                  <Card key={index} price={item.price} text={item.title} img={item.main_cover[0].sizes.medium} />
                ))}
              </MotionContainer>
            }
            mobile={
              <div className=" mt-4 flex lg:hidden">
                <SwiperCards
                  slidesPerView={2}
                  className=" w-full h-full"
                  items={products_list.map((item: Product, index: number) => {
                    return {
                      card: (
                        <Card key={index} price={item.price} text={item.title} img={item.main_cover[0].sizes.medium} />
                      ),
                    };
                  })}
                />
              </div>
            }
          />
        </Section>
      </MaxWidthWrapper>
      <div className=" relative h-96 mt-2">
        <SwiperCards
          mobile={1.3}
          className=""
          items={products_categories.map((item: any, index: number) => {
            return {
              src: item.image[0].file,
              text: item.title,
            };
          })}
        />
      </div>{" "}
      <MaxWidthWrapper>
        <div className=" flex  sm:flex-nowrap   justify-center  items-start gap-10 md:gap-20  mt-3 ">
          <Link href={"/color-trend"} className=" flex gap-3 ">
            <div className=" flex flex-col  items-center gap-2">
              <div className=" rounded-full  md:w-44 sm:w-28 sm:h-28 w-24 h-24 md:h-44 relative">
                <Image src={"/Ellipse 860.svg"} fill className="rounded-full object-cover" alt="color-trend" />
              </div>
              <h1 className=" text-base text-center  md:text-2xl text-main2 font-[500] mt-4 ">COLOR TRENDS</h1>
            </div>
          </Link>

          <Link href={"/get-inspired"} className=" flex gap-3 ">
            <div className=" flex flex-col  items-center gap-2">
              <div className=" rounded-full  md:w-44 sm:w-28 sm:h-28 w-24 h-24 md:h-44 relative">
                <Image src={"/Rectangle 156397.png"} fill className="rounded-full object-cover" alt="color-trend" />
              </div>
              <h1 className=" text-base md:text-center  md:text-2xl text-main2 font-[500] mt-4 ">GET INSPIRED</h1>
            </div>
          </Link>
          <Calculate />
        </div>
      </MaxWidthWrapper>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" cursor-pointer 2xl:h-[68vh] h-[450px]  relative w-full ">
            <Image
              className=" lg:block hidden xl:hidden 2xl:block object-contain lg:object-cover  w-full h-full"
              src={page.download_app_image_for_pc[0].file}
              fill
              alt="download orient app"
            />
            <Image
              className=" xl:block 2xl:hidden lg:hidden block object-contain w-full h-full"
              src={page.download_app_image_for_mob[0].file}
              fill
              alt="download orient app"
            />
          </div>
        </DialogTrigger>
        <AppDownload />
      </Dialog>
      <MaxWidthWrapper>
        <Section headingColor="#E6007E" heading={page.section_name} className=" relative">
          <div className="  mt-5">
            <Paragraph
              description={page.section_content}
              className={` ${
                local == "ar" ? "" : "xl:translate-x-[24rem]"
              } translate-x-0 text-center   z-10 relative mt-5 `}
            />
            <div
              className={` ${
                local == "ar" ? "left-0" : "right-[20%] sm:right-[40%]    md:right-20 xl:left-0 "
              }  aspect-square w-auto h-64 sm:h-72 md:h-80 xl:h-80 bottom-0  top-[107%] sm:top-[90%] md:top-[82%] xl:top-[5.5rem]  absolute`}
            >
              <Image src={page.image[0].file} fill className=" object-cover " alt="brown" />
            </div>
          </div>
        </Section>
      </MaxWidthWrapper>
      <div className=" px-3">
        <div className=" mt-10   grid grid-cols-6 gap-[4px]">
          {page.colors.map((item: any, index: number) => {
            return <div className=" w-full h-52 " style={{ backgroundColor: `#${item.color}` }} key={index}></div>;
          })}
          {/* <div className=" w-full  h-52 bg-[#55402D]"></div>
          <div className=" w-full  h-52 bg-[#A7835E]"></div>
          <div className=" w-full h-52 bg-[#A7835E]"></div>
          <div className=" w-full h-52 bg-[#4D3A2A]"></div>
          <div className=" w-full h-52 bg-[#73573F]"></div>
          <div className=" w-full h-52 bg-[#A9835E]"></div> */}
        </div>
      </div>
      <MaxWidthWrapper className="  flex  gap-4  flex-col items-center justify-center">
        <Heading
          mainText="DISCOVER THE MOST IMPORTANT"
          subText="ARTICLES ABOUT PAINTS"
          paragraph="Explore a world of innovation in paints and coatings. From the latest trends in color technology to sustainable practices shaping the industry, discover insights and expert advice on how to make your next project stand out. Whether you're a professional or DIY enthusiast, these articles provide everything you need to transform your space with creativity and precision."
        />

        <div className=" mt-4 w-full  h-full ">
          <SwiperCards
            className=" w-full h-full"
            slidesPerView={3}
            md={2}
            mobile={1}
            items={blogs.map((item, i) => {
              return { card: <CardHuge item={item} key={i} /> };
            })}
          />
        </div>
        <div className=" mt-2 ">
          <LinkButton text={t("browse")} href="/blog" />
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
