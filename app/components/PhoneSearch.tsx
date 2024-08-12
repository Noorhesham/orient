"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { PhoneProps } from "./FormInput";
import cookies from "js-cookie";
import ar from "react-phone-input-2/lang/ar.json";
const PhoneSearch = ({ onChange }: PhoneProps) => {
  const lang = cookies.get("NEXT_LOCALE");
  return (
    <PhoneInput
      enableSearch
      localization={lang === "ar" ? ar : undefined}
      excludeCountries={["il"]}
      searchStyle={{ width: "80%" }}
      country="eg"
      onChange={onChange}
      placeholder="Enter phone number"
      searchPlaceholder="Search"
      inputProps={{ style: { padding: "0.75rem 0.75rem", outline: "#E6007E", boxShadow: "0 0 0 1px #e4e4e7" } }}
    />
  );
};

export default PhoneSearch;
