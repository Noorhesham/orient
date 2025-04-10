import Link from "next/link";
import React from "react";
import { ArrowDownIcon } from "./Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import cookies from "js-cookie";
const NavLink = ({
  text,
  href,
  subLinks,
  isHome,
}: {
  text: string;
  href?: string;
  subLinks: { text: string; href?: string }[];
  isHome?: boolean;
}) => {
  const locale = cookies.get("NEXT_LOCALE");
  const linkStyles =
    "uppercase hover:opacity-70 duration-150  opacity-100 flex items-center gap-2 font-[400]  font-medium text-sm xl:text-base tracking-wide ";
  if (!subLinks)
    return (
      <Link href={href || "/"} className={linkStyles}>
        {text}
      </Link>
    );
  else
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className={linkStyles}>
          {text} <ArrowDownIcon color={isHome ? "white" : "#E6007E"} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className=" w-full rounded-lg">
          {subLinks.map((link) => (
            <DropdownMenuItem className=" uppercase  rounded-sm" key={link.text}>
              <Link
                className={`${
                  locale === "en" ? "pr-20" : "pl-20"
                }   pl-3  py-2  w-full text-xs hover:opacity-90 duration-150 hover:text-gray-900   lg:text-sm  font-[600] text-black  uppercase`}
                href={link.href || "#"}
              >
                {link.text}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default NavLink;
