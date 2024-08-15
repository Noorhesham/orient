import { StarIcon } from "lucide-react";
import React from "react";

const Stars = () => {
  return (
    <div className=" flex  text-nowrap mt-2 items-center max-w-lg gap-2">
      <div className="flex gap-[0.5px] lg:gap-2">
        <StarIcon color="#FA8232" fill="#FA8232" size={16} />
        <StarIcon color="#FA8232" fill="#FA8232" size={16} />
        <StarIcon color="#FA8232" fill="#FA8232" size={16} />
        <StarIcon color="#FA8232" fill="#FA8232" size={16} />
        <StarIcon color="#FA8232" fill="#FA8232" size={16} />
      </div>
      <p className=" font-semibold text-xs md:text-sm">4.7 star rating</p>
      <p className=" text-xs text-muted-foreground md:text-sm">{`(21,432 User feedback)`}</p>
      <div></div>
    </div>
  );
};

export default Stars;
