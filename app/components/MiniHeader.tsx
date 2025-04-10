import { useTranslations } from "next-intl";
import React from "react";

const MiniHeader = ({ heading, date, status }: { heading: string; date: string; status: string }) => {
  const t = useTranslations("table");
  return (
    <div className=" text-center flex flex-col items-center">
      <h3 className=" text-2xl text-main font-medium">{heading}</h3>
      <div className=" mt-2">
        <h4 className=" text-lg font-bold text-main">
          {t("date")} : <span className=" text-black">{date}</span>
        </h4>
      </div>
      <p className=" text-green-500 font-semibold">{status}</p>
    </div>
  );
};

export default MiniHeader;
