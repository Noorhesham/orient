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
import Calculate from "../../components/Calculate";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import AppDownload from "@/app/components/AppDownload";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Server } from "@/app/main/Server";
import { CACHE, WEBSITEURL } from "@/app/constants";
import MotionItem from "@/app/components/MotionItem";
import dynamic from "next/dynamic";
import { cache } from "react";
const MotionContainer = dynamic(() => import("../../components/MotionContainer"), {
  ssr: false,
});
const getHomeData = cache(async () => {
  return Server({
    resourceName: "home",
    queryParams: new URLSearchParams({ with: "tags,category_id" }),
    cache: CACHE,
  });
});
export const generateMetadata = async () => {
  const { page } = await getHomeData();

  return {
    title: `${page.title} `,
    // description: product.description,
    canonical: WEBSITEURL,
    openGraph: {
      title: "oreint",
      url: "/E logo Blue (2).png",
      images: [
        {
          url: "/E logo Blue (2).png",
          alt: "orient",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "orient",
      images: [
        {
          url: "/E logo Blue (2).png",
          title: "orient",
        },
      ],
    },
  };
};
export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const { page } = await getHomeData(); // Reuses cached result

  const {
    products_list,
    blogs,
    products_categories,
  }: { products_list: Product[]; blogs: any[]; products_categories: any } = page;

  return (
    <main style={{ padding: "0px 0px !important" }} className=" overflow-x-hidden">
      <section className="relative h-full  min-h-[47vh] sm:min-h-[80vh] md:min-h-[100vh] 2xl:min-h-[100vh] lg:min-h-[110vh] w-full">
        <ImageSlider covers={page.cover} />
      </section>
      <MaxWidthWrapper>
        <Section
          link="/shop"
          className="  min-h-[30vh]"
          heading={page.products_sction_title}
          linkText={t("browse all products")}
        >
          <div className=" mt-4 flex">
            <SwiperCards
              autoplay
              slidesPerView={4}
              mobile={2}
              md={2}
              className=" w-full h-full"
              items={products_list.map((item: Product, index: number) => {
                return {
                  card: (
                    <Card
                      key={index}
                      id={item.id}
                      price={item.price_before_discount}
                      text={item.title}
                      img={item?.main_cover[0]?.sizes?.medium}
                    />
                  ),
                };
              })}
            />
          </div>
        </Section>
      </MaxWidthWrapper>
      <div className=" relative  sm:h-[28rem]  h-80 mt-2">
        <SwiperCards
          btns
          mobile={1.3}
          className="aspect-square "
          items={products_categories?.map((item: any, index: number) => {
            return {
              src: item.image?.[0]?.file,
              text: item.title,
              link: `/shop?category_id=${item.id}`,
            };
          })}
        />
      </div>{" "}
      <MaxWidthWrapper>
        <MotionContainer className=" flex  sm:flex-nowrap   justify-center  items-start gap-10 md:gap-20  mt-3 ">
          <MotionItem>
            <Link href={"/color-trend"} className=" flex gap-3 ">
              <div className=" flex flex-col  items-center gap-2">
                <div className=" rounded-full  md:w-44 sm:w-28 sm:h-28 w-24 h-24 md:h-44 relative">
                  <Image src={"/Ellipse 860.svg"} fill className="rounded-full object-cover" alt="color-trend" />
                </div>
                <h1 className=" text-base text-center  md:text-2xl text-main2 font-[500] mt-4 ">
                  {t("breadcrumb.color trend")}
                </h1>
              </div>
            </Link>
          </MotionItem>

          <MotionItem>
            {" "}
            <Link href={"/get-inspired"} className=" flex gap-3 ">
              <div className=" flex flex-col  items-center gap-2">
                <div className=" rounded-full  md:w-44 sm:w-28 sm:h-28 w-24 h-24 md:h-44 relative">
                  <Image src={"/Rectangle 156397.png"} fill className="rounded-full object-cover" alt="color-trend" />
                </div>
                <h2 className=" text-base text-center  md:text-2xl text-main2 font-[500] mt-4 ">
                  {t("breadcrumb.get inspired")}
                </h2>
              </div>
            </Link>
          </MotionItem>
          <MotionItem>
            <Calculate />
          </MotionItem>
        </MotionContainer>
      </MaxWidthWrapper>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" cursor-pointer aspect-[1/1.2] h-full  md:aspect-[2.3] relative">
            <Image
              className=" md:block hidden   object-contain lg:object-cover  w-full h-full"
              src={page.download_app_image_for_pc[0].file}
              fill
              alt="download orient app"
            />
            <Image
              className="  block md:hidden  object-cover w-full h-full"
              src={page.download_app_image_for_mob[0].file}
              fill
              alt="download orient app"
            />
          </div>
        </DialogTrigger>
        <AppDownload />
      </Dialog>
      <MaxWidthWrapper>
        <Section headingColor="#E6007E" headingclass="mx-auto" heading={page.section_name} className=" relative">
          <div className="  flex flex-col gap-8 lg:mt-5">
            <div
              dangerouslySetInnerHTML={{ __html: page?.section_content }}
              className={` ${
                locale == "ar" ? "" : "xl:translate-x-[24rem]"
              } translate-x-0 text-center md:text-start font-medium my-2 leading-[1.7] lg:max-w-2xl   z-10 relative mt-5 `}
            />
          </div>
        </Section>
      </MaxWidthWrapper>
      <div className=" relative px-3">
        <MaxWidthWrapper className=" relative xl:absolute xl:left-36  bottom-0" noPadding noPaddingX>
          <MotionItem
            nohover
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut", stiffness: 100 } }}
            className={` ${
              locale == "ar" ? "left-0" : "right-[20%] sm:right-[40%]    md:right-20 xl:left-0 "
            }  aspect-square w-auto  h-full lg:mt-0  md:h-80 xl:h-80 -bottom-10  lg:absolute`}
          >
            <Image
              src={page.image[0]?.file}
              fill
              className="  object-bottom object-contain lg:object-cover "
              alt="brown"
            />
          </MotionItem>
        </MaxWidthWrapper>
        <div className=" md:mt-8   grid grid-cols-6 gap-[4px]">
          {page.colors.map((item: any, index: number) => {
            return (
              <div className=" w-full  h-40 lg:h-52 " style={{ backgroundColor: `#${item.color}` }} key={index}></div>
            );
          })}
        </div>
      </div>
      <MaxWidthWrapper className="  flex  gap-4  flex-col items-center justify-center">
        <Heading mainText={t("discover")} className="mt-5 " subText={t("discover2")} paragraph={""} />

        <div className=" lg:mt-4 w-full  h-full ">
          <SwiperCards
            className=" w-full h-full"
            slidesPerView={3}
            md={2}
            autoplay
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
