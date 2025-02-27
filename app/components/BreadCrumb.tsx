"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaHome } from "react-icons/fa";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useLocale, useTranslations } from "next-intl";

const BreadCrumb = ({ linksCustom }: { linksCustom?: { href: string; text: string }[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations("breadcrumb");
  const locale = useLocale();
  const links: any = linksCustom || pathName.split("/").filter((link) => !["ar", "en"].includes(link));
  console.log(links);
  return (
    <Breadcrumb className=" py-3 bg-gradient-to-r from-[#ff007b2f] via-white to-[#00a2ff3f]">
      <MaxWidthWrapper noPadding>
        <BreadcrumbList>
          {links.map((link: any, i: number) => {
            const isLast = i === links.length - 1;
            return (
              <div className="flex items-center" key={i}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className={`${
                      global?.window?.location.pathname === `/${link}`
                        ? " text-main  hover:text-pink-400 duration-150"
                        : " text-[#191c1f86]"
                    } flex uppercase items-center gap-2`}
                    href={`${link.href === "" || link.href === "/" ? "/" : `/${link.href || link}`}`}
                  >
                    {i === 0 && <FaHome />}
                    {/* Translate breadcrumb text */}
                    {link.text ? link.text : link === "" ? t("home") : t(link.replace("-", " ").toLowerCase())}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className={`${locale === "ar" && "rotate-180"}`} />}
              </div>
            );
          })}
        </BreadcrumbList>
      </MaxWidthWrapper>
    </Breadcrumb>
  );
};

export default BreadCrumb;
