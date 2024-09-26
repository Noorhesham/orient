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
import { Button } from "@/components/ui/button";
import { BoxIcon, CreditCard, CreditCardIcon, DownloadIcon, Headphones } from "lucide-react";
import React, { Suspense } from "react";
import { CiCalculator2 } from "react-icons/ci";
import { TbShoppingCartPlus, TbView360Arrow } from "react-icons/tb";
import YoutubeThumbnail from "@/app/components/YoutubeThumbnail";
import Reviews from "@/app/components/Reviews";
import Feature from "@/app/components/Feature";
import MotionContainer from "@/app/components/MotionContainer";
import AddComment from "@/app/components/AddComment";
import Paragraph from "@/app/components/Paragraph";
import VideoZoom from "@/app/components/VideoZoom";
import { Server } from "@/app/main/Server";
import AddToCart from "@/app/components/AddToCart";
import { getTranslations } from "next-intl/server";
import RightClickProvider from "@/app/context/RightClickDisable";
import NotFound from "@/app/components/NotFound";
import SingleVariant from "@/app/components/SingleVariant";
import ReviewsSection from "@/app/components/ReviewsSection";
import { processYoutubeUrl } from "@/lib/utils";
import BreadCrumb from "@/app/components/BreadCrumb";
import Link from "next/link";

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
  const { product } = await Server({
    resourceName: "getProduct",
    id,
    body: { with: "tags,upSells,crossSells,category_id" },
  });
  return {
    title: `${product.title} | PUTTY (ACRYLIC 1000) 233 WALL PAINTS | Your Store Name`,
    description: product.description,
    canonical: `https://yourdomain.com/products/${product.id}`,
    keywords: `${product.title} ${product.description} ${product.search_queries} ${product.short_description}`,
    openGraph: {
      title: product.title,
      description: product.description,
      url: product.main_cover[0]?.thumbnail,
      images: [
        {
          url: product.main_cover[0]?.thumbnail,
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
          url: product.main_cover?.[0]?.thumbnail,
          alt: product.title,
        },
      ],
    },
  };
};

const page = async ({ params: { id }, searchParams }: { params: { id: string }; searchParams: any }) => {
  const { color, volume, child } = searchParams;

  const queryParams = new URLSearchParams();
  const array = color
    ?.split(",")
    .concat(volume?.split(","))
    .filter((f: any) => f !== undefined);
  if (array) {
    array.forEach((element: any) => {
      const [key, value] = element?.split(":");
      queryParams.append(`options[${key}]`, value);
    });
  }
  const { product, attributes, reviews_counts, variations } = await Server({
    resourceName: "getProduct",
    id,
    queryParams,
    body: { with: "tags,upSells,crossSells,category_id" },
  });
  if (!product) return <NotFound />;
  const ischild = child === "true" || product.type === "variation";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.main_cover?.[0]?.thumbnail,
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
    .map((img: any) => ({ src: img.file }))
    .concat(product.images.map((img: any) => ({ src: img.file })));
  const paginationImgs = product.main_cover
    .map((img: any) => ({ src: img.thumbnail }))
    .concat(product.images.map((img: any) => ({ src: img.thumbnail })));
  const t = await getTranslations();
  queryParams.append("ids[]", product.id);
  const { products: cartStatus } = await Server({ resourceName: "check", queryParams });
  const upSells = product.upSells.length <= 0 ? product.crossSells : product.upSells;
  console.log(cartStatus);
  return (
    <RightClickProvider>
      <BreadCrumb
        linksCustom={[
          {
            href: "/",
            text: "HOME",
          },
          {
            href: "shop",
            text: "SHOP",
          },
          {
            href: `product/${product.id}`,
            text: product.title,
          },
        ]}
      />
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
                  paginationImgs={paginationImgs}
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
              <AddToCart cartStatus={cartStatus[`${product.id}`]} max={product.quantity} id={product.id} />
              <CustomButton
                link="/checkout"
                className=" w-full px-8 py-5"
                reverse
                icon={<TbShoppingCartPlus />}
                text={t("buyNow")}
              />
            </div>

            <Section
              CustomePadding="px-0 pb-5  py-0"
              headingColor="#E6007E"
              heading={product.title}
              className=" col-span-3 flex-grow text-wrap  mt-12"
            >
              <div className="flex flex-col gap-3 pb-5">
                <Stars count={product.review_count} rating={product?.review_rate || 5} />
                <PriceWithSale
                  price={product.sell_price || product.regular_price}
                  discount={product.sell_price ? product.regular_price : null}
                />
                {product.stock_status === "out" && (
                  <p className="text-red-500 mt-2 font-semibold text-sm">{t("outOfStock")}</p>
                )}
              </div>
              <div className="border-input  flex flex-wrap  border-b border-t    gap-3 py-3 px-5">
                <div className="lg:hidden border-b border-input gap-3 flex flex-col items-start  w-full ">
                  <div className=" lg:hidden flex w-full flex-col  gap-3 items-start ">
                    <Suspense>
                      {" "}
                      {variations && attributes.length > 0 && variations.length > 0 && (
                        <SingleVariant
                          parentId={product.parent_id}
                          childId={ischild ? product.id : ""}
                          ischild={ischild}
                          variations={variations}
                          options={attributes.filter((item: any) => item.slug === "volume")}
                          colorOptions={attributes.filter((item: any) => item.slug === "color")}
                        />
                      )}
                    </Suspense>
                  </div>
                </div>

                <div
                  className="flex  text-sm  my-5  sticky top-0 z-20 xl:flex-nowrap 
                flex-wrap  w-full lg:flex-row flex-col items-center gap-2"
                >
                  <Calculate
                    id={product.category_id}
                    btn={
                      <Button className=" capitalize  hover:bg-white gap-2 lg:w-fit w-full hover:text-main2 border border-main2  font-medium rounded-full flex  items-center  px-6  bg-main2">
                        <CiCalculator2 className=" w-5 h-5" />
                        {t("calculateQuantity")}
                      </Button>
                    }
                  />
                  <div className="flex lg:w-auto w-full   items-center gap-2">
                    {product.pdf && product.pdf.length > 0 && (
                      <Button className="flex-1 md:flex-auto   rounded-full gap-2 py-4 border-black" variant="outline">
                        <DownloadIcon className="w-4 h-4" />
                        {t("downloadProduct")}
                      </Button>
                    )}
                    {product.image_360_panorama.length > 0 && (
                      <Button
                        className="flex-1 md:flex-auto text-xs rounded-full gap-2 py-4 border-black"
                        variant="outline"
                      >
                        <TbView360Arrow className="w-5 h-5" />
                        360
                      </Button>
                    )}
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
              <Paragraph className=" my-2" description={product.description || ""} />
              <div className=" flex uppercase  text-sm  items-center gap-2">
                <h3 className="text-main2 font-semibold">{t("category")} :</h3>
                <Link
                  href={`/shop?category_id=${product.category_id}`}
                  className=" py-2 px-4 rounded-full bg-white border border-input  font-semibold"
                >
                  {product.category.title}
                </Link>
              </div>
            </Section>

            <MaxWidthWrapper className=" col-span-7  " noPadding noPaddingX={true}>
              <Section
                CustomePadding=" px-0 py-5"
                heading={t("similarProducts")}
                link="/store"
                id="desc"
                linkText={t("browseAllProducts")}
              >
                {product.crossSells?.length > 0 && (
                  <>
                    <div className=" mt-4 flex ">
                      {" "}
                      <SwiperCards
                        autoplay
                        zoom={true}
                        slidesPerView={3}
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
                  </>
                )}
                <div className="flex  my-3 lg:my-10 z-[50] w-[80%] self-center lg:self-start lg:w-[40%] rounded-full justify-center items-center gap-10 bg-main2 text-gray-50 px-8 py-4 sticky top-24">
                  <a href="#desc">{t("description")}</a>
                  <a href="#review">{t("review")}</a>
                </div>
                <section className="  w-full mt-8">
                  <h1 className=" text-xl font-semibold">{t("description")}</h1>
                  <Paragraph description={product.description || ""} />
                  <br />

                  <Feature />
                </section>
                {product.videos.includes("youtube") && (
                  <VideoZoom
                    btn={
                      <div>
                        <YoutubeThumbnail url={product.videos} />
                      </div>
                    }
                    content={
                      <div className="relative w-full h-auto overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={processYoutubeUrl(product.videos).embedUrl}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          frameBorder="0"
                        ></iframe>
                      </div>
                    }
                  />
                )}
                <Reviews
                  reviews_counts={reviews_counts}
                  review_count={product.review_count}
                  review_rate={product.review_rate}
                />
                <ReviewsSection id={product.parent_id} />
                <AddComment id={product.parent_id} />
              </Section>
            </MaxWidthWrapper>
          </div>

          {/* sidebar */}
          <div className=" hidden lg:block lg:col-span-3 mt-8">
            <Container className=" py-12">
              <div className=" flex flex-col items-start gap-2  pb-4 border-b  border-input">
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
              <div className=" w-full pb-5">
                <Suspense>
                  {" "}
                  {variations && attributes.length > 0 && variations.length > 0 && (
                    <SingleVariant
                      parentId={product.parent_id}
                      childId={ischild ? product.id : ""}
                      ischild={ischild}
                      variations={variations}
                      options={attributes.filter((item: any) => item.slug === "volume")}
                      colorOptions={attributes.filter((item: any) => item.slug === "color")}
                    />
                  )}
                </Suspense>
                <div className=" pb-5 border-b border-input">
                  <div className=" flex flex-col items-center justify-center  gap-2">
                    <div className=" flex items-center gap-2">
                      <h2>PRICE :</h2>
                      <PriceWithSale
                        size="sm"
                        price={product.sell_price || product.regular_price}
                        discount={product.sell_price ? product.regular_price : null}
                      />
                    </div>
                    {product.stock_status === "out" && (
                      <p className="text-red-500 mt-2 font-semibold text-sm">{t("outOfStock")}</p>
                    )}
                  </div>
                </div>
                <div className=" flex  flex-col gap-3 mt-3">
                  <AddToCart cartStatus={cartStatus[`${product.id}`]} max={product.quantity} id={product.id} />

                  <CustomButton
                    link="/checkout"
                    className=" px-8 py-4"
                    reverse
                    icon={<TbShoppingCartPlus />}
                    text={t("buyNow")}
                  />
                </div>
                <AddToWishlist
                  wishlistStatus={cartStatus[`${product.id}`].favorite}
                  id={product.id}
                  className=" my-3"
                />
              </div>
            </Container>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <Section link="/shop" heading="BEST SELLERS" linkText="BROWSE ALL PRODUCTS">
            <MotionContainer className=" hidden lg:grid  lg:grid-cols-4 items-center gap-5 mt-10 justify-center">
              {upSells?.map((item: any, i: number) => (
                <Card
                  key={item.id}
                  img={item.main_cover[0].thumbnail}
                  text={item.title}
                  price={item.sell_price}
                  id={item.id}
                />
              ))}
            </MotionContainer>
            {
              <div className=" mt-4 flex lg:hidden">
                <SwiperCards
                  autoplay
                  slidesPerView={2}
                  className=" w-full h-full"
                  items={upSells?.map((item: any, i: number) => {
                    return {
                      card: (
                        <Card
                          key={item.id}
                          img={item.main_cover[0].thumbnail}
                          text={item.title}
                          price={item.sell_price}
                          id={item.id}
                        />
                      ),
                    };
                  })}
                />
              </div>
            }
          </Section>
        </MaxWidthWrapper>
      </section>
    </RightClickProvider>
  );
};

export default page;
