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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const AddComment = ({ id }: { id?: string }) => {
  const t = useTranslations("addComment"); // Use translations for addComment scope
  const queryClient = useQueryClient();
  const router = useRouter();

  const addComment = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "addComment", body: data, id });
    console.log(res);
    if (res.status === true) {
      toast.success(res.message);
      setError(null);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [`reviews-${id}`] });
    }
    if (res.status === false || !res.status) setError(res.message || res.errors);
  };

  const { userSettings } = useAuth();

  const commentForm = [
    { name: "content", placeholder: t("commentPlaceholder") },
    { name: "rating", placeholder: t("ratePlaceholder"), rate: true, type: "number" },
  ];

  return (
    <ModalCustom
      title={t("title")}
      className="!items-center "
      content={
        !userSettings ? (
          <Link
            href={`/login?redirect=/product/${id}`}
            className="text-xl  mt-5 relative text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2  lg:top-24  w-fit hover:underline duration-150 py-10 text-main uppercase font-semibold text-center"
          >
            {t("loginPrompt")}
          </Link>
        ) : (
          <div className="flex flex-col items-start lg:px-10">
            <Paragraph description={t("description")} />
            <FormContainer submit={addComment} formArray={commentForm} />
          </div>
        )
      }
      btn={
        <div className="uppercase lg:mt-5 flex-col flex !gap-6">
          <h2 className="text-2xl font-medium my-2">{t("heading")}</h2>
          <Paragraph className="" description={t("description")} />
          <CustomButton text={t("buttonText")} icon={<IoMdChatbubbles />} />
        </div>
      }
    />
  );
};

export default AddComment;
