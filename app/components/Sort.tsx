"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const Sort = ({ options }: { options: any[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="  mt-4 flex items-center gap-4">
      <h2 className=" text-gray-500 text-sm">Sort By:</h2>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className=" bg-white py-1.5 px-3 rounded-xl text-sm  flex items-center gap-1">
          Most Popular <ChevronDown className="text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-full rounded-sm">
          {options.map((option, i) => (
            <DropdownMenuItem
              onClick={() => {
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
