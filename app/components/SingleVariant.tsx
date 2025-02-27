"use client";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const syncUrls = ({ setwights, setColors, variations, filters }: any) => {
  const existingVariationsVloume: any[] = [];
  const existingVariationsColor: any[] = [];
  variations?.forEach((variation: any) => {
    const foundwight = variation.find(
      (varr: any) =>
        varr.attribute_id == filters["color"]?.[0]?.split(":")[0] &&
        varr.option_id == filters["color"]?.[0]?.split(":")[1]
    );
    const foundColor = variation.find(
      (varr: any) =>
        varr.attribute_id == filters["wight"]?.[0]?.split(":")[0] &&
        varr.option_id == filters["wight"]?.[0]?.split(":")[1]
    );
    if (foundColor) existingVariationsColor.push(variation[0].option_id);
    if (foundwight) existingVariationsVloume.push(variation[1].option_id);
    setwights(existingVariationsVloume);
    setColors(existingVariationsColor);
  });
};
const SingleVariant = ({
  colorOptions,
  options,
  variations,
  ischild,
  childId,
  parentId,
}: {
  colorOptions: any;
  options: any;
  variations?: any;
  ischild?: boolean;
  childId?: any;
  parentId: string;
}) => {
  const [first, setFirst] = React.useState(true);
  const child = variations.filter((variation: any) => {
    return variation.find((varr: any) => varr.product_id === childId);
  })[0];
  const [filters, setFilters] = React.useState<{ [key: string]: string[] }>(
    ischild
      ? {
          ["color"]: [`${[child[0].attribute_id]}:${[child[0].option_id]}`],
          ["wight"]: [`${[child[1]?.attribute_id]}:${[child[1]?.option_id]}`],
        }
      : {
          ["color"]: [`${[colorOptions[0]?.id]}:${[colorOptions[0]?.options[0]?.id]}`],
          ["wight"]: [`${[options[0]?.id]}:${[options[0]?.options[0]?.id]}`],
        }
  );

  const [colors, setColors] = React.useState<string[]>(colorOptions[0]?.options);
  const [wights, setwights] = React.useState<string[]>(options[0]?.options);
  console.log(colors, colorOptions[0].options);

  const router = useRouter();
  const locale = useLocale();
  const handleFilter = (filterValue: string, filterName: string) => {
    setFirst(false);
    setFilters((prevFilters: any) => {
      return {
        ...prevFilters,
        [filterName]: [filterValue],
      };
    });
  };
  useEffect(() => {
    if (ischild) {
      syncUrls({ setwights, setColors, variations, filters });
    }
  }, [ischild, filters, variations]);
  useEffect(() => {
    const updateURL = () => {
      const params = new URLSearchParams(window.location.search);
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(","));
        } else {
          params.delete(key);
        }
        params.delete("child");
      });

      if (ischild) {
        router.push(`/${locale}/product/${parentId}?${params.toString()}`, { scroll: false });
      } else if (filters["color"] && filters["wight"]) {
        router.push(`?${params.toString()}`, { scroll: false });
      }
    };

    if (!first) updateURL();
  }, [filters, router, ischild, parentId, first]);
  const handleReset = (name: string) => {
    const params = new URLSearchParams(window.location.search);

    params.delete(name);
    router.replace(`?${params.toString()}`, { scroll: false });
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[name] || [];
      return {
        ...prevFilters,
        [name]: [],
      };
    });
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: any = {};
    params.forEach((value, key) => {
      newFilters[key] = value.split(",");
    });
    if (ischild) return;
    if (params.get("color") && params.get("wight") && !ischild) setFilters(newFilters);
  }, []);

  useEffect(() => {
    if (!ischild) return;
    syncUrls({ setwights, setColors, variations, filters });
  }, []);
  const t = useTranslations();

  return (
    <div className="flex w-full px-5 py-2 lg:py-4 font-medium text-sm bg-white uppercase flex-col">
      <ul className="pb-3 w-full flex flex-col gap-2 border-b border-b-gray-400">
        {colorOptions?.[0] && (
          <div className="flex w-full items-center gap-2">
            {" "}
            <h4 className="text-base  mb-2">{t("colors")}</h4>
            <div className=" grid grid-cols-5 items-center  w-full lg:gap-2">
              {colorOptions[0].options?.map((option: any, i: number) => (
                <button
                  disabled={!colors.includes(option.id)}
                  key={i}
                  style={{ backgroundColor: `#${option.data}` }}
                  onClick={() => {
                    handleFilter(`${colorOptions[0].id}:${option.id}`, "color");
                  }}
                  className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-50  border-2 border-input p-1 hover:opacity-90 duration-100 ${
                    filters?.["color"]?.includes(`${colorOptions[0].id}:${option.id}`)
                      ? "outline-2  outline outline-main"
                      : ""
                  } shadow-sm  aspect-square rounded-md max-h-7 max-w-7 w-full h-full`}
                ></button>
              ))}
            </div>
          </div>
        )}
        {options?.[0] && (
          <div className="flex  flex-wrap items-center gap-2">
            <h4 className="text-base  mb-2">{t("WIGHT")}</h4>
            {options[0].options?.map((option: any, i: number) => (
              <button
                disabled={!wights.includes(option.id)}
                onClick={() => {
                  handleFilter(`${options[0].id}:${option.id}`, "wight");
                }}
                key={i}
                className={`w-fit disabled:cursor-not-allowed disabled:opacity-50 text-center cursor-pointer p-1 ${
                  filters?.["wight"]?.includes(`${options[0].id}:${option.id}`)
                    ? "bg-main text-gray-50"
                    : "bg-white text-black"
                } hover:opacity-90 duration-100 text-nowrap shadow-sm text-xs  border  border-black rounded-md`}
              >
                {option.title}
              </button>
            ))}
          </div>
        )}
      </ul>
      {/* <Button
        variant={"ghost"}
        onClick={() => {
          handleReset("color");
          handleReset("wight");
        }}
      >
        RESET
      </Button> */}
    </div>
  );
};

export default SingleVariant;
