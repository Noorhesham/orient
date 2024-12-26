"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { CiCalculator2 } from "react-icons/ci";
import ModalCustom from "./ModalCustom";
import { useGetEntity } from "@/lib/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import Spinner from "./Spinner";
import { useLocale, useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";

const Calculate = ({ btn, id }: { btn?: React.ReactNode; id?: string }) => {
  const { data, isLoading } = useGetEntity("calculate", "calculate");
  const t = useTranslations("Calculate"); // Get translations for this component
  const locale = useLocale();
  const [input, setInput] = React.useState(0);
  const [result, setResult] = React.useState(0);
  const [selected, setSelected] = React.useState<any>(id || null);

  const categories = data?.data?.map((d: any) => d.category);
  const selectedUnit = data?.data?.find((item: any) => item.category.id === selected);
  console.log(categories);

  return (
    <ModalCustom
      title={t("calc")}
      btn={
        btn || (
          <div>
            <div className="cursor-pointer flex gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full md:w-44 sm:w-28 sm:h-28 w-24 h-24 md:h-44 relative">
                  <Image src={"/Ellipse 860.png"} fill className="rounded-full object-cover" alt="" />
                </div>
                <h3 className="text-center sm:text-sm md:text-2xl text-main2 font-[500] mt-4">{t("calcpaint")}</h3>
              </div>
            </div>
          </div>
        )
      }
      desc={result ? `${t("paintUsed")} ${selectedUnit.unit[locale]} ${t("is")}` : ""}
      span={result ? `${result.toFixed(2)} ${selectedUnit.unit[locale]}` : ""}
      functionalbtn={
        <Button
          onClick={() => setResult(input / selectedUnit.space)}
          disabled={!selectedUnit}
          className="hover:bg-white hover:text-main2 border border-main2 text-xs font-medium rounded-full flex items-center gap-2 px-6 bg-main2"
        >
          <CiCalculator2 />
          {t("calculate")}
        </Button>
      }
      content={
        isLoading ? (
          <div className=" absolute left-1/2 -translate-x-1/2 top-1/2  -translate-y-1/2">
            {" "}
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="flex-col gap-4 flex  uppercase lg:py-5 px-5 lg:px-20 mt-5">
              <Label>{t("Choose Quantity")}</Label>
              <Input
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
                placeholder={t("inputPlaceholder")} // Use translation for placeholder
                className="outline-gray-900 placeholder:text-gray-900"
              />
              <Label>{t("Choose Category")}</Label>
              <Select value={selected} onValueChange={(val: any) => setSelected(val)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCategory")} /> {/* Use translation for placeholder */}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t("categoryLabel")}</SelectLabel> {/* Use translation for label */}
                    {categories?.map((c: any, i: number) => (
                      <SelectItem key={i} value={c.id}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      }
    />
  );
};

export default Calculate;
