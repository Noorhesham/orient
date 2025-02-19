import React from "react";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import Tabing from "../../../../components/Tabing";
import { PaginationDemo } from "@/app/components/Pagination";
import { Server } from "@/app/main/Server";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { data: categories } = await Server({
    resourceName: "getEntity",
    entityName: "inspired-categories",
  });
  const { data } = await Server({
    resourceName: "getinspired",
    entityName: "inspired-items",

    queryParams: new URLSearchParams({
      inspired_categories: searchParams?.category,
      page: searchParams?.page,
      itemsCount: "12",
    }),
  });
  searchParams?.category;
  const images = data.map((d) => d.images).flat();
  const totalPages = Math.ceil(data.length / 12);
  console.log(data);

  return (
    <MaxWidthWrapper className=" min-h-screen mt-5">
      <h1 className=" hidden">get inspired</h1>
      <Tabing
        categories={categories}
        defaultValue="1"
        options={images.map((img: any) => {
          return { file: img.file, med: img.sizes.medium };
        })}
      />{" "}
      {totalPages > 1 && <PaginationDemo totalPages={Math.ceil(data.length / 12) || 1} />}
    </MaxWidthWrapper>
  );
};

export default page;
