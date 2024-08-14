import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Partner from "@/app/components/Partner";
import Section from "@/app/components/Section";
import React, { Suspense } from "react";
const tabs = [
  { link: "color_center", text: "Requesting to open coloring centers" },
  { text: "Getting quotations for Projects", link: "projects" },
  { link: "local_distributor", text: "becoming a local distributor" },
  { link: "all", text: "export projects" },
];
const page = () => {
  return (
    <main className="">
      <section className=" relative min-h-[60vh]">
        <div
          style={{
            backgroundImage: `url('/partner.png')`,
            backgroundPosition: "center",
            zIndex: 1,
            backgroundRepeat: "no-repeat",
          }}
          className={`reveal_animation absolute inset-0 bg-cover `}
        />
      </section>
      <MaxWidthWrapper>
        <div className=" mt-5 md:mt-8 flex flex-col gap-3 md:flex-row  lg:grid items-center lg:grid-cols-4">
          <Section CustomePadding="lg:px-20 px-2" className="  col-span-2 flex flex-col gap-10">
         
                <Partner tabs={tabs} />
            
         
          </Section>
          <div className=" col-span-full w-full lg:col-span-2">
            <Head1 text="DO YOU HAVE ANY QUESTIONS ?" />
            <FormContainer
              schema={"contact"}
              formArray={[
                { name: "name", placeholder: "NAME", type: "text" },
                { name: "phone", placeholder: "PHONE", type: "text", phone: true },
                { name: "email", placeholder: "EMAIL", type: "email" },
                { name: "inquiry", placeholder: "INQUIREIS TYPE", type: "text", select: true },
                { name: "message", placeholder: "MESSAGE", type: "text" },
              ]}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
