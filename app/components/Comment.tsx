import { format } from "date-fns";
import React from "react";
import Starrating from "./Rate";
import User from "./User";
import Paragraph from "./Paragraph";
const Comment = ({
  rating,
  date,
  content,
  user,
  id,
  user_did_buy,
}: {
  rating: number;
  date: any;
  content: string;
  user: { name: string; avatar?: string };
  id?: string;
  user_did_buy: boolean;
}) => {
  return (
    <div className=" border-b border-input py-4   flex flex-col">
      <div className="flex my-2 items-start flex-col">
        <span className=" text-gray-400 font-semibold text-xs">{format(date, "dd/MM/yyyy")}</span>
        <Starrating change={false} MaxRating={5} size={20} defaultRating={rating} />
      </div>
      <User user_did_buy={user_did_buy} user={user} />
      <Paragraph full description={content} />
    </div>
  );
};

export default Comment;
