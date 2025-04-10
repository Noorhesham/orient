import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

import React from "react";
import MapContainer from "@/app/components/MapContainer";
import { Server } from "@/app/main/Server";

const page = async () => {
  const { data: stores } = await Server({ resourceName: "branches" ,});
    console.log(stores)
  return (
    <section>
      <MaxWidthWrapper className="grid gap-5 mt-5 grid-cols-2 lg:grid-cols-4">
        <MapContainer stores={stores} />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
