import NotFound from "@/app/[locale]/not-found";
import AddressForm from "@/app/components/AddressForm";
import Container from "@/app/components/Container";
import Delete from "@/app/components/Delete";
import Head1 from "@/app/components/Head1";
import { Location } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";

import { Server } from "@/app/main/Server";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async () => {
  const { data } = await Server({
    resourceName: "getEntity",
    entityName: "shipping-addresses",
    queryParams: new URLSearchParams({ with: "country_id,state_id,city_id" }),
  });
  const t = await getTranslations();
  console.log(data);
  return (
    <Container CustomePadding=" py-8 px-8" className=" w-full flex flex-col gap-3 px-4">
      <Head1 className=" text-xl font-bold" text={t("shippingAddress")} />
      <AddressForm />
      {data.length > 0 ? (
        data.map((item: any) => (
          <div
            key={item.id}
            className=" flex border-b border-input pb-2  flex-col mt-4  sm:flex-row w-full lg:w-[80%]  gap-2 lg:gap-5 items-start lg:items-center"
          >
            <IconWidget
              paragraph={`${item?.state?.title} ${item?.address}`}
              header={item?.country?.title}
              icon={<Location />}
            />
            <div className=" w-full  justify-end flex flex-wrap flex-row  items-center gap-3">
              <AddressForm item={item} />
              <Delete key="" entityName="shipping-addresses" id={item.id} />
            </div>
          </div>
        ))
      ) : (
        <NotFound message={t("missShipping")} />
      )}
    </Container>
  );
};

export default page;
