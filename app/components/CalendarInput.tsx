"use client";
import React from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarProps } from "./FormInput";
import { useLocale, useTranslations } from "next-intl";

const CalendarInput = ({ control }: CalendarProps) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <FormField
      control={control}
      name="birth_day"
      render={({ field }) => {
        return (
          <FormItem dir={locale === "ar" ? "rtl" : "ltr"} className="flex flex-col">
            {/* <FormLabel className={locale === "ar" ? "text-right" : "text-left"}>{t("birth_day")}</FormLabel> */}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                  >
                    {field.value ? format(field.value, "PPP") : <span>{t("pick_a_date")}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent sideOffset={-40} className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  fromYear={1950}
                  toYear={new Date().getFullYear()}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {/* <FormDescription className={locale === "ar" ? "text-right" : "text-left"}>
              {t("birth_day_description")}
            </FormDescription> */}
          </FormItem>
        );
      }}
    />
  );
};

export default CalendarInput;
