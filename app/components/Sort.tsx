"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const Sort = ({ options }: { options: any[] }) => {
  const [selected, setSelected] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const sort = params.get("sort");
    if (sort) {
      // @ts-ignore
      setSelected((s) =>
        sort === "price_lth" ? "Price: Low to High" : sort === "price_htl" ? "Price: High to Low" : "BY LATEST"
      );
    }
  }, [searchParams]);
  return (
    <div className="   mt-4 flex items-center justify-between gap-4">
      <h2 className=" text-gray-500 text-sm">Sort By:</h2>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className=" bg-white min-w-[150px] py-1.5 px-3 rounded-xl text-sm  flex items-center gap-1">
          {selected || "BY LATEST"}
          <ChevronDown className=" ml-auto text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-full rounded-sm">
          {options.map((option, i) => (
            <DropdownMenuItem
              onClick={() => {
                setSelected(option.label);
                const params = new URLSearchParams(searchParams);
                params.set("sort", option.value);
                router.push(`?${params.toString()}`, { scroll: false });
              }}
              className=" uppercase  rounded-sm"
              key={i}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
