"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Filters {
  [key: string]: string[];
}

const Box = ({ text, options, filter }: { text: string; options?: any[]; filter: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({});

  // Parse the existing filters from the URL when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: Filters = {};
    params.forEach((value, key) => {
      newFilters[key] = value.split(",");
    });
    setFilters(newFilters);
  }, []);

  // Update URL when filters change
  const updateURL = () => {
    const params = new URLSearchParams(window.location.search);

    // Update the params with the current filters state
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(",")); // Set the new values for each filter
      } else {
        params.delete(key); // Remove the filter if no values are selected
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };
  useEffect(() => {
    updateURL();
  }, [filters]);

  const handleFilter = (filterValue: string, filterName: string) => {
    setFilters((prevFilters) => {
      const currentFilters = prevFilters[filterName] || [];
      const isFilterSelected = currentFilters.includes(filterValue);

      // Toggle the filter on/off
      const updatedFilters = isFilterSelected
        ? currentFilters.filter((item) => item !== filterValue) // Remove the filter
        : [...currentFilters, filterValue]; // Add the filter

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

  return (
    <div className="flex px-5 py-2 lg:py-4 font-medium text-sm bg-white uppercase flex-col">
      <h2 className="text-lg mb-2">{text}</h2>
      <ul className="pb-3 flex flex-col gap-2 border-b border-b-gray-400">
        {filter !== "colors" &&
          filter !== "tags" &&
          options?.map((option, i) => (
            <li
              onClick={() => handleFilter(option, "category")}
              key={i}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name={filter}
                id={option}
                checked={filters["category"]?.includes(option) || false}
                onChange={() => handleFilter(option, "category")}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        {filter === "colors" && (
          <div className="flex flex-wrap lg:grid lg:grid-cols-8 gap-2">
            {options?.map((option, i) => (
              <li
                style={{ backgroundColor: option }}
                onClick={() => handleFilter(option, "colors")}
                key={i}
                className={`cursor-pointer p-1 hover:opacity-90 duration-100 ${
                  filters["colors"]?.includes(option) ? "border-2 border-main" : ""
                } shadow-sm w-10 h-10 aspect-square rounded-md lg:w-full lg:h-full`}
              ></li>
            ))}
          </div>
        )}
        {filter === "tags" && (
          <div className="flex flex-wrap gap-2">
            {options?.map((option, i) => (
              <Button
                onClick={() => handleFilter(option, "tags")}
                key={i}
                className={filters["tags"]?.includes(option) ? "bg-yellow-100 text-main border-main border" : ""}
                variant="outline"
              >
                {option}
              </Button>
            ))}
          </div>
        )}
      </ul>
      <Button variant={"outline"} className="w-full mt-4" onClick={() => handleReset(filter)}>
        RESET
      </Button>
    </div>
  );
};

export default Box;
