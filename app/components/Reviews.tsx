import React from "react";
import Starrating from "./Rate";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";

const Reviews = ({
  review_rate,
  review_count,
  reviews_counts,
}: {
  review_rate: number;
  review_count: number;
  reviews_counts: { [rate: number]: number };
}) => {
  const t = useTranslations();
  return (
    <section id="review" className=" flex sm:flex-row flex-col flex-wrap justify-between mt-5 lg:mt-10">
      <div className="flex mb-2 flex-grow items-start flex-col">
        <h2 className=" font-medium">{t("stars.reviews")}</h2>
        <h3 className=" font-bold text-4xl mt-2">{review_rate}</h3>
        <Starrating size={25} color="#FCAB30" defaultRating={4.5} MaxRating={5} change={false} />
        <p className=" text-xs">
          {review_count ? `(${review_count} ${review_count === 1 ? t("stars.review") : t("stars.reviews")})` : ""}
        </p>
      </div>
      <div className="flex flex-col mt-2  gap-4 flex-grow flex-[50%]">
        {Object.keys(reviews_counts).map((key: any) => (
          <div className="  font-medium flex items-center gap-1" key={key}>
            <p className=" text-nowrap">
              {key} {t("stars.star")}
            </p>
            <Progress color="#FCAB30" value={reviews_counts[key]} />
            <p className=" basis-[3rem] flex-grow">{reviews_counts[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
