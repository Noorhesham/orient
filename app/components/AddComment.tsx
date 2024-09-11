"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { IoMdChatbubbles } from "react-icons/io";
import Paragraph from "./Paragraph";
import ModalCustom from "./ModalCustom";
import FormContainer from "./FormContainer";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Heading from "./Heading";
import Head1 from "./Head1";
import Link from "next/link";
const commentForm = [
  {
    name: "content",
    placeholder: "COMMENT",
  },
  { name: "rating", placeholder: "RATE", rate: true },
];
const AddComment = ({ id }: { id?: string }) => {
  const addComment = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "addComment", body: data, id });
    console.log(res);
    if (res.status === true) {
      toast.success(res.message);
      setError(null);
    }
    if (res.status === false || !res.status) setError(res.message || res.errors);
  };
  const { userSettings } = useAuth();
  return (
    <ModalCustom
      title="ADD A COMMENT"
      content={
        !userSettings ? (
          <Link
            href={`/login?redirect=/product/${id}`}
            className=" text-2xl hover:underline duration-150 py-10 text-main uppercase font-semibold text-center "
          >
            Login First to add product to wishlist .... !
          </Link>
        ) : (
          <div className="flex flex-col items-start px-20">
            <Paragraph description="Share your opinions with others" />
            <FormContainer submit={addComment} formArray={commentForm} schema="commentSchema" />
          </div>
        )
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
