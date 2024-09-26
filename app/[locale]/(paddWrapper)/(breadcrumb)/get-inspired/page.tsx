import React, { Suspense } from "react";
import MaxWidthWrapper from "../../../../components/MaxWidthWrapper";
import ImageGrid from "../../../../components/ImageGrid";
import Tabing from "../../../../components/Tabing";
import { PaginationDemo } from "@/app/components/Pagination";
import { Server } from "@/app/main/Server";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { data: categories } = await Server({
    resourceName: "getEntity",
    entityName: "inspired-categories",
  });
  console.log(categories);

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

  return (
    <MaxWidthWrapper className=" min-h-screen mt-5">
      {/* <p className=" text-[14px] text-black max-w-[1259px] text-center">
        SEO Content s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book.Lorem Ipsum{" "}
      </p> */}
      <Suspense>
        <Tabing categories={categories} defaultValue="1" options={images.map((img: any) => img.file)} />
        <PaginationDemo totalPages={Math.ceil(data.length / 12) || 1} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default page;
