"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useIsLoading } from "../context/LoadingContext";

const PriceFilter = () => {
  const t = useTranslations("filters");
  const { setLoading } = useIsLoading();
  const [init, setIsInit] = useState(true);
  const [isPending, startTransition] = useTransition();
  const PRICE_FILTERS = [
    { value: [0, 10000], label: t("allPrice"), isCustom: false },
    { value: [1, 100], label: t("under100"), isCustom: false },
    { value: [100, 200], label: t("100to200"), isCustom: false },
    { value: [200, 300], label: t("200to300"), isCustom: false },
    { value: [300, 500], label: t("300to500"), isCustom: false },
    { value: [500, 1000], label: t("500to1000"), isCustom: false },
    { value: [1000, 9999999], label: t("moreThan1000"), isCustom: false },
    { isCustom: true, value: [0, 100000], label: t("custom") },
  ];
  const DEFAULT_RANGE = [0, 10000];
  const [priceFilter, setPriceFilter] = useState({
    range: DEFAULT_RANGE,
    isCustom: false,
  });
  const [visualPrice, setVisualPrice] = useState({
    min: 0,
    max: 10000,
  });
  const searchParams = useSearchParams();
  const price_from = Number(searchParams.get("price_from"));
  const price_to = Number(searchParams.get("price_to"));
  const custom = searchParams.get("custom") === "true" ? true : false;
  useEffect(() => {
    if (!price_from && !price_to) {
      setPriceFilter({
        range: DEFAULT_RANGE,
        isCustom: false,
      });
    } else {
      setPriceFilter({
        range: [price_from || DEFAULT_RANGE[0], price_to || DEFAULT_RANGE[1]],
        isCustom: custom || false,
      });
    }
  }, [price_from, price_to, custom]);
  const router = useRouter();
  const updateUrl = useCallback(() => {
    if (init) return;
    startTransition(() => {
      const url = new URL(window.location.href);
      ["price_from", "price_to", "custom"].forEach((key) => url.searchParams.delete(key));
      url.searchParams.append("price_from", priceFilter.range[0].toString());
      url.searchParams.append("price_to", priceFilter.range[1].toString());
      url.searchParams.append("custom", priceFilter.isCustom?.toString());
      url.searchParams.set("page", "1");
      router.push(url.toString(), { scroll: false });
    });
  }, [priceFilter, router]);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);
  useEffect(() => {
    updateUrl();
  }, [priceFilter, updateUrl]);

  // useEffect(() => {
  //   setLoading(isPending);
  // }, [isPending, setLoading]);
  const handlePriceChange = ({ range, isCustom }: any) => {
    setIsInit(false);
    setPriceFilter({ range, isCustom });
  };

  return (
    <ul className="space-y-1 filter border-b px-5 flex flex-col gap-2 border-gray-200 pb-6 text-sm font-medium text-gray-900">
      <li className="flex items-center  flex-row flex-wrap  lg:flex-col gap-4">
        <div className="self-start flex items-center gap-2 ">
          <label
            htmlFor={"price-custom"}
            className="text-lg   font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("range")}
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
            handlePriceChange({ range: [newMin, newMax], isCustom: true, debounce: true });
          }}
          className={cn("w-full", !priceFilter?.isCustom && " opacity-50")}
        />
        {priceFilter && (
          <div className="flex self-start mb-3 justify-between">
            <div className="flex w-fit gap-5   items-center">
              <Input
                onChange={(e) => {
                  if (priceFilter?.isCustom) {
                    setIsInit(false);

                    setVisualPrice({
                      min: Number(e.target.value),
                      max: priceFilter.range[1],
                    });
                    setPriceFilter((prev) => ({ isCustom: true, range: [Number(e.target.value), prev.range[1]] }));
                  }
                }}
                value={visualPrice.min || price_from?.toFixed(0) || priceFilter?.range[1]?.toFixed(0)}
                className=" max-w-32"
              />
              <Input
                onChange={(e) => {
                  if (priceFilter?.isCustom) {
                    setIsInit(false);

                    setVisualPrice({
                      min: priceFilter.range[0],
                      max: Number(e.target.value),
                    });
                    setPriceFilter((prev) => ({ isCustom: true, range: [prev.range[0], Number(e.target.value)] }));
                  }
                }}
                value={visualPrice.max || price_to?.toFixed(0) || priceFilter?.range[1]?.toFixed(0)}
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
      <Button variant={"outline"} className="w-full mt-8" onClick={() => handlePriceChange({ range: [0, 10000] })}>
        {t("reset")}
      </Button>
    </ul>
  );
};

export default PriceFilter;
