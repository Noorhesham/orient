"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const PRICE_FILTERS = [
  { value: [0, 10000], label: "All Price", isCustom: false },
  { value: [1, 200], label: "Under 200EGP", isCustom: false },
  { value: [25, 100], label: "25EGP to 100EGP", isCustom: false },
  { value: [100, 300], label: "100EGP to 300EGP", isCustom: false },
  { value: [300, 500], label: "300EGP to 500EGP", isCustom: false },
  { value: [500, 1000], label: "500EGP to 1000EGP", isCustom: false },
  { value: [1000, 2000], label: "1000EGP to 2000EGP", isCustom: false },
  { isCustom: true, value: [0, 100000] },
];
const DEFAULT_RANGE = [0, 10000];

const PriceFilter = () => {
  const [priceFilter, setPriceFilter] = useState({
    range: DEFAULT_RANGE,
    isCustom: false,
  });
  const searchParams = useSearchParams();
  const price_from = Number(searchParams.get("price_from"));
  const price_to = Number(searchParams.get("price_to"));
  const custom = searchParams.get("custom") === "true" ? true : false;
  useEffect(() => {
    if (price_from && price_to) {
      setPriceFilter({
        range: [Number(price_from), Number(price_to)],
        isCustom: custom || false,
      });
    }
  }, [price_from, price_to, custom]);
  const { replace } = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    ["price_from", "price_to", "custom"].forEach((key) => url.searchParams.delete(key));
    url.searchParams.append("price_from", priceFilter.range[0].toString());
    url.searchParams.append("price_to", priceFilter.range[1].toString());
    url.searchParams.append("custom", priceFilter.isCustom.toString());
    replace(url.toString(), { scroll: false });
  }, [priceFilter, replace]);
  const handlePriceChange = ({ range, isCustom }: any) => setPriceFilter({ range, isCustom });

  return (
    <ul className="space-y-1 filter border-b px-5 border-gray-200 pb-6 text-sm font-medium text-gray-900">
      <li className="flex items-center  flex-row flex-wrap  lg:flex-col gap-4">
        <div className="self-start flex items-center gap-2 mr-auto">
          <label
            htmlFor={"price-custom"}
            className="text-lg  mr-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Price Range
          </label>
        </div>

        <Slider
          defaultValue={DEFAULT_RANGE}
          min={DEFAULT_RANGE[0]}
          max={DEFAULT_RANGE[1]}
          step={20}
          value={priceFilter?.isCustom ? priceFilter?.range : DEFAULT_RANGE}
          onValueChange={(range) => {
            const [newMin, newMax] = range;
            console.log({ newMin, newMax });
            handlePriceChange({ range: [newMin, newMax], isCustom: true, debounce: true });
          }}
          className={cn("w-full", !priceFilter?.isCustom && " opacity-50")}
        />
        {priceFilter && (
          <div className="flex self-start mb-3 justify-between">
            <div className="flex w-fit gap-5   items-center">
              <Input
                onChange={(e) => {
                  priceFilter?.isCustom &&
                    setPriceFilter((prev) => ({ isCustom: true, range: [Number(e.target.value), prev.range[1]] }));
                }}
                value={price_from?.toFixed(0) || priceFilter?.range[1]?.toFixed(0)}
                className=" max-w-32"
              />
              <Input
                onChange={(e) => {
                  priceFilter?.isCustom &&
                    setPriceFilter((prev) => ({ isCustom: true, range: [prev.range[0], Number(e.target.value)] }));
                }}
                value={price_to?.toFixed(0) || priceFilter?.range[1]?.toFixed(0)}
                className=" max-w-32"
              />
            </div>
          </div>
        )}
      </li>
      <div className="flex  flex-row flex-wrap gap-3   text-sm font-medium lg:flex-col">
        {" "}
        {PRICE_FILTERS.filter((p) => !p.isCustom).map((filter: any, i: number) => (
          <li
            key={i}
            className={`EGP{priceFilter === filter.value ? "text-gray-500" : "text-gray-900"}  flex items-center gap-2`}
          >
            <input
              type="radio"
              id={filter.value}
              checked={
                priceFilter?.range?.[0] === filter.value?.[0] &&
                priceFilter?.range?.[1] === filter.value?.[1] &&
                !priceFilter?.isCustom
              }
              onChange={() => {
                handlePriceChange({
                  range: filter.value,
                  isCustom: filter.isCustom,
                  debounce: false,
                });
              }}
            />
            <label
              htmlFor={filter.value}
              className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {filter.label}
            </label>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default PriceFilter;
