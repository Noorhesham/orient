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

const Delete = ({ entityName, id, key }: { entityName: string; id: string; key: string }) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div>
      <ModalCustom
        btn={<CustomButton backgroundColor="dark" text="DELETE" reverse />}
        content={
          <div className=" flex gap-5 flex-col items-center">
            <Head1 text="Are you sure you want to delete this?" text2="" />
            <Paragraph description="This action cannot be undone" />
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
                {isPending ? <Spinner /> : "DELETE"}
              </Button>
              <DialogClose>
                <Button>CANCEL</Button>
              </DialogClose>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Delete;
