import AddToWishlist from "@/app/components/AddToWishlist";
import Calculate from "@/app/components/Calculate";
import Card from "@/app/components/Card";
import Container from "@/app/components/Container";
import Counter from "@/app/components/Counter";
import CustomButton from "@/app/components/CustomButton";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import PriceWithSale from "@/app/components/PriceWithSale";
import Section from "@/app/components/Section";
import Stars from "@/app/components/Stars";
import { BsHandbag } from "react-icons/bs";
import SwiperCards from "@/app/components/SwiperCards";
import Variants from "@/app/components/Variants";
import { formatPrice } from "@/app/helpers/utils";
import { Button } from "@/components/ui/button";
import { BoxIcon, DownloadIcon, Headphones, StarIcon } from "lucide-react";
import React from "react";
import { CiCalculator2 } from "react-icons/ci";

import { TbShoppingCartPlus, TbView360Arrow } from "react-icons/tb";
import YoutubeThumbnail from "@/app/components/YoutubeThumbnail";
import ZoomImage from "@/app/components/ZoomImage";
import Reviews from "@/app/components/Reviews";
import Comment from "@/app/components/Comment";
import Feature from "@/app/components/Feature";
import MotionContainer from "@/app/components/MotionContainer";
import AddComment from "@/app/components/AddComment";

const options = ["#3F3F46", "#F43F5E", "#FECDD3", "#DB2777", "#A21CAF", "#FECDD3", "#A21CAF", "#DB2777"];
const optionsSize = ["0.5k", "1k", "5k", "10k", "20k"];
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
const page = () => {
  return (
    <section className=" h-full relative">
      <MaxWidthWrapper className="  flex flex-col lg:grid  lg:grid-cols-11 lg:gap-3 items-start">
        <div className="lg:col-span-8 items-center max-w-full flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-5 lg:items-start">
          <div className="max-w-full flex col-span-full lg:col-span-2 flex-col mt-12 w-full">
            <div className="  w-full h-96 ">
              <SwiperCards
                rounded
                spaceBetween={50}
                className="w-full h-full"
                slidesPerView={1}
                items={[
                  { src: "/Product (1).jpg" },
                  { src: "/Product (2).jpg" },
                  { src: "/Product (3).jpg" },
                  { src: "/Product (1).jpg" },
                ]}
                paginationImage={true}
              />
            </div>
          </div>

          <Section
            CustomePadding="px-0 pb-5  py-0"
            headingColor="#E6007E"
            heading="PUTTY (ACRYLIC 1000) 233 WALL PAINTS"
            className="relative col-span-3 flex-grow text-wrap  mt-10"
          >
            <Stars />
            <PriceWithSale price={443} discount={324} />
            <div className="border-input  flex flex-wrap  border-b border-t    gap-3 py-3 px-5">
              <div className="lg:hidden flex items-center gap-2">
                <div className=" flex self-center mx-auto  items-center gap-2">
                  <h2 className=" text-sm text-black font-medium">AMOUNT :</h2>
                  <Counter />
                </div>
              </div>
              <div className=" lg:hidden flex flex-col  items-start ">
                <Variants options={options} optionsSize={optionsSize} />
              </div>

              <div className="flex   sticky top-0 z-20 flex-nowrap lg:flex-wrap w-full lg:flex-row flex-col items-center gap-2">
                <Calculate
                  btn={
                    <Button className=" hover:bg-white gap-2 md:w-fit w-full hover:text-main2 border border-main2 text-xs font-medium rounded-full flex  items-center  px-6  bg-main2">
                      <CiCalculator2 className=" w-5 h-5" />
                      CALCULATE THE QUANTITY
                    </Button>
                  }
                />
                <div className="flex lg:w-auto w-full lg:mt-2 mt-0 items-center gap-2">
                  <Button
                    className="lg:flex-1  flex-grow-0 text-[10px] rounded-full gap-2 py-4 border-black"
                    variant="outline"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    DOWNLOAD PRODUCT
                  </Button>
                  <Button
                    className="lg:flex-1  flex-grow-0 text-xs rounded-full gap-2 py-4 border-black"
                    variant="outline"
                  >
                    <TbView360Arrow className="w-5 h-5" />
                    360
                  </Button>
                </div>
              </div>
            </div>
            <p className=" mt-4">
              A highly-developed product that is absorbed deeply into the substrate of cementitious materials, plasters
              and limes Made using aqueous acrylic copolymer SUPER SEAL 123 binds the substrate and the surface, to give
              a solid base for painting .
            </p>
          </Section>

          <Section
            CustomePadding=" px-0 py-5"
            className=" col-span-7"
            heading="SIMILAT PRODUCTS"
            link="/store"
            linkText="BROWSE ALL PRODUCTS"
          >
            <div className=" gap-3 lg:items-stretch mt-5 lg:mt-3 flex flex-col items-center  lg:grid  lg:grid-cols-3">
              <Card price="putty (acrylic 1000) 233" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
            </div>
            <section className="  w-full mt-8">
              <div className="flex  my-10 z-10 w-[80%] self-center lg:self-start lg:w-[40%] rounded-full justify-center items-center gap-10 bg-main2 text-gray-50 px-8 py-4 sticky top-0">
                <p>DESCRIPTION</p>
                <p>REVIEW</p>
              </div>
              <h1 className=" text-xl font-semibold">DESCRIPTION</h1>
              <p className=" mt-3">
                SUPER SEAL123isahighlydevelopedproductthatis absorbed deeply into the substrate of cementitious
                materials, plasters and limes. SUPER SEAL 123 binds the substrate and the surface to give a solid base
                for painting
              </p>
              <br />
              <p>
                SUPER SEAL123isahighlydevelopedproductthatis absorbed deeply into the substrate of cementitious
                materials, plasters and limes. SUPER SEAL 123 binds the substrate and the surface to give a solid base
                for painting SUPER SEAL123isahighlydevelopedproductthatis absorbed deeply into the substrate of
                cementitious materials, plasters and limes. SUPER SEAL 123 binds the substrate and the surface to give a
                solid base for paintingSUPER SEAL123isahighlydevelopedproductthatis absorbed deeply into the substrate
                of cementitious materials, plasters and limes. SUPER SEAL 123 binds the substrate and the surface to
                give a solid base for painting
              </p>
              <Feature />
            </section>
            <ZoomImage
              btn={
                <div>
                  <YoutubeThumbnail url="https://youtu.be/QczGoCmX-pI?si=T_IxM6ylmXUq5kZf" />
                </div>
              }
              content={
                <div className=" w-full h-full flex items-center justify-center">
                  <iframe
                    width="80%"
                    height="100%"
                    src="https://www.youtube.com/embed/QczGoCmX-pI?si=agurhHubDIgVjErj"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>
              }
            />
            <Reviews />
            <div>
              {comments.map((comment) => (
                <Comment {...comment} key={comment.date} />
              ))}
            </div>
            <AddComment />
          </Section>
        </div>

        {/* sidebar */}
        <div className=" hidden lg:block lg:col-span-3 mt-8">
          <Container className=" py-12">
            <div className=" flex flex-col items-start gap-2 pb-4 border-b  border-input">
              <SwiperCards
                slidesPerView={1.4}
                className=" h-20"
                items={[
                  {
                    card: (
                      <div className=" flex items-start gap-3">
                        <BoxIcon />
                        <div className=" flex flex-col gap-2">
                          <h2 className=" text-black font-medium">FASTEST DELIVERY</h2>
                          <p className=" text-sm text-muted-foreground">DELIVERY IN 24/H</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    card: (
                      <div className=" flex items-start gap-3">
                        <Headphones />
                        <div className="flex flex-col gap-2">
                          <h2 className=" text-black font-medium">Support 24/7</h2>
                          <p className=" text-sm text-muted-foreground">Live contact/message</p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
            <div className=" pb-5">
              <Variants options={options} optionsSize={optionsSize} />
              <div className=" pb-5 border-b border-input">
                <div className=" flex items-center gap-2">
                  <div className=" flex self-center mx-auto py-4   items-center gap-2">
                    <h2 className=" text-sm text-black font-medium">AMOUNT :</h2>
                    <Counter />
                  </div>
                </div>
                <p className=" text-center text-muted-foreground">1968 PIECEES AVIALABLE</p>
                <div className=" flex items-start justify-center mt-5 self-center mx-auto gap-2">
                  <h2>PRICES :</h2>
                  <div className=" flex flex-col">
                    <p className=" text-xl text-main2 font-[700]">{formatPrice(442.12)}</p>
                    <p className=" text-sm text-muted-foreground line-through mt-2">{`( ${formatPrice(500)})`}</p>
                  </div>
                </div>
              </div>
              <div className=" flex  flex-col gap-3 mt-3">
                <CustomButton className=" px-8 py-4" icon={<BsHandbag />} text="ADD TO CART" />
                <CustomButton className=" px-8 py-4" reverse icon={<TbShoppingCartPlus />} text="BUY NOW" />
              </div>
              <AddToWishlist className=" my-3" />
            </div>
          </Container>
        </div>
      </MaxWidthWrapper>
      <Section link="#" heading="BEST SELLERS" linkText="BROWSE ALL PRODUCTS">
        <MotionContainer className="grid  flex-col  grid-cols-2 lg:grid-cols-4 items-center gap-5 mt-10 justify-center">
          <Card price="putty (acrylic 1000) 233" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
          <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
          <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
          <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
        </MotionContainer>
      </Section>
    </section>
  );
};

export default page;
