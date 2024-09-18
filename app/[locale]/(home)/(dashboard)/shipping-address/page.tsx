import NotFound from "@/app/[locale]/not-found";
import AddressForm from "@/app/components/AddressForm";
import Container from "@/app/components/Container";
import CustomButton from "@/app/components/CustomButton";
import Delete from "@/app/components/Delete";
import Head1 from "@/app/components/Head1";
import { Location } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import ModalCustom from "@/app/components/ModalCustom";
import Paragraph from "@/app/components/Paragraph";
import { Server } from "@/app/main/Server";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async () => {
  const { data } = await Server({ resourceName: "getEntity", entityName: "shipping-addresses" });
  const t = await getTranslations();
  console.log(data);
  return (
    <Container CustomePadding=" py-8 px-8" className=" w-full flex flex-col gap-3 px-4">
      <Head1 className=" text-xl font-bold" text={"SHIPPING ADDRESS  "} />
      <AddressForm />
      {data.length > 0 ? (
        data.map((item: any) => (
          <div
            key={item.id}
            className=" flex  flex-col  sm:flex-row w-full lg:w-[80%]  gap-2 lg:gap-5 items-start lg:items-center"
          >
            <IconWidget paragraph={item.address} header="HOME" icon={<Location />} />
            <div className=" ml-auto flex flex-wrap flex-row  items-center gap-3">
              <AddressForm item={item} />
              <Delete key="" entityName="shipping-addresses" id={item.id} />
            </div>
          </div>
        ))
      ) : (
        <NotFound message={t("miss-shipping")} />
      )}
    </Container>
  );
};

export default page;
