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
import { CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";
import NotFound from "../../../not-found";
import CoponApply from "@/app/components/CoponApply";
import CartItems from "@/app/components/CartItems";
import Proceed from "@/app/components/Proceed";

import { getTranslations } from "next-intl/server";
import EmptyCart from "@/app/components/EmptyCart";
import Head1 from "@/app/components/Head1";

const page = async () => {
  const queryParams = new URLSearchParams();
  queryParams.append("type", "default");
  const { cart } = await Server({ resourceName: "getActiveCart", queryParams });
  if (!cart) return <NotFound message="Cart not found" />;
  const cartCount = cart.items.reduce((acc: number, item: Product) => item.quantity + acc, 0);
  const t = await getTranslations();
  const subTotal = formatPrice(cart.sub_total);
  const discountTotal = formatPrice(cart.discount_total);
  const totalPrice = formatPrice(cart.total);
  queryParams.delete("type");
  queryParams.append("id", JSON.stringify(cart.items.map((item: any) => item.product_id)));
  queryParams.append("with", "crossSells");
  queryParams.append("type", "variations");
  const { products: similarProducts } = await Server({
    resourceName: "getProducts",
    queryParams,
  });
  console.log(cart);
  return (
    <main className="bg-gray-50">
      <div className="py-5 min-h-screen">
        <Button className="flex z-30 md:hidden mx-auto sticky top-[90%] rounded-full py-6 px-10 text-xs items-center bg-main2 text-gray-50 hover:bg-main2/60 duration-150 gap-2">
          <Link href="/checkout" className="flex gap-2 items-center">
            <CreditCard />
            {t("proceed_to_checkout")}
          </Link>
        </Button>

        <MaxWidthWrapper className="flex flex-col lg:grid gap-4 lg:grid-cols-11">
          <div className="col-span-7 gap-4 flex flex-col">
            <Head1
              text={t("cart_title", { cartCount })}
              className=" ml-2 uppercase font-semibold text-2xl text-main2 mb-1"
            />
            {cart.items.length === 0 && <EmptyCart />}
            <CartItems cart={cart.items} />
          </div>

          <div className="col-span-4 flex  items-center flex-col gap-5">
            {cart.items.length > 0 && (
              <Container className="flex w-full flex-col">
                <Head1 text={t("cart_total")} className="text-main2 text-xl font-semibold text-center" />
                <div className="px-4 mt-5">
                  <div className="flex pb-1 border-b border-input flex-col gap-2">
                    <div className="flex justify-between">
                      <h2>{t("sub_total")}</h2>
                      <p>{subTotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <h2>{t("discount")}</h2>
                      <p>{discountTotal}</p>
                    </div>
                    <div className="flex pt-1 justify-between">
                      <h2>{t("taxes")}:</h2>
                      <p>{formatPrice(cart.taxes_total)}</p>
                    </div>
                    <div className="flex pt-1 justify-between">
                      <h2>{t("shipping_cost")}:</h2>
                      <p>{formatPrice(cart.shipping_cost)}</p>
                    </div>
                  </div>{" "}
                  {/* <div className="flex pt-1 justify-between">
                    <h2>{t("fees")}</h2>
                    <p>{formatPrice(cart.shipping_cost)}</p>
                  </div> */}
                  <div className="flex pt-1 justify-between">
                    <h2>{t("total_price")}</h2>
                    <p>{totalPrice}</p>
                  </div>
                  <div className="flex w-fit pt-5 mx-auto mt-3  flex-col">
                    <Proceed />
                  </div>
                </div>
              </Container>
            )}
            {cart.items.length > 0 && (
              <Container className="pt-10 pb-10 flex gap-3 w-full flex-col">
                <Head1 text={t("coupon_code")} className="text-main2 text-xl font-semibold text-center" />
                <CoponApply applied_coupon={cart.applied_coupon} />
              </Container>
            )}
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper>
          <Section
            link="/shop"
            className="md:px-0 min-h-[30vh]"
            heading={cart.items.length === 0 ? t("our_products") : t("similar_products")}
            linkText={t("browse_products")}
          >
            <MotionContainer className="lg:grid hidden lg:grid-cols-4  items-center gap-5 mt-[62px] justify-center">
              {similarProducts?.slice(0, 6).map((item: any) => (
                <Card
                  key={item.id}
                  img={item.main_cover?.[0]?.sizes.large}
                  price={item.price_after_discount}
                  
                  text={item.title}
                  id={item.product_slug || item.parent_slug}
                />
              ))}
            </MotionContainer>
            <div className="mt-4  pb-8 flex lg:hidden">
              <SwiperCards
                slidesPerView={2}
                className="w-full h-full"
                items={similarProducts?.slice(0, 6).map((item: any) => ({
                  card: (
                    <Card
                      key={item.id}
                      img={item.main_cover?.[0]?.sizes.medium}
                      price={item.price_before_discount}
                      sell={
                        item.price_before_discount !== item.price_after_discount ? item.price_before_discount : null
                      }
                      text={item.title}
                      id={item.product_slug || item.parent_slug}
                    />
                  ),
                }))}
              />
            </div>
          </Section>
        </MaxWidthWrapper>
      </div>
    </main>
  );
};

export default page;
