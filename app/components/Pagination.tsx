"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsLoading } from "../context/LoadingContext";

export function PaginationDemo({ totalPages = 5 }: { totalPages?: number }) {
  const { replace } = useRouter();
  const [isFirst, setIsFirst] = useState(true);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, setLoading } = useIsLoading();
  console.log(searchParams.get("page"));
  useEffect(() => {
    if (!searchParams.get("page")) return;

    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setLoading(true);

    const url = new URL(window.location.href);
    //@ts-ignore
    url.searchParams.set("page", page);
    replace(url.toString(), { scroll: false });
    setCurrentPage(page);
    const t = setTimeout(() => {
      setLoading(false);
    }, 2500);
  };
  const locale = useLocale();
  console.log(totalPages);
  return (
    <Pagination className=" mt-10 col-span-full">
      <PaginationContent className={cn(locale === "ar" ? "flex-row-reverse" : " flex-row")}>
        <PaginationItem className=" w-fit">
          <Button
            size="icon"
            className={`rounded-full flex items-center justify-center border border-main bg-white text-main hover:text-white hover:bg-main transition-all ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                className={
                  currentPage === page ? "bg-main text-gray-50 rounded-full text-primary-foreground" : "rounded-full"
                }
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {currentPage >= (totalPages || 5) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            size={"sm"}
            className={`${
              currentPage >= totalPages ? " cursor-not-allowed  opacity-80" : ""
            } rounded-full ml-1  w-fit md:ml-3 flex p-1 items-center  border  border-main bg-white text-main duration-150 hover:text-white hover:bg-main`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage >= totalPages) return null;
              handlePageChange(currentPage + 1);
            }}
          >
            {" "}
            <ArrowRight className="mr-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
