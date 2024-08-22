import React from "react";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Heading from "../../../components/Heading";
import CardHuge, { BlogProps } from "../../../components/CardHuge";
import MotionContainer from "@/app/components/MotionContainer";
import { Server } from "@/app/main/Server";

const page = async () => {
  const data = await Server({ resourceName: "getEntity", entityName: "blogs" });
  return (
    <section className=" min-h-screen  ">
      <MaxWidthWrapper className="flex flex-col items-center  mt-5 justify-center">
        <Heading
          mainText="discover the most important"
          subText="articles about paints"
          paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsam cum quam ullam, nulla iure nesciunt a, tempora, obcaecati excepturi eos rem tenetur dolor. Ducimus praesentium sapiente provident voluptates officia?"
        />
        <MotionContainer className=" mt-5 lg:mt-10 gap-4 grid grid-cols-1 md:grid-cols-2  items-stretch  lg:grid-cols-3">
          {data.data.map((item:BlogProps) => (
            <CardHuge item={item} href={`/blog/${item.id}`} key={item.id} />
          ))}
        </MotionContainer>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
