import { StarIcon } from "lucide-react";
import React from "react";

const Stars = ({ rating = 5 ,count}: { rating?: number,count?:number }) => {
  const rateArr = Array.from({ length: rating }, (_, i) => i + 1);
  return (
    <div className=" flex  text-nowrap mt-2 items-center max-w-lg gap-2">
      <div className="flex gap-[0.5px] lg:gap-2">
        {rateArr.map((_, i) => (
          <StarIcon key={i} color="#FA8232" fill="#FA8232" size={16} />
        ))}
      </div>
      <p className=" font-semibold text-xs md:text-sm">{rating} star rating</p>
      <p className=" text-xs text-muted-foreground md:text-sm">{`(${count||"No"} User feedback${!count?' Yet':""})`}</p>
      <div></div>
    </div>
  );
};

export default Stars;
