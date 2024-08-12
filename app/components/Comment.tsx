import { format } from "date-fns";
import React from "react";
import Starrating from "./Rate";
import User from "./User";
import Paragraph from "./Paragraph";
const Comment = ({
  rate,
  date,
  text,
  user,
}: {
  rate: number;
  date: any;
  text: string;
  user: { name: string; photo?: string };
}) => {
  return (
    <div className=" border-b border-input py-4 px-8 flex flex-col">
      <div className="flex my-2 items-start flex-col">
        <span className=" text-gray-400 font-semibold text-xs">{format(date, "dd/MM/yyyy")}</span>
        <Starrating MaxRating={5} size={20} defaultRating={rate} />
      </div>
      <User user={user} />
      <Paragraph full description={text} />
    </div>
  );
};

export default Comment;
