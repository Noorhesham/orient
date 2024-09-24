" use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Server } from "../main/Server";
import FormSelect from "./FormSelect";
import ComboboxForm from "./ComboboxForm";
import { useFormContext } from "react-hook-form";
import Spinner from "./Spinner";
const useGetEntities = ({
  key,
  resourceName,
  queryParams,
  enable = true,
  id,
}: {
  key: string;
  resourceName: "countries" | "states";
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
const CountriesInput = ({ countryName, stateName }: { countryName: string; stateName: string }) => {
  const form = useFormContext();
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

  console.log(states, selectedCountryCode);
  return (
    <div className=" flex flex-col gap-4">
      {!isLoading && (
        <ComboboxForm
          name={countryName}
          label="Country"
          placeholder="Select Country"
          options={countries?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
      {selectedCountryCode && (
        <ComboboxForm
          disabled={statesLoading}
          name={stateName}
          label="State"
          placeholder="Select State"
          options={states?.data.map((country: any) => ({ label: country.title, value: country.id }))}
        />
      )}
    </div>
  );
};

export default CountriesInput;
