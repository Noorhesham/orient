"use client";
import AddressForm from "@/app/components/AddressForm";
import CartItem from "@/app/components/CartItem";
import CompeleteOrder from "@/app/components/CompeleteOrder";
import Container from "@/app/components/Container";
import EmptyCart from "@/app/components/EmptyCart";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import PaymentMethods from "@/app/components/PaymentMethods";
import PriceWithSale from "@/app/components/PriceWithSale";
import ShippingList from "@/app/components/ShippingList";
import Spinner from "@/app/components/Spinner";
import { useAuth } from "@/app/context/AuthContext";
import { formatPrice } from "@/app/helpers/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetEntity } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const { data, isLoading } = useGetEntity("checkout", "checkout");
  const [selected, setSelected] = React.useState(0);
  const { generalSettings, loading, userSettings } = useAuth();
  const t = useTranslations();
  const router = useRouter();
  console.log(generalSettings);
  if (isLoading || !data || loading)
    return (
      <div className=" relative min-h-screen">
        <Spinner />
      </div>
    );
  if (!generalSettings.visitors_create_order) router.push("/cart");
  const { payment_methods, cart, user_addresses } = data;
  const loggedIn = userSettings!!;
  console.log(cart);
  const subTotal = formatPrice(cart.sub_total);
  const discountTotal = formatPrice(cart.discount_total);
  const totalPrice = formatPrice(cart.total);
  return (
    <main className=" bg-gray-50">
      <div className=" pt-5  min-h-screen  ">
        <MaxWidthWrapper className=" flex flex-col   lg:grid  gap-4 lg:grid-cols-11">
          <div className="col-span-7  gap-7 flex flex-col">
            <div>
              {loggedIn && cart.items.length > 0 && (
                <Container CustomePadding=" py-8 px-8" className=" w-full flex flex-col gap-3 px-4">
                  <Head1 className=" text-xl font-bold" text={t("shipping_address")} />
                  <AddressForm setDefaultShipping={setSelected} />
                  <ShippingList
                    user_addresses={user_addresses}
                    setSelected={setSelected}
                    selected={selected || cart.address_id || data?.user_address?.id}
                    user_address={cart.address_id || data?.user_address?.id || data.user_addresses[0]?.id}
                  />
                </Container>
              )}
            </div>
            {cart.items.length > 0 && (
              <Container>
                <Head1 className=" text-xl font-bold" text={t("payment")} />
                <PaymentMethods defaultPayment={cart.payment_method_id} methods={payment_methods} />
              </Container>
            )}
            <Container className=" py-8 flex  flex-col gap-5">
              {cart.items.length === 0 && <EmptyCart />}
              {cart.items.map((item: any) => (
                <CartItem
                  productId={item.product_slug}
                  nocheck
                  key={item.id}
                  img={item?.image[0]?.sizes?.large}
                  price={item.price_before_discount}
                  discount={item.price_after_discount !== item.price_before_discount ? item.price_after_discount : null}
                  text={item.title}
                  quantity={item.quantity}
                />
              ))}
            </Container>
          </div>{" "}
          {cart.items.length > 0 && (
            <div className={cn("col-span-4 flex flex-col gap-5 ")}>
              <Container className={`  portal  pb-5 gap-5 flex flex-col ${userSettings ? "flex-col-reverse" : "pt-5"}`}>
                {<CompeleteOrder />}
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
                </div>
              </Container>
            </div>
          )}
        </MaxWidthWrapper>
      </div>
    </main>
  );
};

export default Page;
