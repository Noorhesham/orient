import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiMedalLight } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";
import { CiCreditCard1, CiHeadphones } from "react-icons/ci";
import { useTranslations } from "next-intl";

const Feature = () => {
  const t = useTranslations("feature"); // Use translations with the "feature" scope

  return (
    <div className="mb-5 mt-8">
      <h2 className="font-semibold">{t("title")}</h2>
      <ul className="flex flex-col gap-4 mt-2">
        <li className="flex gap-2 hover:-translate-y-1 hover:text-main  duration-150 group items-center">
          <PiMedalLight className=" group-hover:text-main/80  text-main text-xl" />
          <p>{t("warranty")}</p>
        </li>
        <li className="flex  hover:-translate-y-1 hover:text-main  duration-150 gap-2 items-center">
          <CiDeliveryTruck className="text-main text-xl" />
          <p>{t("shipping")}</p>
        </li>
        <li className="flex  hover:-translate-y-1 hover:text-main  duration-150 gap-2 items-center">
          <FaRegHandshake className="text-main text-xl" />
          <p>{t("moneyBack")}</p>
        </li>
        <li className="flex  hover:-translate-y-1 hover:text-main  duration-150 gap-2 items-center">
          <CiHeadphones className="text-main text-xl" />
          <p>{t("support")}</p>
        </li>
        <li className="flex  hover:-translate-y-1 hover:text-main  duration-150 gap-2 items-center">
          <CiCreditCard1 className="text-main text-xl" />
          <p>{t("securePayment")}</p>
        </li>
      </ul>
    </div>
  );
};

export default Feature;
