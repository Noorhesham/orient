import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <div>
      <div className="button-container-2  relative rounded-full">
        <span className="mas  text-nowrap flex items-center gap-2">{text}</span>{" "}
        <Link href={href} className={` px-8 flex items-center gap-2 rounded-full `}>
          <div className=" flex items-center gap-2 text-nowrap">
            {text} <ArrowRight className=" text-white arrowanimation w-4 h-4 ml-2" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LinkButton;
