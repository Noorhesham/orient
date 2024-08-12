"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { useParams } from "../hooks/useParams";

const Partner = ({ tabs }: { tabs: any[] }) => {
  const [param, handleParam, deleteParam] = useParams("category", "all");
  console.log(param);

  return (
    <>
      {tabs.map(({ link, text }, i) => (
        <CustomButton
          onClick={() => handleParam(link)}
          reverse={param === link} backgroundColor="dark"
          key={i}
          className=" py-6 "
          text={text}
        />
      ))}
    </>
  );
};

export default Partner;
