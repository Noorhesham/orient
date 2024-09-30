import React from "react";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Heading from "../../../components/Heading";
import CardHuge, { BlogProps } from "../../../components/CardHuge";
import MotionContainer from "@/app/components/MotionContainer";
import { Server } from "@/app/main/Server";
import BreadCrumb from "@/app/components/BreadCrumb";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations();
  const data = await Server({
    resourceName: "getEntity",
    entityName: "blogs",
    queryParams: new URLSearchParams({ with: "tags,category_id" }),
  });
  console.log(data);
  return (
    <section className=" min-h-screen  ">
      <BreadCrumb
        linksCustom={[
          { href: "/", text: "HOME" },
          { href: "blog", text: "BLOG" },
        ]}
      />
      <MaxWidthWrapper className="flex flex-col items-center   justify-center">
        <Heading mainText={t("discover the most important")} subText={t("articles about paints")} paragraph="" />
        <MotionContainer className=" mt-5 lg:mt-10 gap-4 grid grid-cols-1 md:grid-cols-2  items-stretch  lg:grid-cols-3">
          {data.data.map((item: BlogProps) => (
            <CardHuge item={item} href={`/blog/${item.id}`} key={item.id} />
          ))}
        </MotionContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
