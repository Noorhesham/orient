import BreadCrumb from "@/app/components/BreadCrumb";
import { BlogProps } from "@/app/components/CardHuge";
import { Calender, DashBoard } from "@/app/components/Icons";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { Server } from "@/app/main/Server";
import { convertToHTML } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: { locale: string; id: string } }) => {
  const data = await Server({
    resourceName: "getSingleEntity",
    id: params.id,
    entityName: "blogs",
    queryParams: new URLSearchParams({ with: "tags,category_id" }),
  });
  const item: BlogProps = data.item;
  const { main_gallery, title, content } = item;
  const contentHTML = convertToHTML(content);
  console.log(item);
  return (
    <section className=" min-h-screen  ">
      <BreadCrumb
        linksCustom={[
          {
            href: "",
            text: "HOME",
          },
          {
            href: "blog",
            text: "BLOG",
          },
          {
            href: `blog/${item.id}`,
            text: item.title,
          },
        ]}
      />
      <MaxWidthWrapper className="flex flex-col items-start px-14  mt-5 justify-center">
        <div className=" relative w-full h-96 lg:h-[750px]">
          <Image src={main_gallery[0].sizes.large} alt="blog" className=" object-cover lg:object-cover" fill />
        </div>
        <div className=" flex items-start mr-auto my-4 gap-3">
          {item.created_at && (
            <div className=" flex items-center gap-2">
              <Calender />
              <p className=" text-xs font-medium text-[#475156]">1 FEB,2025</p>
            </div>
          )}
          {item.category && (
            <div className=" flex items-center gap-2">
              <DashBoard />
              <p className=" text-xs font-medium text-[#475156]">{item.category}</p>
            </div>
          )}
        </div>
        <h1 className=" capitalize mb-4 text-4xl text-main2 text-left font-semibold max-w-5xl">{title}</h1>
        <div className=" font-[300] leading-[1.8rem] text-base" dangerouslySetInnerHTML={{ __html: contentHTML }} />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
