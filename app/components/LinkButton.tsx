import Link from "next/link";
import React from "react";
import { ArrowRight } from "./Icons";
import { cookies } from "next/headers";

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  const locale = cookies().get("NEXT_LOCALE")?.value;
  return (
    <div>
      <button
        className={`hover:shadow-sm ${
          locale === "ar" ? "flex-row-reverse" : ""
        } hover:shadow-main duration-150 hover:translate-x-5 group bg-transparent flex items-center gap-2 font-semibold text-main rounded-full border-2 border-main py-3 px-6`}
      >
        <Link href={href}>{text}</Link>
        <ArrowRight />
      </button>
    </div>
  );
};

export default LinkButton;
