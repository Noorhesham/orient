import AddressForm from "@/app/components/AddressForm";
import CartItem from "@/app/components/CartItem";
import CompeleteOrder from "@/app/components/CompeleteOrder";
import Container from "@/app/components/Container";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Paragraph from "@/app/components/Paragraph";
import PaymentMethods from "@/app/components/PaymentMethods";
import PriceWithSale from "@/app/components/PriceWithSale";
import ShippingList from "@/app/components/ShippingList";
import { Server } from "@/app/main/Server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const data = await Server({ resourceName: "checkout" });
  console.log(data);
  const { payment_methods, cart, user_addresses } = data;
  console.log(cart);
  return (
    <main className=" bg-gray-50">
      <div className=" pt-5  min-h-screen  ">
        <MaxWidthWrapper className=" flex flex-col   lg:grid  gap-4 lg:grid-cols-11">
          <div className="col-span-7  gap-7 flex flex-col">
            <div>
              <Container CustomePadding=" py-8 px-8" className=" w-full flex flex-col gap-3 px-4">
                <Head1 className=" text-xl font-bold" text={"SHIPPING ADDRESS  "} />
                <AddressForm />
                {<ShippingList user_addresses={user_addresses} user_address={data.user_address.id} />}
              </Container>
            </div>

            <Container>
              <Head1 className=" text-xl font-bold" text={"PAYMENT METHODS  "} />

              <PaymentMethods methods={payment_methods} />
            </Container>
            <Container className=" py-8 flex flex-col gap-5">
              {cart.items.length === 0 && (
                <div className="flex flex-col items-center">
                  <div className=" w-32 h-32 relative">
                    <Image src="/complete.svg" alt="success" fill />
                  </div>{" "}
                  <h2 className=" text-main uppercase my-2 text-xl lg:text-2xl font-semibold">Your cart is empty</h2>
                  <Paragraph
                    className=" text-center"
                    description="Browse our wide variety of products and add them to your cart. 
                    You can also check out with a coupon code."
                  />
                  <div className=" flex items-center gap-2">
                    <Link href={"/orders"}>
                      <Button className=" rounded-full">GO TO SHOP</Button>
                    </Link>
                  </div>
                </div>
              )}
              {cart.items.map((item: any) => (
                <CartItem
                  productId={item.id}
                  nocheck
                  key={item.id}
                  img={item.image[0].sizes.large}
                  price={item.price_after_discount}
                  discount={item.price}
                  text={item.title}
                  quantity={item.quantity}
                />
              ))}
            </Container>
          </div>
          <div className="col-span-4 flex flex-col gap-5 ">
            <Container className="  pt-10 pb-10 flex flex-col">
              <h1 className=" text-main2 text-xl font-semibold text-center">CART TOTAL</h1>
              <div className="  px-14 mt-5">
                <div className=" flex pb-1 border-b border-input flex-col  gap-2">
                  <div className="flex  items-center justify-between">
                    <h2 className="text-main2 font-medium ">SUB TOTAL</h2>
                    <PriceWithSale size="sm" price={cart.sub_total} />
                  </div>
                  <div className="flex  items-center justify-between">
                    <h2 className="text-main2 font-medium ">DISCOUNT</h2>
                    <PriceWithSale size="sm" price={cart.discount_total} />
                  </div>
                </div>
                <div className="flex  items-center pt-1  justify-between">
                  <h2 className="text-main2 font-medium ">TOTAL PRICE</h2>
                  <PriceWithSale size="sm" price={cart.total} />
                </div>
                <CompeleteOrder />
              </div>
            </Container>
          </div>
        </MaxWidthWrapper>
      </div>
    </main>
  );
};

export default page;
