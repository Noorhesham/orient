"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface ColorOption {
  id: string;
  data: string;
}

interface Colors {
  id: string;
  options: ColorOption[];
}

interface SizeOption {
  title: string;
}

interface VariantsProps {
  colors: Colors;
  optionsSize?: SizeOption[];
}

const Variants: React.FC<VariantsProps> = ({ colors, optionsSize }) => {
  const [attributes, setAttributes] = React.useState<Record<string, string | null>[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    attributes.forEach((attribute) => {
      if (attribute[colors.id]) {
        params.append("attributes", `${JSON.stringify({ attributes })}`);
      }
    });
    router.push(`?${params.toString()}`);
  }, [attributes]);
  return (
    <>
      <div className="flex items-center gap-3 py-2 lg:py-5 flex-col">
        <div className="grid grid-cols-4 lg:grid-cols-7 items-start lg:items-center w-full">
          <h2 className="col-span-1 lg:col-span-2 text-nowrap text-sm text-black font-medium">COLOURS :</h2>

          <div className="flex flex-wrap lg:grid lg:grid-cols-8 gap-2">
            {options?.map((option, i) => (
              <li
                key={i}
                style={{ backgroundColor: `#${option.data}` }}
                onClick={() => handleFilter(`${id}:${option.id}`, filter)}
                className={`cursor-pointer p-1 hover:opacity-90 duration-100 ${
                  filters[filter]?.includes(`${id}:${option.id}`) ? "border-2 border-main" : ""
                } shadow-sm w-10 h-10 aspect-square rounded-md lg:w-full lg:h-full`}
              ></li>
            ))}
          </div>
        </div>
      </div>
      <div className="flex mr-auto mt-2 items-center gap-2 pb-6 lg:border-b border-input">
        <h2 className="text-nowrap text-sm text-black font-medium">SIZE :</h2>
        <ul className="flex xl:flex-nowrap flex-wrap gap-3">
          {optionsSize?.map((option, i) => (
            <li
              key={i}
              className={`w-8 text-center cursor-pointer p-1 hover:opacity-90 duration-100 shadow-sm text-xs text-black border bg-white border-black rounded-md`}
            >
              {option.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Variants;
