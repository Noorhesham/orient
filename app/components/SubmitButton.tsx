import { Button } from "@/components/ui/button";
import React from "react";
import Spinner from "./Spinner";
import { CheckCircleIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const SubmitButton = ({ text, isPending, btnStyles }: { text: string; isPending?: boolean; btnStyles?: String }) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="button-container-2  relative rounded-full">
      {isPending ? (
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {" "}
          <Spinner />
        </div>
      ) : (
        <span style={locale === "ar" ? { right: "20px" }:{}} className="mas  text-nowrap flex items-center gap-2">
          {text == t("SAVE CHANGES") && <CheckCircleIcon />}
          {text}
        </span>
      )}
      <button type="submit" className={` px-8 flex items-center gap-2 rounded-full `}>
        {isPending ? (
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {" "}
            <Spinner />
          </div>
        ) : (
          <div className=" flex items-center gap-2 text-nowrap">
            {text == t("SAVE CHANGES") && <CheckCircleIcon />}
            {text}
          </div>
        )}
      </button>
    </div>
  );
};

export default SubmitButton;
