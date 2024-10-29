"use client";
import { HeadPhones, Location, Phone } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import { FaMailBulk } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MotionContainer from "./MotionContainer";

const Address = ({className}:{className?:String}) => {
  const t = useTranslations();
  const locale = useLocale();

  const { generalSettings, loading } = useAuth();
  if (loading)
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  const { company_contacts } = generalSettings;
  const { branches } = company_contacts;

  const local = cookies.get("NEXT_LOCALE");
  const address = company_contacts.address?.[local || "en"];
  console.log(address);
  return (
    <MotionContainer serverAnimate className={cn(" flex-col gap-2 flex ", className)}>
      {branches.map((branch: any, i: number) => (
        <IconWidget
          key={i}
          paragraph={branch.co_info_address[locale]}
          header={branch.title[locale]}
          icon={<Location />}
        />
      ))}
      <IconWidget
        link={`tel:${company_contacts.phone}`}
        paragraph={`${t("address.hotline")}  ${company_contacts.phone}`}
        header={t("address.phone")}
        icon={<Phone />}
      />

      <IconWidget
        link={`mailto:${company_contacts.email || "info@orient-paints.com"}`}
        paragraph="info@orient-paints.com"
        header={t("address.email")}
        icon={<FaMailBulk className=" text-main" />}
      />
    </MotionContainer>
  );
};

export default Address;
