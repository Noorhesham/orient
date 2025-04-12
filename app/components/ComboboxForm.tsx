"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Spinner from "./Spinner";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function ComboboxForm({
  options,
  name,
  label,
  placeholder,
  onChange,
  disabled,
}: {
  options: any;
  name: string;
  label?: string;
  placeholder: any;
  onChange?: any;
  disabled?: boolean;
}) {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const local = useLocale();
  return (
    <>
      <FormField
        disabled={disabled}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={` relative w-full`}>
            {" "}
            {
              <span
                className={`absolute ${
                  local === "en" ? "right-1 -top-[-13px]" : " top-[28px] right-1"
                }  z-10   font-normal text-red-600`}
              >
                *
              </span>
            }
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className=" w-full" asChild>
                <FormControl className=" w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    style={{ width: "100%" }}
                    className={cn("w-full  px-4  justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? options?.find((language: any) => language.value === field.value)?.label
                      : placeholder || ""}
                    <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" w-full min-w-[200px] ">
                <Command>
                  <CommandInput placeholder=" ابحث ..." className="h-9 " />
                  <CommandList className=" overflow-y-scroll">
                    {disabled ? (
                      <FaSpinner className="h-4 w-4 mx-auto animate-spin text-main" />
                    ) : (
                      <>
                        <CommandEmpty>{t("emptyresults")}</CommandEmpty>

                        <CommandGroup>
                          {options?.map((option: any) => (
                            <CommandItem
                              className=" justify-between"
                              value={option.label}
                              key={option.value}
                              onSelect={() => {
                                form.setValue(name, option.value);
                                form.trigger(name);
                                if (onChange) onChange(option.value);
                                setOpen(false);
                              }}
                            >
                              {option.label}
                              <CheckIcon
                                className={cn(
                                  "mr-auto h-4 w-4",
                                  option.value === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
