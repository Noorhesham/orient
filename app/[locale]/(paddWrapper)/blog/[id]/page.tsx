import BreadCrumb from "@/app/components/BreadCrumb";
import { BlogProps } from "@/app/components/CardHuge";
import { Calender, DashBoard } from "@/app/components/Icons";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import RightClickProvider from "@/app/context/RightClickDisable";
import { Server } from "@/app/main/Server";
import { convertToHTML } from "@/lib/utils";
import { format } from "date-fns";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";
import styles from "../../../product.module.css";
import Paragraph from "@/app/components/Paragraph";
const page = async ({ params }: { params: { locale: string; id: string } }) => {
  unstable_setRequestLocale(params.locale);
  const data = await Server({
    resourceName: "getSingleEntity",
    id: params.id,
    entityName: "blogs",
    queryParams: new URLSearchParams({ with: "tags,category_id" }),
  });
  const item: BlogProps = data.item;
  const { main_gallery, title, content } = item;
  const contentHTML = convertToHTML(content);
  const t = await getTranslations();

  return (
    <RightClickProvider>
      <section className=" min-h-screen  ">
        <BreadCrumb
          linksCustom={[
            {
              href: "/",
              text: t("breadcrumb.home"),
            },
            {
              href: "blog",
              text: t("breadcrumb.blog"),
            },
            {
              href: `blog/${item.id}`,
              text: `${item.title.slice(0, 20)} ..`,
            },
          ]}
        />
        <MaxWidthWrapper className="flex flex-col items-start px-14  mt-5 justify-center">
          <div className=" relative w-full h-96 lg:h-[750px]">
            <Image src={main_gallery[0].file} alt="blog" className=" object-cover lg:object-cover" fill />
          </div>
          <div className=" flex items-start mr-auto my-4 gap-3">
            {item.created_at && (
              <div className=" flex items-center gap-2">
                <Calender />
                <p className=" text-xs font-medium text-[#475156]">
                  {format(new Date(item.created_at), "dd MMM yyyy")}
                </p>
              </div>
            )}
            {item.category && (
              <div className=" flex items-center gap-2">
                <DashBoard />
                <p className=" text-xs font-medium text-[#475156]">{item.category.title}</p>
              </div>
            )}
          </div>
          <h1 className=" capitalize mb-4 text-4xl text-main2  font-semibold max-w-5xl">{title}</h1>

          <Paragraph
            className={` w-full !max-w-full product my-2 font-[300] leading-[1.8rem] text-lg ${styles.product}`}
            danger
            description={contentHTML || ""}
          />
        </MaxWidthWrapper>
      </section>
    </RightClickProvider>
  );
};

export default page;
