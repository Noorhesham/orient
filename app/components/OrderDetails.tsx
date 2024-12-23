"use client";
import { useGetEntity } from "@/lib/queries";
import React from "react";
import Spinner from "./Spinner";
import MiniHeader from "./MiniHeader";
import Container from "./Container";
import CartItem from "./CartItem";
import Paragraph from "./Paragraph";
import { useTranslations } from "next-intl"; // Import useTranslations
import { format } from "date-fns";

const OrderDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetEntity("my_order", `order-${id}`, id);
  const t = useTranslations("orderDetails"); // Translation hook
  const t1 = useTranslations("table");
  const t2 = useTranslations("CountriesInput");
  const address = useTranslations("address");
  if (isLoading)
    return (
      <div className=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  const { order } = data;

  return (
    <div className="lg:px-10 py-10 lg:py-5">
      <MiniHeader
        heading={t("orderNumber", { uuid: order?.uuid })} 
        date={format(new Date(order.date), "dd/MM/yyyy")}
        status={t1(order.status)}
      />
      <div className="grid items-center py-3 gap-8 grid-cols-1 lg:grid-cols-2">
        <Container CustomePadding="lg:py-10 lg:px-10" className="flex gap-5 mt-4 flex-col">
          {order.items.map((item: any) => (
            <CartItem
              nocheck
              productId={item.product_slug}
              key={item.id}
              size="sm"
              img={item?.image[0]?.sizes?.medium}
              price={item.price_after_discount}
              discount={item.price_before_discount}
              text={item.title}
            />
          ))}
        </Container>
        <div className="self-start py-4 text-base">
          <h3 className="text-main font-semibold mb-4">{t("orderInformation")}</h3>
          <div className="mt-2 flex flex-col">
            <h2 className="text-base text-main2">{t("shippingAddress")}</h2>
            <Paragraph
              description={` ${t2("countryLabel")}: ${order.shipping_info.country} ${t2("stateLabel")}: ${
                order.shipping_info.state
              }`}
            />
            <Paragraph description={` ${address("title")} : ${order.shipping_info.address_text}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
