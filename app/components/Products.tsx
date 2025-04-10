"use client";
import React from "react";
import Card from "./Card";
import { PaginationDemo } from "./Pagination";
import { useIsLoading } from "../context/LoadingContext";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ products, totalPages }: { products: Product[]; totalPages: number }) => {
  const { loading } = useIsLoading();
  console.log(products);
  return (
    <>
      {loading
        ? Array(18)
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        : products.map((product: Product) => (
            <Card
              desc={product.short_description}
              key={product.id}
              id={product.slug || ""}
              text={product.title}
              price={product.price_before_discount}
              discount={product.price_after_discount !== product.price_before_discount ? product.price_after_discount : null}
              img={product?.main_cover[0]?.sizes?.medium || "/default-thumbnail.jpg"}
            />
          ))}
      {totalPages > 1 && (
        <div className="flex justify-center col-span-full">
          <PaginationDemo totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default Products;
