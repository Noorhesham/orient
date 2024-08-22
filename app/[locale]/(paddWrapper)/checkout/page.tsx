import AddressForm from "@/app/components/AddressForm";
import Card from "@/app/components/Card";
import CartItem from "@/app/components/CartItem";
import Container from "@/app/components/Container";
import CustomButton from "@/app/components/CustomButton";
import Head1 from "@/app/components/Head1";
import { Location } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
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
            <div>
              <Container CustomePadding=" py-8 px-8" className=" w-full flex flex-col gap-3 px-4">
                <Head1 className=" text-xl font-bold" text={"SHIPPING ADDRESS  "} />
                <AddressForm />
                <div className=" flex flex-col lg:flex-row gap-2 lg:gap-5  items-start lg:items-center">
                  <IconWidget
                    paragraph={"147 Vacation Road, Holiday Town, Rome, Italy"}
                    header="HOME"
                    icon={<Location />}
                  />
                </div>
                <div className=" flex  flex-col lg:flex-row  gap-2 lg:gap-5 items-start lg:items-center">
                  <IconWidget
                    paragraph={"147 Vacation Road, Holiday Town, Rome, Italy"}
                    header="HOME"
                    icon={<Location />}
                  />
                </div>
              </Container>
            </div>
            <Container>
              <Head1 className=" text-xl font-bold" text={"PAYMENT METHODS  "} />
            </Container>
            <Container className=" py-8 flex flex-col gap-5">
              <CartItem nocheck img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem nocheck img="/Product (2).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem nocheck img="/Product (3).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem nocheck img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
              <CartItem nocheck img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
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
                    <Link href="/checkout" className="flex gap-2 items-center">
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
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
};

export default page;
