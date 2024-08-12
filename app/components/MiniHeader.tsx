import React from "react";

const MiniHeader = ({heading,date,status}:{heading:string,date:string,status:string}) => {
  return (
    <div className=" text-center flex flex-col items-center">
      <h3 className=" text-2xl text-main font-medium">{heading}</h3>
      <div className=" mt-2">
        <h4 className=" text-lg font-bold text-main">
          TRACKING NUMBER : <span className=" text-black">{date}</span>
        </h4>
      </div>
      <p className=" text-green-500 font-semibold">{status}</p>
    </div>
  );
};

export default MiniHeader;
