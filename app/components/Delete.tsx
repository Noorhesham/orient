"use client";
import React, { useTransition } from "react";
import ModalCustom from "./ModalCustom";
import CustomButton from "./CustomButton";
import Heading from "./Heading";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import Head1 from "./Head1";
import Paragraph from "./Paragraph";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Delete = ({ entityName, id, key }: { entityName: string; id: string; key: string }) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();
  return (
    <div>
      <ModalCustom
        btn={<CustomButton backgroundColor="dark" text={t("delete")} reverse />}
        content={
          <div className=" flex gap-5 flex-col items-center">
            <Head1 text={t("deletedesc")} text2="" />
            <Paragraph description={t("deletedesc2")} />
            <div className=" flex items-center gap-2">
              <Button
                onClick={async () => {
                  startTransition(async () => {
                    const res = await Server({ resourceName: "deleteEntity", entityName, id });
                    if (res.status) {
                      toast.success(res.message);
                      queryClient.invalidateQueries({ queryKey: [key] });
                      router.refresh();
                    } else toast.error(res.message);
                  });
                }}
              >
                {isPending ? <Spinner /> : t("delete")}
              </Button>
              <DialogClose>
                <Button>{t('cancel')}</Button>
              </DialogClose>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Delete;
