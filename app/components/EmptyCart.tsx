import Image from "next/image";
import React from "react";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const EmptyCart = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 relative">
        <Image src="/complete.svg" alt="success" fill />
      </div>
      <Heading
        subText=""
        mainText={t("cart_empty_title")}
        className="text-main uppercase my-2 text-xl lg:text-2xl font-semibold"
      />
      <Paragraph description={t("cart_empty_desc")} />
      <div className="flex items-center gap-2">
        <Link href="/shop">
          <Button className="rounded-full">{t("go_to_shop")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
