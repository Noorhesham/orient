import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Image from "next/image";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import CardHuge from "../../../components/CardHuge";
import Heading from "../../../components/Heading";
import LinkButton from "../../../components/LinkButton";
import ZoomImage from "../../../components/ZoomImage";
import BreadCrumb from "@/app/components/BreadCrumb";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import SwiperCards from "@/app/components/SwiperCards";
import { Server } from "@/app/main/Server";
import { convertToHTML } from "@/lib/utils";
import MotionItem from "@/app/components/MotionItem";
import { CACHE } from "@/app/constants";
import ImageGrid from "@/app/components/ImageGrid";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  // const t = useTranslations();
  const t = await getTranslations({ locale });
  const { page } = await Server({ resourceName: "colortrend", cache: CACHE });
  console.log(page);
  const contentHTML = convertToHTML(page.content);
  return (
    <main className=" pt-40 min-h-screen  ">
      <BreadCrumb />
      <section className=" relative min-h-[47vh] lg:min-h-[70vh]">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${page?.cover_for_web[0]?.file})`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation lg:block  hidden absolute inset-0 `}
        />
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${page?.cover_for_mobile?.[0]?.file})`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation block lg:hidden  absolute inset-0 `}
        />
      </section>

      <MaxWidthWrapper>
        <div className=" flex flex-col md:flex-row gap-5   justify-between items-start  ">
          <div style={{ color: page.page_color }} className=" flex  flex-col items-start">
            <p className=" text-xs font-medium">{t("ABOUT COLOR")}</p>
            <h1 className=" text-3xl font-[600] uppercase max-w-[20rem] ">{page.small_title || page.title}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: contentHTML }}
            className={`lg:max-w-2xl text-black text-sm  font-medium my-2 leading-[1.7] `}
          />
        </div>
        <ImageGrid
          imageclasses="relative  cursor-pointer rounded-lg w-full h-full "
          className="grid grid-cols-1 lg:grid-cols-3  gap-6 mt-5"
          images={page.gallery}
        />
      </MaxWidthWrapper>
      <div className="flex lg:max-w-[97%] xl:max-w-[91.5%] gap-4 items-center">
        <MotionItem
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{
            clipPath: "inset(0 0 0 0)",
            transition: { type: "spring", duration: 0.5 },
          }}
          className="   flex-1 lg:flex hidden lg:basis-[40%]   h-[435px] relative"
        >
          <Image src={"/06adf7b6-c541-4597-9024-b33ffa6f91b3.png"} alt="" fill className=" object-cover" />
        </MotionItem>
        <MaxWidthWrapper className=" lg:max-w-full px-4 md:px-10 lg:px-0 max-w-[1330px] lg:w-[60%]   flex-1  ">
          <Section
            className="mt-5   flex items-center  gap-4  md:flex-row flex-col w-full "
            heading={page.product_title || t("similarProducts")}
          >
            <div className=" flex  w-full  h-full  mt-4 ">
              <SwiperCards
                autoplay
                slidesPerView={3}
                items={page.products.map((product: Product, index: number) => {
                  return {
                    card: (
                      <Card
                        key={product.id}
                        id={product.id || ""}
                        text={product.title}
                        img={product.main_cover[0]?.sizes?.medium || "/default-thumbnail.jpg"}
                        price={product.price_before_discount}
                        discount={
                          product.price_after_discount !== product.price_before_discount
                            ? product.price_after_discount
                            : null
                        }
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
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
