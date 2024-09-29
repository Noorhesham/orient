"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const syncUrls = ({ setVolumes, setColors, variations, filters }: any) => {
  const existingVariationsVloume: any[] = [];
  const existingVariationsColor: any[] = [];
  variations?.forEach((variation: any) => {
    const foundVolume = variation.find(
      (varr: any) =>
        varr.attribute_id == filters["color"]?.[0]?.split(":")[0] &&
        varr.option_id == filters["color"]?.[0]?.split(":")[1]
    );
    const foundColor = variation.find(
      (varr: any) =>
        varr.attribute_id == filters["volume"]?.[0]?.split(":")[0] &&
        varr.option_id == filters["volume"]?.[0]?.split(":")[1]
    );
    if (foundColor) existingVariationsColor.push(variation[0].option_id);
    if (foundVolume) existingVariationsVloume.push(variation[1].option_id);
    setVolumes(existingVariationsVloume);
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
  const child = variations.filter((variation: any) => {
    return variation.find((varr: any) => varr.product_id === childId);
  })[0];
  console.log(child);
  const [filters, setFilters] = React.useState<{ [key: string]: string[] }>(
    ischild
      ? {
          ["color"]: [`${[child[0].attribute_id]}:${[child[0].option_id]}`],
          ["volume"]: [`${[child[1]?.attribute_id]}:${[child[1]?.option_id]}`],
        }
      : {
          ["color"]: [`${[colorOptions[0]?.id]}:${[colorOptions[0]?.options[0]?.id]}`],
          ["volume"]: [`${[options[0]?.id]}:${[options[0]?.options[0]?.id]}`],
        }
  );
  const [colors, setColors] = React.useState<string[]>(colorOptions[0]?.options);
  const [volumes, setVolumes] = React.useState<string[]>(options[0]?.options);
  const router = useRouter();
  console.log(filters, options);
  const handleFilter = (filterValue: string, filterName: string) => {
    setFilters((prevFilters: any) => {
      return {
        ...prevFilters,
        [filterName]: [filterValue],
      };
    });
  };
  useEffect(() => {
    if (ischild) {
      syncUrls({ setVolumes, setColors, variations, filters });
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
        router.push(`/product/${parentId}?${params.toString()}`, { scroll: false });
      } else if (filters["color"] && filters["volume"]) {
        router.push(`?${params.toString()}`, { scroll: false });
      }
    };

    updateURL();
  }, [filters, router, ischild, parentId]);
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
    if (params.get("color") && params.get("volume") && !ischild) setFilters(newFilters);
  }, []);

  useEffect(() => {
    if (!ischild) return;
    syncUrls({ setVolumes, setColors, variations, filters });
  }, []);
  const t = useTranslations();
  console.log(filters);
  return (
    <div className="flex w-full px-5 py-2 lg:py-4 font-medium text-sm bg-white uppercase flex-col">
      <ul className="pb-3 w-full flex flex-col gap-2 border-b border-b-gray-400">
        {colorOptions?.[0] && (
          <div className="flex w-full items-center gap-2">
            {" "}
            <h2 className="text-base  mb-2">{t('colors')}</h2>
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
          <div className="flex items-center gap-2">
            <h2 className="text-base  mb-2">{t("volume")}</h2>
            {options[0].options?.map((option: any, i: number) => (
              <button
                disabled={!volumes.includes(option.id)}
                onClick={() => {
                  handleFilter(`${options[0].id}:${option.id}`, "volume");
                }}
                key={i}
                className={`w-8 disabled:cursor-not-allowed disabled:opacity-50 text-center cursor-pointer p-1 ${
                  filters?.["volume"]?.includes(`${options[0].id}:${option.id}`)
                    ? "bg-main text-gray-50"
                    : "bg-white text-black"
                } hover:opacity-90 duration-100 shadow-sm text-xs  border  border-black rounded-md`}
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
          handleReset("volume");
        }}
      >
        RESET
      </Button> */}
    </div>
  );
};

export default SingleVariant;
