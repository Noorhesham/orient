import AddressForm from "@/app/components/AddressForm";
import Container from "@/app/components/Container";
import CustomButton from "@/app/components/CustomButton";
import CustomForm from "@/app/components/CustomForm";
import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import { Location } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import ModalCustom from "@/app/components/ModalCustom";
import React from "react";

const page = () => {
  return (
      <Container CustomePadding=" py-8 px-8" className=" w-full flex flex-col gap-3 px-4">
        <Head1 className=" text-xl font-bold" text={"SHIPPING ADDRESS  "} />
      <AddressForm/>
        <div className=" flex flex-col  sm:flex-row gap-2 lg:gap-5  items-start lg:items-center">
          <IconWidget paragraph={"147 Vacation Road, Holiday Town, Rome, Italy"} header="HOME" icon={<Location />} />
          <div className=" flex flex-wrap flex-row  items-center gap-3">
            <CustomButton text="Edit" />
            <CustomButton backgroundColor="dark" text="DELETE" reverse />
          </div>
        </div>
        <div className=" flex  flex-col  sm:flex-row  gap-2 lg:gap-5 items-start lg:items-center">
          <IconWidget paragraph={"147 Vacation Road, Holiday Town, Rome, Italy"} header="HOME" icon={<Location />} />
          <div className=" flex flex-wrap flex-row  items-center gap-3">
            <CustomButton text="Edit" />
            <CustomButton backgroundColor="dark" text="DELETE" reverse />
          </div>
        </div>
      </Container>

  );
};

export default page;
