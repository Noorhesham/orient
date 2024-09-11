import Card from "@/app/components/Card";
import CartItem from "@/app/components/CartItem";
import Container from "@/app/components/Container";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import Section from "@/app/components/Section";
import SwiperCards from "@/app/components/SwiperCards";
import { formatPrice } from "@/app/helpers/utils";
import { Server } from "@/app/main/Server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";
import NotFound from "../../not-found";

const page = async () => {
  const queryParams = new URLSearchParams();
  queryParams.append("type", "default");
  const { cart } = await Server({ resourceName: "getActiveCart", queryParams });
  if (!cart) return <NotFound />;
  const cartCount = cart.items.reduce((acc: number, item: Product) => item.quantity + acc, 0);

  const subTotal = formatPrice(cart.sub_total);
  const discountTotal = formatPrice(cart.discount_total);
  const taxTotal = formatPrice(cart.taxes_total);
  const totalPrice = formatPrice(cart.total);

  console.log(cart.items[0], cartCount);
  return (
    <main className=" bg-gray-50">
      <div className=" py-5  min-h-screen  ">
        <Button className="flex z-50  md:hidden mx-auto sticky top-[90%]  rounded-full py-6 px-2 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2">
          <Link href="/checkout" className="flex  gap-2 items-center">
            <CreditCard />
            PROCEED TO CHECKOUT
          </Link>
        </Button>
        <MaxWidthWrapper className=" flex flex-col   lg:grid  gap-4 lg:grid-cols-11">
          <div className="col-span-7  gap-7 flex flex-col">
            <Container>
              <h1 className=" font-[600] mt-4 ml-2  uppercase text-2xl  text-main2 mb-3">The Cart {cartCount} Items</h1>
              {/* <div className="sm:flex-row text-xs md:text-base  font-semibold capitalize mt-3 flex items-center ">
                <span className=" mr-4 flex  items-center gap-2">
                  <CheckIcon className=" h-4 w-4 md:h-8 md:w-8" /> Select all products
                </span>{" "}
                <span className=" text-main font-medium relative">
                  {" "}
                  <span className=" -left-1 top-[2px] h-3 md:h-5 mr-2 w-[2px] bg-gray-800 absolute"></span>delete
                  selected products
                </span>
              </div> */}
            </Container>
            <Container className=" py-8 flex flex-col gap-5">
              {cart.items.map((item: any) => (
                <CartItem
                  key={item.id}
                  img={item.image[0].sizes.large}
                  price={item.price_after_discount}
                  discount={item.price}
                  text={item.title}
                  quantity={item.quantity}
                  id={item.id}
                />
              ))}
            </Container>
          </div>
          <div className="col-span-4 flex flex-col gap-5 ">
            <Container className="pt-10 pb-10 flex flex-col">
              <h1 className="text-main2 text-xl font-semibold text-center">CART TOTAL</h1>
              <div className="px-4 mt-5">
                <div className="flex pb-1 border-b border-input flex-col gap-2">
                  <div className="flex justify-between">
                    <h2 className="text-main2 font-medium">SUB TOTAL</h2>
                    <p>{subTotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-main2 font-medium">DISCOUNT</h2>
                    <p>{discountTotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-main2 font-medium">TAX</h2>
                    <p>{taxTotal}</p>
                  </div>
                </div>
                <div className="flex pt-1 justify-between">
                  <h2 className="text-main2 font-medium">TOTAL PRICE</h2>
                  <p>{totalPrice}</p>
                </div>
                <div className="flex w-fit pt-5 mx-auto mt-3 flex-col">
                  <Button className="lg:flex hidden rounded-full py-6 px-2 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2">
                    <Link href="/checkout" className="flex gap-2 items-center">
                      <CreditCard />
                      PROCEED TO CHECKOUT
                    </Link>
                  </Button>
                  <p className="mt-4 text-center text-xs text-black font-medium">
                    SPECIAL DISCOUNTS ON LARGE QUANTITIES
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
            className=" md:px-0 min-h-[30vh]"
            heading="PUR PAINTS"
            linkText="BROWSE ALL PRODUCTS"
          >
            <MotionContainer className="lg:grid hidden  lg:grid-cols-4 items-center gap-5 mt-[62px] justify-center">
              <Card price="putty (acrylic 1000) 233" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
              <Card price="putty (acrylic 1000) 233" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
              <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
            </MotionContainer>{" "}
            <div className=" mt-4 flex lg:hidden">
              <SwiperCards
                slidesPerView={2}
                samePhone
                className=" w-full h-full"
                items={[
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                  { card: <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" /> },
                ]}
              />
            </div>
          </Section>
        </MaxWidthWrapper>
      </div>
    </main>
  );
};

export default page;
