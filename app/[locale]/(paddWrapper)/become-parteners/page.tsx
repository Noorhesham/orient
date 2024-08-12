import BreadCrumb from "@/app/components/BreadCrumb";
import CustomButton from "@/app/components/CustomButton";
import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Partner from "@/app/components/Partner";
import Section from "@/app/components/Section";
import React from "react";
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
            backgroundSize: "cover",
            backgroundImage: `url('/partner.png')`,
            backgroundPosition: "center",
            zIndex: 1,
            backgroundRepeat: "no-repeat",
          }}
          className={`reveal_animation absolute inset-0 `}
        />
      </section>
      <MaxWidthWrapper>
        <div className=" mt-8 grid items-center grid-cols-4">
          <Section CustomePadding="px-20" className="  col-span-2 flex flex-col gap-10" heading="" paragraph="">
            <div className=" flex flex-col gap-5">
             <Partner tabs={tabs}/>
            </div>
          </Section>
          <div className=" col-span-2">
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
