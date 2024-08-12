"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { IoMdChatbubbles } from "react-icons/io";
import Paragraph from "./Paragraph";
import ModalCustom from "./ModalCustom";
import FormContainer from "./FormContainer";
const commentForm = [
  {
    name: "name",
    placeholder: "YOUR NAME",
    type: "text",
  },
  {
    name: "comment",
    placeholder: "COMMENT",
  },
  { name: "rate", placeholder: "RATE", rate: true },
];
const AddComment = () => {
  return (
    <ModalCustom
      title="ADD A COMMENT"
      content={
        <div className="flex flex-col items-start px-20">
          <Paragraph description="Share your opinions with others" />
          <FormContainer formArray={commentForm} schema="commentSchema" />
        </div>
      }
      btn={
        <div className=" uppercase mt-5 flex-col flex gap-2">
          <h2 className=" text-2xl  font-medium my-2">Write a review for this product</h2>
          <Paragraph description="Share your opinions with others" />
          <CustomButton text="ADD COMMENT" icon={<IoMdChatbubbles />} />
        </div>
      }
    />
  );
};

export default AddComment;
