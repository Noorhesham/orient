"use client";
import { z, ZodObject, ZodTypeAny } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import CustomForm from "./CustomForm";
import { useTranslations } from "next-intl";
import { Server } from "../main/Server";
import { toast } from "react-toastify";

// Function to dynamically generate schema from fields
const generateSchemaFromFields = (fields: any[]): ZodObject<any> => {
  const schemaShape: Record<string, ZodTypeAny> = {};
  console.log(fields);
  fields.forEach((field) => {
    if (!field) return;

    switch (field.type) {
      case "text":
        schemaShape[field.name] = z.string().min(1, `${field.label} is required`);
        break;
      case "email":
        schemaShape[field.name] = z.string().email(`${field.label} must be a valid email`);
        break;
      case "textarea":
        schemaShape[field.name] = z.string().min(1, `${field.label} is required`);
        break;
      case "phoneNumber":
        schemaShape[field.name] = z.string().min(10, `${field.label} must be a valid phone number`);
        break;
      case "number":
        schemaShape[field.name] = z.number().min(0, `${field.label} must be a valid number`);
        break;
      // Add more cases for different field types as needed
      default:
        schemaShape[field.name] = z.string().optional(); // Default fallback
        break;
    }
  });

  return z.object(schemaShape);
};

interface Formcontainer {
  formArray: any[];
  title?: string;
  cancel?: any;
  btnText?: string;
  btnStyles?: string;
  defaultValues?: any;
  submit?: any;
  server?: boolean;
  children?: React.ReactNode;
}
const FormContainer: React.FC<Formcontainer> = ({
  formArray,
  title,
  cancel,
  btnText,
  btnStyles,
  defaultValues,
  children,
  submit,
  server,
}) => {
  // Generate the schema dynamically
  const dynamicSchema = generateSchemaFromFields(formArray);
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(dynamicSchema),
    mode: "onChange",
    defaultValues:
      {
        ...defaultValues,
        birth_day: defaultValues?.birthday || "",
        phone: ` ${defaultValues?.country_key}${defaultValues?.phone}` || "",
        avatar: defaultValues?.photo || "",
      } || {},
  });

  const [serverError, setServerError] = useState<string[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof dynamicSchema>) => {
    startTransition(async () => {
      console.log(data);
      if (server) {
        try {
          const res = await Server({ resourceName: "submitForm", body: data, id: "contact-us" });
          console.log(res)
          if (res.status) toast.success(res.message);
          if (!res.status) setServerError(res.errors);
        } catch (error) {
          console.log(error);
        }
      } else if (submit) {
        submit(data, setServerError);
      }
    });
  };

  return (
    <CustomForm
      serverError={serverError}
      btnText={btnText || t("Submit")}
      form={form}
      isPending={isPending}
      cancel={cancel}
      title={title || ""}
      btnStyles={btnStyles || "w-[40%] mr-auto "}
      inputs={formArray}
      onSubmit={onSubmit}
    >
      {children}
    </CustomForm>
  );
};
export default FormContainer;
