"use client";
import React from "react";
import Card from "./Card";
import { PaginationDemo } from "./Pagination";
import { useIsLoading } from "../context/LoadingContext";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({ products, totalPages }: { products: Product[]; totalPages: number }) => {
  const { loading } = useIsLoading();
  return (
    <>
      {loading
        ? Array(18)
            .fill(0)
            .map((_, index) => <ProductSkeleton key={index} />)
        : products.map((product: Product) => (
            <Card
              key={product.id}
              id={product.id || ""}
              text={product.title}
              sell={product.sell_price ? product.regular_price : null}
              img={product?.main_cover[0]?.sizes?.medium || "/default-thumbnail.jpg"}
              price={product.price.toString()}
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
