"use client";
import { z, ZodObject, ZodTypeAny } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import CustomForm from "./CustomForm";
import { useTranslations } from "next-intl";
import { Server } from "../main/Server";
import { toast } from "react-toastify";

const generateSchemaFromFields = (fields: any[]): ZodObject<any> => {
  const schemaShape: Record<string, ZodTypeAny> = {};
  console.log(fields);
  fields.forEach((field) => {
    if (!field) return;

    // Country and state handling
    if (field.country) {
      schemaShape[field.countryName] = z.union([z.string(), z.number()]);
      schemaShape[field.stateName] = z.union([z.string(), z.number()]).optional();
      schemaShape[field.cityName] = z.union([z.string(), z.number()]).optional();
      return; // Skip country/state handling from further processing
    }

    let fieldSchema: ZodTypeAny;

    // Determine the schema type based on field properties
    switch (field.type) {
      case "text":
      case "textarea":
        fieldSchema = z.string();
        break;
      case "email":
        fieldSchema = z.string().email(`${field.label} must be a valid email`);
        break;
      case "phoneNumber":
        if (field.returnFullPhone)
          fieldSchema = z.string().min(10, `${field.label || "Phone"} must be a valid phone number`);
        else
          fieldSchema = z.object({
            phone: z.string().min(1, { message: "Phone is required" }),
            country_key: z.string().min(1, { message: "Country is required" }),
          });
        break;
      case "number":
        fieldSchema = z.number().min(0, `${field.label} must be a valid number`);
        break;
      default:
        fieldSchema = z.any(); // Default to any for unknown types
        break;
    }

    // Apply required validation if the field is required
    if (field.required) {
      if (fieldSchema instanceof z.ZodString) {
        // Apply min length for required string-based fields
        fieldSchema = fieldSchema.min(1, `${field.label || field.name} is required`);
      } else if (fieldSchema instanceof z.ZodNumber) {
        // For numbers, refine to ensure it's not null or undefined
        fieldSchema = fieldSchema.refine((val) => val !== null && val !== undefined, {
          message: `${field.label || field.name} is required`,
        });
      }
    } else {
      // Make the field optional if it's not required
      fieldSchema = fieldSchema.optional();
    }

    // Add the field schema to the schemaShape object
    schemaShape[field.name] = fieldSchema;
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
        phone: {
          phone: `${defaultValues?.phone}` || "",
          country_key: defaultValues?.country_key || "",
        },
        avatar: defaultValues?.photo || "",
      } || {},
  });

  const [serverError, setServerError] = useState<string[] | null>(null);
  const [isPending, startTransition] = useTransition();

  console.log(form.getValues("phone"));
  const onSubmit = async (data: z.infer<typeof dynamicSchema>) => {
    startTransition(async () => {
      console.log(data);
      if (server) {
        try {
          const res = await Server({ resourceName: "submitForm", body: data, id: "contact-us" });

          if (res.status) {
            toast.success(res.message);
            form.reset(defaultValues);
          }
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
