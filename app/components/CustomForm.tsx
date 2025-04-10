import React, { ReactNode, useEffect, useState, useTransition } from "react";
import FormSelect from "./FormSelect";
import FormInput from "./FormInput";
import { Form } from "@/components/ui/form";
import SubmitButton from "./SubmitButton";
import MyLink from "./MyLink";
import CustomButton from "./CustomButton";
import { cn } from "@/lib/utils";
import Head1 from "./Head1";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import CountriesInput from "./CountriesInput";
import { createPortal } from "react-dom";
export interface CustomFormProps {
  inputs: InputProps[];
  src?: string;
  serverError?: string[] | string | null;
  title?: string;
  noimg?: boolean;
  text?: string;
  onSubmit?: any;
  id?: string;
  form: any;
  titles?: string[];
  isPending?: boolean;
  localSubmit?: any;
  children?: ReactNode;
  btnText?: string;
  link?: string;
  linkText?: string;
  disabled?: boolean;
  btnStyles?: string;
  cancel?: any;
  notbtn?: any;
}
export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  label?: string;
  id?: string;
  options?: any[];
  select?: boolean;
  removeOp?: any;
  selected?: any;
  defaultValue?: any;
  phone?: boolean;
  switchToggle?: boolean;
  label2?: string;
  date?: boolean;
  password?: boolean;
  cityName?: string;
  children?: ReactNode;
  noProgress?: boolean;
  area?: boolean;
  country?: boolean;
  returnFullPhone?: boolean;
  countryName?: string | any;
  stateName?: string | any;
}
const CustomForm = ({
  inputs,
  serverError,
  title,
  btnText,
  form,
  onSubmit,
  children,
  linkText,
  link,
  disabled,
  isPending,
  btnStyles,
  cancel,
  notbtn = false,
}: CustomFormProps) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form className="flex  uppercase w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col">
          {title && <Head1 className=" text-lg text-center" text={title} />}
          <div className="flex lg:pt-4 flex-col gap-2">
            {inputs.map((input, i) =>
              input?.select ? (
                <FormSelect placeholder={input.placeholder} key={i} {...input} />
              ) : input.country ? (
                <CountriesInput
                  key={i}
                  label={input.label}
                  cityName={input.cityName}
                  countryName={input.countryName}
                  stateName={input.stateName}
                />
              ) : (
                <FormInput
                  returnFullPhone={input?.returnFullPhone}
                  disabled={disabled}
                  placeholder={input.label}
                  label2={input?.label2 || ""}
                  switchToggle={input?.switchToggle}
                  phone={input.phone || false}
                  key={i}
                  
                  {...input}
                />
              )
            )}
          </div>
          {children}
          <div className={cn("flex gap-2 mt-5 items-center", { "self-center w-full lg:w-[60%]": cancel })}>
            <div className={`${btnStyles} flex-1 flex items-center flex-col`}>
              {link && linkText && <MyLink link={link} text={linkText} />}

              <div className="w-full">
                <SubmitButton text={btnText || t("Submit")} isPending={isPending || disabled} />
              </div>
            </div>
            {cancel && (
              <DialogClose className=" mx-auto flex-1 w-full flex  items-center gap-5  ">
                {
                  <Button
                    type="button"
                    className="text-xs flex-grow mr-auto self-end mx-0  hover:bg-main2 hover:text-white rounded-full flex  items-center gap-2 px-6  border border-main2 bg-white text-main2"
                  >
                    {t("cancel")}
                  </Button>
                }
              </DialogClose>
            )}
          </div>
          <div className=" mt-2">
            {" "}
            {Array.isArray(serverError)
              ? serverError?.map((err: any, i: number) => (
                  <p key={i} className="text-red-500 text-center text-sm">
                    {err}
                  </p>
                ))
              : serverError && <p className="text-red-500 text-center text-sm">{serverError}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CustomForm;
