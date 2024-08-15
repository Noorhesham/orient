import Box from "@/app/components/Box";
import BreadCrumb from "@/app/components/BreadCrumb";
import Card from "@/app/components/Card";
import FilterMobile from "@/app/components/FilterPhone";
import Filters from "@/app/components/Filters";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import MotionItem from "@/app/components/MotionItem";
import { PaginationDemo } from "@/app/components/Pagination";
import PriceFilter from "@/app/components/PriceFilter";
import Sort from "@/app/components/Sort";
import React, { Suspense } from "react";

const page = () => {
  return (
    <MaxWidthWrapper className=" bg-gray-50">
      <section className=" min-h-screen  ">
        <Suspense>
          <MotionItem nohover initial={{ y: -100 }} animate={{ y: 1 }} className=" flex justify-center">
            <section className=" flex flex-col w-full lg:grid lg:gap-10 lg:grid-cols-9  mt-5 ">
              <div className="col-span-3 lg:block hidden">
                <Filters />
              </div>
              <div className=" lg:col-span-6 grid-cols-3 ">
                <div className="  gap-3 w-full flex  items-center sm:flex-row flex-grow justify-between">
                  <div className="flex  items-center">
                    <h1 className=" text-black font-semibold">65,867</h1>{" "}
                    <p className=" text-muted-foreground ml-2">Results Found</p>
                  </div>
                  <div className="lg:block hidden">
                    <Sort options={["Price: Low to High", "Price: High to Low"]} />
                  </div>
                  <FilterMobile />
                </div>
                <MotionContainer className="grid duration-150  w-full grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 items-center gap-3 mt-10 ">
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (1).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (2).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                  <Card price="442.12 EGP" text={`putty (acrylic 1000) 233`} img="/Product (3).jpg" />
                  <div className="flex justify-center col-span-full">
                    <PaginationDemo />
                  </div>
                </MotionContainer>
              </div>
            </section>
          </MotionItem>
        </Suspense>
      </section>
    </MaxWidthWrapper>
  );
};

export default page;
