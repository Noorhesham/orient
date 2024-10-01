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
  const { data, isLoading } = useGetEntity("my_order", "order", id);
  const t = useTranslations("orderDetails"); // Translation hook
  if (isLoading) return <Spinner />;
  const { order } = data;

  return (
    <div className="lg:px-10">
      <MiniHeader
        heading={t("orderNumber", { uuid: order.uuid })} // Use translation with variable
        date={format(new Date(order.date), "dd/MM/yyyy")}
        status={order.status}
      />
      <div className="grid items-center py-3 gap-8 grid-cols-1 lg:grid-cols-2">
        <Container CustomePadding="lg:py-10 lg:px-10" className="flex gap-5 mt-4 flex-col">
          {order.items.map((item: any) => (
            <CartItem
              nocheck
              productId={item.product_id}
              key={item.id}
              size="sm"
              img={item.image[0].sizes.medium}
              price={item.price_after_discount}
              discount={item.price}
              text={item.title}
            />
          ))}
        </Container>
        <div className="self-start py-4 text-base">
          <h1 className="text-main font-semibold mb-4">{t("orderInformation")}</h1>
          <div className="mt-2 flex flex-col gap-2">
            <h2 className="text-base text-main2">{t("shippingAddress")}</h2>
            <Paragraph
              description={`${order.shipping_info.address_text} Country: ${order.shipping_info.country} State: ${order.shipping_info.state}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
