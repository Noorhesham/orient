import Card from "@/app/components/Card";
import CartItem from "@/app/components/CartItem";
import Container from "@/app/components/Container";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import Section from "@/app/components/Section";
import { formatPrice } from "@/app/helpers/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className=" bg-gray-50">
      <div className=" pt-5  min-h-screen  ">
        <MaxWidthWrapper className=" flex flex-col   lg:grid  gap-4 lg:grid-cols-11">
          <div className="col-span-7  gap-7 flex flex-col">
            <Container>
              <h1 className=" font-[600] mt-4 ml-2  uppercase text-2xl  text-main2 mb-3">The Cart {`(3)`}</h1>
              <div className=" font-semibold capitalize mt-3 flex items-center ">
                <span className=" mr-4 flex items-center gap-2">
                  <CheckIcon /> Select all products
                </span>{" "}
                <span className=" text-main font-medium relative">
                  {" "}
                  <span className=" -left-1 top-[2px] h-5 mr-2 w-[2px] bg-gray-800 absolute"></span>delete selected
                  products
                </span>
              </div>
            </Container>
            <Container className=" py-8 flex flex-col gap-5">
              <CartItem img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem img="/Product (2).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem img="/Product (3).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
            </Container>
          </div>
          <div className="col-span-4 flex flex-col gap-5 ">
            <Container className="  pt-10 pb-10 flex flex-col">
              <h1 className=" text-main2 text-xl font-semibold text-center">CART TOTAL</h1>
              <div className="  px-14 mt-5">
                <div className=" flex pb-1 border-b border-input flex-col  gap-2">
                  <div className="flex  justify-between">
                    <h2 className="text-main2 font-medium ">SUB TOTAL</h2>
                    <p>{formatPrice(4000)}</p>
                  </div>
                  <div className="flex  justify-between">
                    <h2 className="text-main2 font-medium ">DISCOUNT</h2>
                    <p>{formatPrice(4000)}</p>
                  </div>
                  <div className="flex  justify-between">
                    <h2 className="text-main2 font-medium ">TAX</h2>
                    <p>{formatPrice(4000)}</p>
                  </div>
                </div>
                <div className="flex  pt-1  justify-between">
                  <h2 className="text-main2 font-medium ">TOTAL PRICE</h2>
                  <p>{formatPrice(4000)}</p>
                </div>
                <div className="flex w-fit pt-5  mx-auto mt-3 flex-col">
                  <Button className="flex rounded-full py-6 px-2 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2">
                    <Link href="/checkout" className="flex items-center">
                      <CreditCard />
                      PROCEED TO CHECKOUT
                    </Link>
                  </Button>
                  <p className=" mt-4 text-center text-xs text-black font-medium ">
                    SPECAIL DISCOUNTS ON LARGE QUANTITIES
                  </p>
                </div>
              </div>
            </Container>
            <Container className="  pt-10 pb-10 flex flex-col">
              <h1 className=" text-main2 text-xl font-semibold text-center">COUPON CODE</h1>
              <div className=" flex flex-col px-4 items-center gap-2">
                <Input className=" mt-5" placeholder="Enter coupon code" />
                <Button className="flex  w-[70%] rounded-full py-6 px-2 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2">
                  <Link className=" flex items-center gap-1" href={"/check-out"}>
                    <CheckIcon />
                    APPLY COUPON
                  </Link>
                </Button>
              </div>
            </Container>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <Section
            link="/shop"
            CustomePadding=" px-0"
            className="mt-10 md:px-0 min-h-[30vh]"
            heading="PUR PAINTS"
            linkText="BROWSE ALL PRODUCTS"
          >
            <MotionContainer className="sm:grid flex flex-col  sm:grid-cols-2 lg:grid-cols-4 items-center gap-5 mt-[62px] justify-center">
              <Card price="putty (acrylic 1000) 233" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
              <Card price="putty (acrylic 1000) 233" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
            </MotionContainer>
          </Section>
        </MaxWidthWrapper>
      </div>
    </main>
  );
};

export default page;
