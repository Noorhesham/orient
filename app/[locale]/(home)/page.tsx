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
  const { page } = await Server({
    resourceName: "home",
    cache: 0,
    queryParams: new URLSearchParams({ with: "tags,category_id" }),
  });

  const {
    products_list,
    blogs,
    products_categories,
  }: { products_list: Product[]; blogs: any[]; products_categories: any } = page;

  return (
    <main style={{ padding: "0px 0px !important" }} className="">
      <section className="relative h-full min-h-[47vh] sm:min-h-[80vh] md:min-h-[100vh] 2xl:min-h-[100vh] lg:min-h-[110vh] w-full">
        <ImageSlider covers={page.cover} />
      </section>
      <MaxWidthWrapper>
        <Section
          link="/shop"
          className="  min-h-[30vh]"
          heading={page.products_sction_title}
          linkText={t("browse all products")}
        >
          <MobileWrapper
            desktop={
              <MotionContainer className="lg:grid justify-items-center   hidden   lg:grid-cols-4 items-center gap-5 lg:gap-8 mt-5 lg:mt-10 justify-center">
                {products_list.map((item: Product, index: number) => (
                  <Card
                    key={index}
                    id={item.id}
                    price={item.price}
                    text={item.title}
                    img={item?.main_cover[0]?.sizes?.medium}
                  />
                ))}
              </MotionContainer>
            }
            mobile={
              <div className=" mt-4 flex lg:hidden">
                <SwiperCards
                  autoplay
                  slidesPerView={2}
                  className=" w-full h-full"
                  items={products_list.map((item: Product, index: number) => {
                    return {
                      card: (
                        <Card
                          key={index}
                          id={item.id}
                          price={item.price}
                          text={item.title}
                          img={item?.main_cover[0]?.sizes?.medium}
                        />
                      ),
                    };
                  })}
                />
              </div>
            }
          />
        </Section>
      </MaxWidthWrapper>
      <div className=" relative  sm:h-96  h-80 mt-2">
        <SwiperCards
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
        <div className=" flex  sm:flex-nowrap   justify-center  items-start gap-10 md:gap-20  mt-3 ">
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

          <Link href={"/get-inspired"} className=" flex gap-3 ">
            <div className=" flex flex-col  items-center gap-2">
              <div className=" rounded-full  md:w-44 sm:w-28 sm:h-28 w-24 h-24 md:h-44 relative">
                <Image src={"/Rectangle 156397.png"} fill className="rounded-full object-cover" alt="color-trend" />
              </div>
              <h1 className=" text-base text-center  md:text-2xl text-main2 font-[500] mt-4 ">
                {t("breadcrumb.get inspired")}
              </h1>
            </div>
          </Link>
          <Calculate />
        </div>
      </MaxWidthWrapper>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" cursor-pointer aspect-[1/1.2] h-full  md:aspect-[2.7] relative">
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
          <div className="  lg:mt-5">
            <div
              dangerouslySetInnerHTML={{ __html: page?.section_content }}
              className={` ${
                local == "ar" ? "" : "xl:translate-x-[24rem]"
              } translate-x-0 text-center font-medium my-2 leading-[1.7] lg:max-w-2xl   z-10 relative mt-5 `}
            />
            <div
              className={` ${
                local == "ar" ? "left-0" : "right-[20%] sm:right-[40%]    md:right-20 xl:left-0 "
              }  aspect-square w-auto h-64 sm:h-72 md:h-80 xl:h-80 bottom-0  top-[105%] sm:top-[90%] md:top-[82%] xl:top-[5.5rem]  absolute`}
            >
              <Image src={page.image[0]?.file} fill className=" object-cover " alt="brown" />
            </div>
          </div>
        </Section>
      </MaxWidthWrapper>
      <div className=" px-3">
        <div className=" mt-10   grid grid-cols-6 gap-[4px]">
          {page.colors.map((item: any, index: number) => {
            return <div className=" w-full h-52 " style={{ backgroundColor: `#${item.color}` }} key={index}></div>;
          })}
        </div>
      </div>
      <MaxWidthWrapper className="  flex  gap-4  flex-col items-center justify-center">
        <Heading mainText={t("discover")} className="mt-5 " subText={t("discover2")} paragraph={""} />

        <div className=" mt-4 w-full  h-full ">
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
