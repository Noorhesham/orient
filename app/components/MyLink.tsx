import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const MyLink = ({ text, link, color }: { text: string; link: string; color?: string }) => {
  return (
    <Link
      href={link}
      className={cn(
        " my-2  ml-auto mt-auto font-semibold text-xs hover:underline duration-150",
        color ? `${color}` : "text-main2/95 "
      )}
    >
      {text}
    </Link>
  );
};

export default MyLink;
