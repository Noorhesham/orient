"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { CiCalculator2 } from "react-icons/ci";
import ModalCustom from "./ModalCustom";
import { useGetEntity } from "@/lib/queries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import Spinner from "./Spinner";
import { useLocale, useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Server } from "../main/Server";
import { toast } from "react-toastify";

const Calculate = ({ btn, id }: { btn?: React.ReactNode; id?: string }) => {
  const t = useTranslations();
  const locale = useLocale();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data, isLoading } = useGetEntity("calculate", "calculate", "", {
    enabled: isModalOpen,
  });

  // Store width and height as strings.
  const [width, setWidth] = React.useState<string>("");
  const [height, setHeight] = React.useState<string>("");
  const [result, setResult] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<string | null>(id?.toString() || null);

  // Using products for the select list.
  const categories = data?.products?.map((d: any) => d);
  React.useEffect(() => {
    if (id && data?.products) {
      setSelected(id.toString());
    }
  }, [id, data?.products]);

  // Utility function to remove leading zeros.
  const removeLeadingZeros = (value: string) => {
    if (!value) return value;
    const newValue = value.replace(/^0+/, "");
    return newValue === "" ? "0" : newValue;
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = removeLeadingZeros(e.target.value);
    setWidth(val);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = removeLeadingZeros(e.target.value);
    setHeight(val);
  };

  // Calculate and submit the product.
  const handleSubmit = async () => {
    const product = Number(width) * Number(height);

    try {
      const response = await Server({
        resourceName: "calculate-send",
        body: {
          area: product,
          product_id: selected,
        },
      });
      setResult(response.needed);
    } catch (error) {
      console.error("Error sending product to backend:", error);
      toast.error(t("submitError") || "Error submitting calculation.");
    }
  };

  // Disable the button if width, height or category is missing.
  const isDisabled = !width || !height || !selected;

  // Handlers for modal open/close.
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <ModalCustom
      title={t("calc")}
      btn={
        btn || (
          <div onClick={handleModalOpen}>
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
      desc={result ? `${t("paintUsed")}  ${t("is")}` : ""}
      span={result ? `${result} ` : ""}
      functionalbtn={<></>}
      // Pass the modal open/close handlers to ModalCustom
      onOpen={handleModalOpen}
      onClose={handleModalClose}
      content={
        isLoading ? (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 uppercase  px-5 lg:px-20 ">
            <Label>{t("enterDimensions") || "Enter Dimensions"}</Label>
            <div className="flex gap-4">
              <Input
                type="number"
                value={width}
                onChange={handleWidthChange}
                placeholder={t("widthPlaceholder") || "Width"}
                className="outline-gray-900 placeholder:text-gray-900"
              />
              <Input
                type="number"
                value={height}
                onChange={handleHeightChange}
                placeholder={t("heightPlaceholder") || "Height"}
                className="outline-gray-900 placeholder:text-gray-900"
              />
            </div>
            <Label>{t("chooseProduct") || "Choose Category"}</Label>
            <Select value={selected?.toString()} onValueChange={(val: any) => setSelected(val)}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectProduct") || "Select Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className=" max-h-60 overflow-y-scroll">
                  {categories?.map((c: any, i: number) => (
                    <SelectItem key={i} value={c.id.toString()}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={handleSubmit}
                disabled={isDisabled}
                className="hover:bg-white hover:text-main2 border border-main2 text-xs font-medium rounded-full flex items-center gap-2 px-6 bg-main2"
              >
                <CiCalculator2 />
                {t("calculate") || "Calculate & Submit"}
              </Button>
            </div>
          </div>
        )
      }
    />
  );
};

export default Calculate;
