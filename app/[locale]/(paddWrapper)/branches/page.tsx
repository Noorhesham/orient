import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

import React from "react";
import MapContainer from "@/app/components/MapContainer";

const page = () => {
  return (
    <section>
      <MaxWidthWrapper className="grid gap-5 mt-5 grid-cols-4">
        <MapContainer />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
