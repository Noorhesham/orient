"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useIsLoading } from "../context/LoadingContext";

interface Filters {
  [key: string]: string[];
}

const Box = ({
  text,
  options,
  filter,
  id,
  color,
  single,
}: {
  text: string;
  options?: any[];
  filter: string;
  id?: string;
  color?: boolean;
  single?: boolean;
}) => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [init, setIsInit] = useState(true);

  const t = useTranslations();
  const [filters, setFilters] = useState<Filters>({});
  const { loading, setLoading } = useIsLoading();
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);
  // Parse the existing filters from the URL when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: Filters = {};
    params.forEach((value, key) => {
      newFilters[key] = value.split(",");
      console.log(value, key);
    });
    setFilters(newFilters);
  }, [searchParams]);
  console.log(filters)
  const updateURL = () => {
    startTransition(async () => {
      console.log(window.location.search);
      const params = new URLSearchParams(window.location.search);
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(",")); // Set the new values for each filter
        } else {
          params.delete(key); // Remove the filter if no values are selected
        }
      });
      params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };
  useEffect(() => {
    if (init) return;

    updateURL();
  }, [filters]);

  const handleFilter = (filterValue: string, filterName: string) => {
    setIsInit(false);
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[filterName] || [];
      const isFilterSelected = currentFilters.includes(filterValue);
      const updatedFilters = isFilterSelected
        ? currentFilters.filter((item) => item !== filterValue) // Remove the filter
        : [...currentFilters, filterValue.toString()]; // Add the filter

      return {
        ...prevFilters,
        [filterName]: updatedFilters,
      };
    });
  };
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
  const hasSelectedFilters = !!filters[filter]?.length;

  return (
    <div className="flex  px-5 py-2 lg:py-4 font-medium text-sm bg-white uppercase flex-col">
      <h2 className="text-lg mb-2">{text}</h2>
      <ul className="pb-3 max-h-[54vh] overflow-y-auto flex flex-col gap-2 border-b border-b-gray-400">
        {filter === "category_id" &&
          options?.map((option, i) => (
            <li key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name={filter}
                id={option.id.toString()}
                checked={filters["category_id"]?.includes(option.id.toString()) || false}
                onChange={() => handleFilter(option.id.toString(), "category_id")}
              />
              <label htmlFor={option.id.toString()}>{option.title}</label>
            </li>
          ))}

        {filter !== "tags" &&
          filter !== "category_id" &&
          (color ? (
            <div className="flex flex-wrap lg:grid lg:grid-cols-8 gap-2">
              {options?.map((option, i) => (
                <button
                  key={i}
                  style={{ backgroundColor: `#${option.data}` }}
                  onClick={() => {
                    if (single && !filters[filter]?.includes(`${id}:${option.id}`)) handleReset(filter);
                    handleFilter(`${id}:${option.id}`, filter);
                  }}
                  className={`cursor-pointer  border-2 border-input p-1 px-4 hover:opacity-90 duration-100 ${
                    filters[filter]?.includes(`${id}:${option.id}`) ? "outline-2  outline outline-main" : ""
                  } shadow-sm w-10 h-10 aspect-square rounded-md lg:w-full lg:h-full`}
                ></button>
              ))}
            </div>
          ) : !single ? (
            options?.map((option, i) => (
              <li key={i} className="flex w-full items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={filter}
                  id={option.id.toString()}
                  checked={filters[filter]?.includes(`${id}:${option.id}`) || false}
                  onChange={() => handleFilter(`${id}:${option.id}`, filter)}
                />
                <label htmlFor={option.id.toString()}>{option.title}</label>
              </li>
            ))
          ) : (
            <div className="flex   flex-wrap  items-center gap-2">
              {options?.map((option, i) => (
                <li
                  onClick={() => {
                    if (single && !filters[filter]?.includes(`${id}:${option.id}`)) handleReset(filter);
                    handleFilter(`${id}:${option.id}`, filter);
                  }}
                  key={i}
                  className={`  text-center cursor-pointer p-1 ${
                    filters[filter]?.includes(`${id}:${option.id}`) ? "bg-main text-gray-50" : "bg-white text-black"
                  } hover:opacity-90 duration-100 shadow-sm text-xs  border  border-black rounded-md`}
                >
                  {option.title}
                </li>
              ))}
            </div>
          ))}

        {/* {filter === "tags" && (
          <div className="flex flex-wrap gap-2">
            {options?.map((option, i) => (
              <Button
                onClick={() => handleFilter(option.id, "tags")}
                key={i}
                className={filters["tags"]?.includes(option.id) ? "bg-yellow-100 text-main border-main border" : ""}
                variant="outline"
              >
                {option.title}
              </Button>
            ))}
          </div>
        )} */}
      </ul>
      {!single && hasSelectedFilters && (
        <Button variant={"outline"} className="w-full mt-4" onClick={() => handleReset(filter)}>
          {t("reset")}
        </Button>
      )}
    </div>
  );
};

export default Box;
