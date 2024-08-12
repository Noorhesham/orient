import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiMedalLight } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";
import { CiCreditCard1, CiHeadphones } from "react-icons/ci";

const Feature = () => {
  return (
    <div className=" mb-5 mt-8">
      <h2 className=" font-semibold">FEATURE</h2>
      <ul className=" flex flex-col gap-4 mt-2">
        <li className="flex gap-2 items-center">
          <PiMedalLight className=" text-main  text-xl" /> <p>FREE 1 YEAR WARRANTY</p>
        </li>
        <li className="flex gap-2 items-center">
          <CiDeliveryTruck className=" text-main  text-xl" />
          <p>Free Shipping & Fasted Delivery</p>
        </li>
        <li className="flex gap-2 items-center">
          <FaRegHandshake className=" text-main  text-xl" />
          <p>100% Money-back guarantee</p>
        </li>
        <li className="flex gap-2 items-center">
          <CiHeadphones className=" text-main  text-xl" />
          <p>24/7 Customer support</p>
        </li>
        <li className="flex gap-2 items-center">
          <CiCreditCard1 className=" text-main  text-xl" />

          <p>Secure payment method</p>
        </li>
      </ul>
    </div>
  );
};

export default Feature;
