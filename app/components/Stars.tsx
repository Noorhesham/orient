import { StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import MotionItem from "./MotionItem";

const Stars = ({ rating = 5, count }: { rating?: number; count?: number }) => {
  const rateArr = Array.from({ length: rating }, (_, i) => i + 1);
  const t = useTranslations("stars");

  return (
    <div className="flex text-nowrap mt-2 items-center max-w-lg gap-2">
      <div className="flex gap-[0.5px] lg:gap-2">
        {rateArr.map((_, i) => (
          <MotionItem
            key={i}
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, transition: { delay: i * 0.2 } }}
            nohover
          >
            {" "}
            <StarIcon color="#FA8232" fill="#FA8232" size={16} />
          </MotionItem>
        ))}
      </div>
      <p className="font-semibold text-xs md:text-sm">
        {rating} {t("star")}
      </p>
      <p className="text-xs text-muted-foreground md:text-sm">
        {count ? `(${count} ${t("userFeedback")})` : `(${t("noFeedback")})`}
      </p>
      <div></div>
    </div>
  );
};

export default Stars;
