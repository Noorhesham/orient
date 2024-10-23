"use client";
import AddressForm from "@/app/components/AddressForm";
import CartItem from "@/app/components/CartItem";
import CompeleteOrder from "@/app/components/CompeleteOrder";
import Container from "@/app/components/Container";
import EmptyCart from "@/app/components/EmptyCart";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Paragraph from "@/app/components/Paragraph";
import PaymentMethods from "@/app/components/PaymentMethods";
import PriceWithSale from "@/app/components/PriceWithSale";
import ShippingList from "@/app/components/ShippingList";
import Spinner from "@/app/components/Spinner";
import { useAuth } from "@/app/context/AuthContext";
import { Server } from "@/app/main/Server";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEntity } from "@/lib/queries";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { data, isLoading } = useGetEntity("checkout", "checkout");
  const [selected, setSelected] = React.useState(0);
  const { generalSettings, loading, userSettings } = useAuth();
  const t = useTranslations();
  const router = useRouter();
  console.log(data);
  if (isLoading || !data || loading)
    return (
      <div className=" min-h-screen">
        <Skeleton />
      </div>
    );
  if (!generalSettings.visitors_create_order) router.push("/cart");
  const { payment_methods, cart, user_addresses } = data;
  const loggedIn = userSettings!!;
  console.log(cart, selected);
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
                    selected={selected || data?.user_address?.id}
                    user_address={data?.user_address?.id}
                  />
                </Container>
              )}
            </div>

            {cart.items.length > 0 && (
              <Container>
                <Head1 className=" text-xl font-bold" text={t("payment")} />
                <PaymentMethods methods={payment_methods} />
              </Container>
            )}
            <Container className=" py-8 flex  flex-col gap-5">
              {cart.items.length === 0 && <EmptyCart />}
              {cart.items.map((item: any) => (
                <CartItem
                  productId={item.id}
                  nocheck
                  key={item.id}
                  img={item?.image[0]?.sizes?.large}
                  price={item.price_after_discount}
                  discount={item.price}
                  text={item.title}
                  quantity={item.quantity}
                />
              ))}
            </Container>
          </div>
          {cart.items.length > 0 && (
            <div className="col-span-4 flex flex-col gap-5 ">
              <Container className="  pt-10 pb-10 flex flex-col">
                <h1 className=" text-main2 text-xl font-semibold text-center">{t("cart_total")}</h1>
                <div className="  px-14 mt-5">
                  <div className=" flex pb-1 border-b border-input flex-col  gap-2">
                    <div className="flex  items-center justify-between">
                      <h2 className="text-main2 font-medium ">{t("sub_total")}</h2>
                      <PriceWithSale size="sm" price={cart.sub_total} />
                    </div>
                    <div className="flex  items-center justify-between">
                      <h2 className="text-main2 font-medium ">{t("discount")}</h2>
                      <PriceWithSale size="sm" price={cart.discount_total} />
                    </div>
                  </div>
                  <div className="flex  items-center pt-1  justify-between">
                    <h2 className="text-main2 font-medium ">{t("total_price")}</h2>
                    <PriceWithSale size="sm" price={cart.total} />
                  </div>
                  <CompeleteOrder />
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
