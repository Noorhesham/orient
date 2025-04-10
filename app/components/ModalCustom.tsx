"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // import VisuallyHidden for accessibility

const ModalCustom = ({
  btn,
  content,
  title,
  desc,
  functionalbtn,
  span,
  cancelBtn = false,
  isOpen,
  btnText,
  isPending,
  btnStyles,
  className,
}: {
  btn: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  desc?: string;
  functionalbtn?: React.ReactNode;
  span?: string;
  cancelBtn?: boolean;
  isOpen?: boolean;
  btnText?: string;
  isPending?: boolean;
  btnStyles?: boolean;
  form?: boolean;
  className?: string;
}) => {
  const [open, setOpen] = React.useState(isOpen || false);
  const t = useTranslations();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent  className={`${className} max-w-[90%] lg:max-w-4xl py-8 lg:py-12 overflow-y-auto max-h-[80vh] sm:rounded-[1.8rem]`}>
        <DialogHeader className="">
          {title ? (
            <DialogTitle className="text-xl lg:text-3xl capitalize mt-10 lg:mt-8 text-center text-main2">{title}</DialogTitle>
          ) : (
            <VisuallyHidden>
              <DialogTitle>Untitled</DialogTitle> {/* Hidden but accessible title */}
            </VisuallyHidden>
          )}
          {desc && <DialogDescription className="text-center mt-2">{desc}</DialogDescription>}
        </DialogHeader>
        <div className={` ${title && "mt-5 lg:mt-10"} ${className||""} w-full`}>{content}</div>

        {(cancelBtn || functionalbtn || desc) && (
          <DialogFooter className="pb-10 flex items-center sm:flex-col">
            <div className="flex gap-2 items-center">
              {functionalbtn && functionalbtn}
              <DialogClose className="mx-auto flex items-center gap-5">
                {cancelBtn && (
                  <Button
                    type="button"
                    className="text-xs flex-grow mr-auto self-end hover:bg-main2 hover:text-white rounded-full flex items-center gap-2 px-6 border border-main2 bg-white text-main2"
                  >
                    {t("cancel")}
                  </Button>
                )}
              </DialogClose>
            </div>
            {desc && (
              <h2 className=" text-base lg:text-xl mx-auto text-center my-4 lg:mt-10 gap-1 flex flex-col lg:flex-row items-center">
                {desc} <span className="text-main text-base lg:text-2xl font-bold">{span}</span>
              </h2>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCustom;
