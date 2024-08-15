import React from "react";
import Starrating from "./Rate";
import { Progress } from "@/components/ui/progress";

const Reviews = () => {
  return (
    <section className=" flex sm:flex-row flex-col flex-wrap justify-between mt-5 lg:mt-10">
      <div className="flex mb-2 flex-grow items-start flex-col">
        <h2 className=" font-medium">REVIEWS</h2>
        <h3 className=" font-bold text-4xl mt-2">4.7</h3>
        <Starrating size={25} color="#FCAB30" defaultRating={4.5} MaxRating={5} change={false} />
        <p className=" text-xs">{`(578 REVIEWS)`}</p>
      </div>
      <div className="flex flex-col mt-2  gap-4 flex-grow flex-[50%]">
        <div className="  font-medium flex items-center gap-1">
          <p className=" text-nowrap">5 stars</p>
          <Progress color="#FCAB30" value={80} />
          <p className=" basis-[3rem] "> 488</p>
        </div>
        <div className="  font-medium flex items-center gap-1">
          <p className=" text-nowrap">4 stars</p>
          <Progress color="#FCAB30" value={30} />
          <p className=" basis-[3rem] flex-grow">74</p>
        </div>{" "}
        <div className="  font-medium flex items-center gap-1">
          <p className=" text-nowrap">3 stars</p>
          <Progress   nocustomcol={false} color="#FCAB30" value={30} />
          <p className=" basis-[3rem] flex-grow">74</p>
        </div>
        <div className="  font-medium flex items-center gap-1">
          <p className=" text-nowrap">2 stars</p>
          <Progress color="#FCAB30" value={5} />
          <p className=" basis-[3rem] flex-grow">12</p>
        </div>
        <div className="  font-medium flex items-center gap-1">
          <p className=" text-nowrap">1 stars</p>
          <Progress color="#FCAB30" value={0} />
          <p className=" basis-[3rem] flex-grow">488</p>
        </div>
      </div>
  
    </section>
  );
};

export default Reviews;
