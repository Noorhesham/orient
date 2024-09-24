import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Image from "next/image";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import CardHuge from "../../../components/CardHuge";
import Heading from "../../../components/Heading";
import LinkButton from "../../../components/LinkButton";
import ZoomImage from "../../../components/ZoomImage";
import BreadCrumb from "@/app/components/BreadCrumb";
import Paragraph from "@/app/components/Paragraph";
import MotionContainer from "@/app/components/MotionContainer";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import SwiperCards from "@/app/components/SwiperCards";
import { Server } from "@/app/main/Server";
import { convertToHTML } from "@/lib/utils";
import MobileWrapper from "@/app/components/MobileWrapper";
const getGalleryClasses = (index: number) => {
  switch (index) {
    case 0:
      return "col-span-6 lg:col-span-3 aspect-square order-1";
    case 1:
      return "col-span-6 lg:col-span-3 aspect-square order-3 lg:order-2";
    case 2:
      return "col-span-3 row-span-2 order-2 lg:order-3";
    case 3:
      return "col-span-full lg:col-span-6 order-last";
    default:
      return "col-span-3";
  }
};
const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  // const t = useTranslations();
  const t = await getTranslations({ locale });
  const { page } = await Server({ resourceName: "colortrend", cache: Infinity });
  console.log(page.products);
  const contentHTML = convertToHTML(page.content);
  return (
    <main className=" pt-40 min-h-screen  ">
      <BreadCrumb />
      <section className=" relative min-h-[47vh] lg:min-h-[70vh]">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${page.cover_for_web[0].file})`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
      </section>

      <MaxWidthWrapper>
        <div className=" flex flex-col md:flex-row gap-5   justify-between items-start  ">
          <div style={{ color: page.page_color }} className=" flex  flex-col items-start">
            <p className=" text-xs font-medium">ABOUT COLOR</p>
            <h1 className=" text-3xl font-[600] uppercase max-w-[20rem] ">{page.title}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: contentHTML }}
            className={`lg:max-w-2xl text-black text-sm  font-medium my-2 leading-[1.7] `}
          />
        </div>
        <div className=" mt-5   h-[80vh] gap-6 grid grid-rows-3 lg:grid-rows-2 relative grid-cols-9">
          {page.gallery.map((image, index) => (
            <ZoomImage
              key={image.id}
              src={image.file}
              btn={
                <div className={`relative rounded-lg w-full h-full ${getGalleryClasses(index)}`}>
                  <Image
                    className="rounded-lg cursor-pointer w-full h-full absolute object-cover"
                    fill
                    src={image.file}
                    alt={image.alt}
                  />
                </div>
              }
            />
          ))}
        </div>
      </MaxWidthWrapper>
      <div className="flex lg:max-w-[97%] xl:max-w-[91.5%] gap-4 items-center">
        <div className="   flex-1 lg:flex hidden lg:basis-[40%]   h-[435px] relative">
          <Image src={"/chair.png"} alt="" fill className=" object-cover" />
        </div>
        <MaxWidthWrapper className=" lg:max-w-full px-4 md:px-10 lg:px-0 max-w-[1330px] lg:basis-[60%]   flex-1  ">
          <Section
            link="/shop"
            className="mt-5   flex items-center  gap-4  md:flex-row flex-col w-full "
            heading="BEST SELLERS"
            linkText="BROWSE ALL PRODUCTS"
          >
            <div noPadding className=" mt-2 hidden lg:grid grid-cols-3 gap-4 ">
              {page.products.slice(0, 3).map((product, i) => {
                return (
                  <Card
                    key={product.id}
                    id={product.id || ""}
                    text={product.title}
                    sell={product.sell_price ? product.regular_price : null}
                    img={product.main_cover[0].sizes.medium || "/default-thumbnail.jpg"}
                    price={product.price.toString()}
                  />
                );
              })}
            </div>
            <div className="   mt-4 lg:hidden">
              <SwiperCards
                autoplay
                slidesPerView={2}
                items={page.products.map((product: Product, index: number) => {
                  return {
                    card: (
                      <Card
                        key={product.id}
                        id={product.id || ""}
                        text={product.title}
                        sell={product.sell_price ? product.regular_price : null}
                        img={product.main_cover[0].sizes.medium || "/default-thumbnail.jpg"}
                        price={product.price.toString()}
                      />
                    ),
                  };
                })}
              />
            </div>
          </Section>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="  flex  gap-4  flex-col items-center justify-center">
        <Heading mainText={t("discover")} subText={t("discover2")} paragraph={""} />
        <div className=" mt-4 w-full  h-full ">
          <SwiperCards
            className=" w-full h-full"
            slidesPerView={3}
            md={2}
            mobile={1}
            items={page.blogs.map((item, i) => {
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
};

export default Page;
