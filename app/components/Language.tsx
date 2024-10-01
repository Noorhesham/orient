"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { MdOutlineLanguage } from "react-icons/md";
import cookies from "js-cookie";
import { Server } from "../main/Server";
import { useDevice } from "../context/DeviceContext";

const Language = () => {
  const [isPending, startTransition] = useTransition();
  const { deviceInfo } = useDevice();
  const router = useRouter();
  const currentLocale = useLocale();
  const pathName = usePathname();
  const t = useTranslations();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    if (value === currentLocale) return;
    startTransition(async () => {
      const newPathName = pathName.replace(`/${currentLocale}`, `/${value}`);
      router.push(newPathName);
      cookies.set("NEXT_LOCALE", value);

      // Trigger backend request on language change
      await fetch("/api/revalidate-all", {
        method: "POST",
      });

      const res = await Server({
        resourceName: "languageUpdate",
        body: {
          key: "language",
          value: cookies.get("NEXT_LOCALE"),
          device_info: deviceInfo,
          action: "set",
          default: "en",
        },
      });

      router.refresh();
    });
  };

  useEffect(() => {
    // Check if it's the first time the app is loaded
    const isFirstLoad = localStorage.getItem("langChangeRequestSent");

    console.log(isFirstLoad, currentLocale);

    if (!isFirstLoad || isFirstLoad !== currentLocale) {
      handleSelect(currentLocale);
      localStorage.setItem("langChangeRequestSent", currentLocale);
    }
  }, []);

  return (
    <Select disabled={isPending} defaultValue={currentLocale} onValueChange={handleSelect}>
      <SelectTrigger className="max-w-[140px] flex gap-2 items-center lg:ml-5 text-sm bg-transparent border-none outline-none">
        <MdOutlineLanguage className="w-5 h-5" />
        <SelectValue placeholder={t("languageSwitcher.selectLanguage")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select a language</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Language;
