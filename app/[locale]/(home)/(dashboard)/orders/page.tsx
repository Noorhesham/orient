import Head1 from "@/app/components/Head1";
import NotFound from "@/app/components/NotFound";
import Paragraph from "@/app/components/Paragraph";
import { TableDemo } from "@/app/components/TableComponent";
import { Server } from "@/app/main/Server";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async () => {
  const { orders } = await Server({ resourceName: "my_orders" });
  const t = await getTranslations();
  console.log(orders);
  if (!orders) return <NotFound message={t("noorders")} link="/shop" linkText={t("go_to_shop")} />;

  return (
    <div>
      <Head1 text={t("orders")} className=" text-4xl font-bold" />

      <Paragraph description={t("orderdesc")} />
      {orders.length === 0 ? (
        <NotFound message={t("noorders")} link="/shop" linkText={t("go_to_shop")} />
      ) : (
        <TableDemo data={orders} />
      )}
    </div>
  );
};

export default page;
