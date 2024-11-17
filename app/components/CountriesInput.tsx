"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Server } from "../main/Server";
import ComboboxForm from "./ComboboxForm";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const useGetEntities = ({
  key,
  resourceName,
  queryParams,
  enable = true,
  id,
}: {
  key: string;
  resourceName: "countries" | "states" | "cities";
  queryParams?: URLSearchParams;
  enable?: boolean;
  id?: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [key, queryParams, id],
    queryFn: async () => await Server({ resourceName: resourceName, id, cache: Infinity }),
    enabled: enable,
  });
  return { data, isLoading };
};

const CountriesInput = ({
  countryName,
  stateName,
  cityName,label
}: {
  countryName: string;
  stateName: string;
  cityName?: string;label?:string
}) => {
  const form = useFormContext();
  const t = useTranslations("CountriesInput"); // Get translations for this component
  const { data: countries, isLoading } = useGetEntities({
    resourceName: "countries",
    key: "countries",
  });
  const selectedCountryCode = form.getValues(countryName);
  const { data: states, isLoading: statesLoading } = useGetEntities({
    resourceName: "states",
    id: selectedCountryCode,
    key: "states",
    enable: !!selectedCountryCode,
  });
  const selectedStateCode = form.getValues(stateName);
  const { data: cities, isLoading: citiesLoading } = useGetEntities({
    resourceName: "cities",
    id: selectedStateCode,
    key: "cities",
    enable: !!selectedStateCode && cityName !== "",
  });

  return (
    <div className="flex flex-col gap-2 my-2">
      {!isLoading && (
        <ComboboxForm
          name={countryName}
          label={t("countryLabel")} // Use translation for label
          placeholder={t("selectCountry")} // Use translation for placeholder
          options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
      {selectedCountryCode && (
        <ComboboxForm
          disabled={statesLoading}
          name={stateName}
          label={t("stateLabel")} // Use translation for label
          placeholder={t("selectState")} // Use translation for placeholder
          options={states?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
      {selectedStateCode && cityName && (
        <ComboboxForm
          disabled={citiesLoading}
          name={cityName}
          label={t("cityLabel")} // Use translation for label
          placeholder={t("selectCity")} // Use translation for placeholder
          options={cities?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
    </div>
  );
};

export default CountriesInput;
