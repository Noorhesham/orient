"use client";
import { useGetEntity } from "@/lib/queries";
import React from "react";
import Spinner from "./Spinner";
import MiniHeader from "./MiniHeader";
import Container from "./Container";
import CartItem from "./CartItem";
import Paragraph from "./Paragraph";
import Link from "next/link";

const OrderDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetEntity("my_order", "order", id);
  if (isLoading) return <Spinner />;
  console.log(data);
  return (
    <div className=" px-10">
      <MiniHeader heading="ORDER N019836438" date="05-05-2023" status="DELIVRED" />
      <div className=" grid items-center  py-3 gap-8 grid-cols-1 lg:grid-cols-2">
        <Container CustomePadding="py-10 px-10" className="flex gap-5  mt-4 flex-col ">
          <CartItem
            size="sm"
            wishlist
            img="/Product (1).jpg"
            price="443"
            discount="324"
            text="putty (acrylic 1000) 233"
          />
          <CartItem
            wishlist
            size="sm"
            img="/Product (2).jpg"
            price="443"
            discount="324"
            text="putty (acrylic 1000) 233"
          />
        </Container>
        <div className=" self-start  py-4 text-base">
          <h1 className=" text-main font-semibold  mb-4">ORDER INFORMATION</h1>
          <div className=" mt-2 flex flex-col gap-2">
            <h2 className=" text-base text-main2">SHIPPING ADDRESS:</h2>
            <Paragraph description="90th Street, 5th settlement, New Cairo, Egypt" />
          </div>
          <div className=" mt-2 flex flex-col gap-2">
            <h2 className=" text-base text-main2">SHIPPING ADDRESS:</h2>
            <Paragraph description="90th Street, 5th settlement, New Cairo, Egypt" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
