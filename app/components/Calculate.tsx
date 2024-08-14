"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { CiCalculator2 } from "react-icons/ci";
import ModalCustom from "./ModalCustom";

const Calculate = ({ btn }: { btn?: React.ReactNode }) => {
  return (
    <ModalCustom
      title="CALCULATE THE QUANTITY"
      btn={
        btn || (
          <div>
            <div className=" cursor-pointer flex gap-3 ">
              <div className=" flex flex-col  items-center gap-2">
                <div className=" rounded-full w-44 h-44 relative">
                  <Image src={"/Ellipse 860.png"} fill className="rounded-full object-cover" alt="" />
                </div>
                <h1 className="  text-2xl text-main2 font-[500] mt-4 ">PAINT CALCULATOR</h1>
              </div>
            </div>
          </div>
        )
      }
      desc="THE NUMBER OF PAINT SHEET USERD IS"
      span={"15 SHEETS"}
      functionalbtn={
        <Button className=" hover:bg-white hover:text-main2 border border-main2 text-xs font-medium rounded-full flex  items-center gap-2 px-6  bg-main2">
          <CiCalculator2 />
          CALCULATE
        </Button>
      }
      content={
        <div>
          <div className=" flex-col flex py-5 px-20  mt-5">
          <Input placeholder="NUMBER OF METERS" className=" outline-gray-900 placeholder:text-gray-900" />
        </div>
        </div>
      }
    />
  );
};

export default Calculate;
