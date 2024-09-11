import AddToWishlist from "@/app/components/AddToWishlist";
import Calculate from "@/app/components/Calculate";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import CustomButton from "@/app/components/CustomButton";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import PriceWithSale from "@/app/components/PriceWithSale";
import Section from "@/app/components/Section";
import Stars from "@/app/components/Stars";
import SwiperCards from "@/app/components/SwiperCards";
import { formatPrice } from "@/app/helpers/utils";
import { Button } from "@/components/ui/button";
import { BoxIcon, CreditCard, CreditCardIcon, DownloadIcon, Headphones } from "lucide-react";
import React from "react";
import { CiCalculator2 } from "react-icons/ci";
import { TbShoppingCartPlus, TbView360Arrow } from "react-icons/tb";
import YoutubeThumbnail from "@/app/components/YoutubeThumbnail";
import Reviews from "@/app/components/Reviews";
import Comment from "@/app/components/Comment";
import Feature from "@/app/components/Feature";
import MotionContainer from "@/app/components/MotionContainer";
import AddComment from "@/app/components/AddComment";
import Paragraph from "@/app/components/Paragraph";
import VideoZoom from "@/app/components/VideoZoom";
import { Server } from "@/app/main/Server";
import AddToCart from "@/app/components/AddToCart";
import { getTranslations } from "next-intl/server";
import RightClickProvider from "@/app/context/RightClickDisable";
import Box from "@/app/components/Box";
import NotFound from "@/app/components/NotFound";

const comments = [
  {
    rate: 5,
    date: Date.now(),
    user: { name: "MOHAMED A." },
    text: "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
  {
    rate: 5,
    date: Date.now(),
    user: { name: "Sayed Mohamed" },
    text: "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
  {
    rate: 5,
    date: Date.now(),
    user: { name: "Sara Ahmed" },
    text: "Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling.  Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge, and being a part of a team that's revolutionizing how people achieve their goals is immensely fulfilling. ",
  },
];
export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
  const { product } = await Server({
    resourceName: "getProduct",
    id,
    body: { with: "tags,upSells,crossSells" },
  });

  return {
    title: `${product.title} | PUTTY (ACRYLIC 1000) 233 WALL PAINTS | Your Store Name`,
    description: product.description,
    canonical: `https://yourdomain.com/products/${product.id}`,
    keywords: `${product.title} ${product.description} ${product.search_queries} ${product.short_description}`,
    openGraph: {
      title: product.title,
      description: product.description,
      url: product.main_cover[0].thumbnail,
      images: [
        {
          url: product.main_cover[0].thumbnail,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.main_cover[0].thumbnail,
          alt: product.title,
        },
      ],
    },
  };
};

const page = async ({ params: { id }, searchParams }: { params: { id: string }; searchParams: any }) => {
  const { color, volume } = searchParams;

  const queryParams = new URLSearchParams();
  const array = color
    ?.split(",")
    .concat(volume?.split(","))
    .filter((f: any) => f !== undefined);
  if (array) {
    array.forEach((element: any) => {
      console.log(array);
      const [key, value] = element?.split(":");
      queryParams.append(`options[${key}]`, value);
    });
  }
  const { product, attributes, reviews } = await Server({
    resourceName: "getProduct",
    id,
    queryParams,
    body: { with: "tags,upSells,crossSells" },
  });
  if (!product) return <NotFound />;
  console.log(product, reviews);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.main_cover[0].thumbnail,
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.sell_price,
      availability: "https://schema.org/InStock",
      url: `http://localhost:3001/en/product/${product.id}",`,
    },
  };
  const ims = product.main_cover
    .map((img: any) => ({ src: img.thumbnail }))
    .concat(product.images.map((img: any) => ({ src: img.sizes.large })));
  const t = await getTranslations();
  return (
    <RightClickProvider>
      <section className=" h-full relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="profile-jsonld"
        />

        <MaxWidthWrapper noPadding className="  flex flex-col lg:grid  lg:grid-cols-11 lg:gap-3 items-start">
          <div className="lg:col-span-8 items-center max-w-full flex flex-col gap-4  lg:grid md:grid-cols-2 lg:grid-cols-5 lg:items-start">
            <div className="max-w-full flex col-span-full lg:col-span-2 flex-col mt-3 lg:mt-12 w-full">
              <div className="aspect-square  w-full h-full ">
                <SwiperCards
                  zoom={true}
                  rounded
                  spaceBetween={50}
                  className="w-full aspect-square h-full"
                  slidesPerView={1}
                  md={1}
                  items={ims}
                  paginationImage={true}
                />
              </div>
            </div>
            <div className=" fixed z-50  bottom-0 left-0 p-4 w-full flex items-center bg-white/90 justify-center  lg:hidden gap-3 mt-3">
              <AddToCart max={product.quantity} id={product.id} />
              <CustomButton className=" w-full px-8 py-5" reverse icon={<TbShoppingCartPlus />} text={t("buyNow")} />
            </div>

            <Section
              CustomePadding="px-0 pb-5  py-0"
              headingColor="#E6007E"
              heading={product.title}
              className=" col-span-3 flex-grow text-wrap  mt-12"
            >
              <div className=" pb-5">
                <Stars rating={product?.review_rate || 5} />
                <PriceWithSale
                  price={product.sell_price || product.regular_price}
                  discount={product.sell_price ? product.regular_price : null}
                />
              </div>
              <div className="border-input  flex flex-wrap  border-b border-t    gap-3 py-3 px-5">
                <div className="lg:hidden border-b border-input gap-3 flex flex-col items-start max-w-md ">
                  <div className=" lg:hidden flex flex-col  gap-3 items-start ">
                    {attributes.length > 0 &&
                      attributes?.map((attribute: any) => (
                        <Box
                          single
                          id={attribute.id}
                          key={attribute.slug}
                          filter={attribute.slug}
                          color={attribute.slug === "color"}
                          text={attribute.title}
                          options={attribute.options}
                        />
                      ))}
                  </div>
                </div>

                <div className="flex  my-5  sticky top-0 z-20 flex-nowrap lg:flex-wrap w-full lg:flex-row flex-col items-center gap-2">
                  <Calculate
                    btn={
                      <Button className=" hover:bg-white gap-2 lg:w-fit w-full hover:text-main2 border border-main2 text-xs font-medium rounded-full flex  items-center  px-6  bg-main2">
                        <CiCalculator2 className=" w-5 h-5" />
                        {t("calculateQuantity")}
                      </Button>
                    }
                  />
                  <div className="flex lg:w-auto w-full   items-center gap-2">
                    <Button
                      className="flex-1 md:flex-auto text-[10px] rounded-full gap-2 py-4 border-black"
                      variant="outline"
                    >
                      <DownloadIcon className="w-4 h-4" />
                      {t("downloadProduct")}
                    </Button>
                    <Button
                      className="flex-1 md:flex-auto text-xs rounded-full gap-2 py-4 border-black"
                      variant="outline"
                    >
                      <TbView360Arrow className="w-5 h-5" />
                      360
                    </Button>
                  </div>
                  <div className=" grid text-nowrap grid-cols-3  mt-3 items-center gap-4 lg:hidden">
                    <div className="text-xs flex flex-col text-center  items-center gap-3">
                      <BoxIcon className=" w-8 h-8" />
                      <div className=" flex flex-col ">
                        <h2 className="  text-black font-medium">{t("fastestDelivery")}</h2>
                        <p className="  text-[9px] text-muted-foreground">{t("deliveryTime")}</p>
                      </div>
                    </div>
                    <div className="  text-xs flex flex-col text-center  items-center gap-3">
                      <Headphones className=" w-8 h-8" />
                      <div className="flex flex-col ">
                        <h2 className="  text-black font-medium">{t("support")}</h2>
                        <p className="  text-[9px] text-muted-foreground">{t("supportContact")}</p>
                      </div>
                    </div>
                    <div className="  text-xs flex flex-col text-center  items-center gap-3">
                      <CreditCard className=" w-8 h-8" />
                      <div className="flex flex-col ">
                        <h2 className="  text-black font-medium">{t("securePayments")}</h2>
                        <p className=" text-[9px]  text-muted-foreground">{t("moneySafe")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Paragraph className=" my-2" description={product.description || "No Description"} />
            </Section>

            <MaxWidthWrapper className=" col-span-7 mt-4 lg:mt-8 " noPaddingX={true}>
              <Section
                CustomePadding=" px-0 py-5"
                heading={t("similarProducts")}
                link="/store"
                id="desc"
                linkText={t("browseAllProducts")}
              >
                {product.crossSells?.length > 0 && (
                  <>
                    <div className=" mt-4 flex lg:hidden">
                      {" "}
                      <SwiperCards
                        zoom={true}
                        slidesPerView={2}
                        className=" w-full h-full"
                        items={product.crossSells?.map((item: any) => ({
                          card: (
                            <Card
                              key={item.id}
                              img={item.main_cover[0].thumbnail}
                              text={item.title}
                              price={item.sell_price}
                              id={item.id}
                            />
                          ),
                        }))}
                      />
                    </div>
                    <MotionContainer className="lg:grid justify-items-center   hidden  lg:grid-cols-3 items-center gap-5 lg:gap-8 mt-5 lg:mt-10 justify-center">
                      {product.crossSells?.map((item: any) => (
                        <Card
                          key={item.id}
                          img={item.main_cover[0].thumbnail}
                          text={item.title}
                          price={item.sell_price}
                          id={item.id}
                        />
                      ))}
                    </MotionContainer>
                  </>
                )}
                <div className="flex  my-3 lg:my-10 z-[50] w-[80%] self-center lg:self-start lg:w-[40%] rounded-full justify-center items-center gap-10 bg-main2 text-gray-50 px-8 py-4 sticky top-24">
                  <a href="#desc">{t("description")}</a>
                  <a href="#review">{t("review")}</a>
                </div>
                <section className="  w-full mt-8">
                  <h1 className=" text-xl font-semibold">{t("description")}</h1>
                  <Paragraph description={product.description || "No Description"} />
                  <br />

                  <Feature />
                </section>
                <VideoZoom
                  btn={
                    <div>
                      <YoutubeThumbnail url="https://youtu.be/QczGoCmX-pI?si=T_IxM6ylmXUq5kZf" />
                    </div>
                  }
                  content={
                    <div className="relative w-full h-auto overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/QczGoCmX-pI?si=agurhHubDIgVjErj"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  }
                />
                <Reviews />
                <div>
                  {reviews.map((comment) => (
                    <Comment date={comment.created_at} id={product.id} {...comment} key={comment.date} />
                  ))}
                </div>
                <AddComment id={product.id} />
              </Section>{" "}
            </MaxWidthWrapper>
          </div>

          {/* sidebar */}
          <div className=" hidden lg:block lg:col-span-3 mt-8">
            <Container className=" py-12">
              <div className=" flex flex-col items-start gap-2 pb-4 border-b  border-input">
                <SwiperCards
                  zoom={true}
                  autoplay
                  slidesPerView={1.4}
                  className=" h-20"
                  items={[
                    {
                      card: (
                        <div className=" flex items-start gap-3">
                          <BoxIcon />
                          <div className=" flex flex-col gap-2">
                            <h2 className="  text-black font-medium">{t("fastestDelivery")}</h2>
                            <p className="  text-[9px] text-muted-foreground">{t("deliveryTime")}</p>
                          </div>
                        </div>
                      ),
                    },
                    {
                      card: (
                        <div className=" flex items-start gap-3">
                          <Headphones />
                          <div className="flex flex-col gap-2">
                            <h2 className="  text-black font-medium">{t("support")}</h2>
                            <p className="  text-[9px] text-muted-foreground">{t("supportContact")}</p>
                          </div>
                        </div>
                      ),
                    },
                    {
                      card: (
                        <div className=" flex items-start gap-3">
                          <CreditCardIcon />
                          <div className="flex flex-col gap-2">
                            <h2 className="  text-black font-medium">{t("securePayments")}</h2>
                            <p className=" text-[9px]  text-muted-foreground">{t("moneySafe")}</p>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
              <div className=" pb-5">
                {attributes.length > 0 &&
                  attributes?.map((attribute: any) => (
                    <Box
                      single
                      id={attribute.id}
                      key={attribute.slug}
                      filter={attribute.slug}
                      color={attribute.slug === "color"}
                      text={attribute.title}
                      options={attribute.options}
                    />
                  ))}
                <div className=" pb-5 border-b border-input">
                  <p className=" text-center text-muted-foreground">
                    {product.quantity} {t("left")}
                  </p>
                  <div className=" flex items-start justify-center mt-5 self-center mx-auto gap-2">
                    <h2>PRICES :</h2>
                    <div className=" flex flex-col">
                      <p className=" text-xl text-main2 font-[700]">{formatPrice(442.12)}</p>
                      <p className=" text-sm text-muted-foreground line-through mt-2">{`( ${formatPrice(500)})`}</p>
                    </div>
                  </div>
                </div>
                <div className=" flex  flex-col gap-3 mt-3">
                  <AddToCart max={product.quantity} id={product.id} />
                  <CustomButton className=" px-8 py-4" reverse icon={<TbShoppingCartPlus />} text={t("buyNow")} />
                </div>
                <AddToWishlist className=" my-3" />
              </div>
            </Container>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <Section link="#" heading="BEST SELLERS" linkText="BROWSE ALL PRODUCTS">
            <MotionContainer className=" hidden lg:grid  lg:grid-cols-4 items-center gap-5 mt-10 justify-center">
              <Card price="putty (acrylic 1000) 233" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
            </MotionContainer>
            <div className=" mt-4 flex lg:hidden">
              <SwiperCards
                slidesPerView={2}
                className=" w-full h-full"
                items={[
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                ]}
              />
            </div>
          </Section>
        </MaxWidthWrapper>
      </section>
    </RightClickProvider>
  );
};

export default page;
