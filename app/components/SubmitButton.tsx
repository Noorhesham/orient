import { Button } from "@/components/ui/button";
import React from "react";
import Spinner from "./Spinner";
import { CheckCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const SubmitButton = ({ text, isPending, btnStyles }: { text: string; isPending?: boolean; btnStyles?: String }) => {
  const t = useTranslations();
  return (
    <div className="button-container-2  relative rounded-full">
      {isPending ? (
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {" "}
          <Spinner />
        </div>
      ) : (
        <span className="mas flex items-center gap-2">
          {text == t("SAVE CHANGES") && <CheckCircleIcon />}
          {text}
        </span>
      )}
      <button type="submit" className={` px-8 flex items-center gap-2 rounded-full `}>
        {text == t("SAVE CHANGES") && <CheckCircleIcon />}
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
