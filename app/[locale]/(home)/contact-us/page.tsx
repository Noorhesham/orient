import BreadCrumb from "@/app/components/BreadCrumb";
import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import { Calender, Location, Phone } from "@/app/components/Icons";
import IconWidget from "@/app/components/IconWidget";
import Spinner from "@/app/components/Spinner";

const MapComponent = dynamic(() => import("@/app/components/Map"), {
  loading: () => (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  ),
  ssr: false,
});
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Section from "@/app/components/Section";
import SocialMedia from "@/app/components/SocialMedia";
import { BookAIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { FaMailBulk } from "react-icons/fa";
import Paragraph from "@/app/components/Paragraph";

const page = () => {
  return (
    <main className=" pt-40">
      <BreadCrumb />
      <section className=" relative min-h-[60vh]">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('/contact.svg')`,
            backgroundPosition: "center",
            zIndex: 1,
            backgroundRepeat: "no-repeat",
          }}
          className={`reveal_animation absolute inset-0 `}
        />
      </section>
      <MaxWidthWrapper>
        <div className=" flex flex-col  gap-2 md:grid items-stetch  md:grid-cols-4">
          <Section
            CustomePadding="px-0  lg:px-0"
            className="  w-full col-span-2 flex flex-col gap-4"
            heading="CONTACT INFO"
          >
            <Paragraph
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..Lorem Ipsum is simply dummy
              text of the printing and typesetting industry.."
            />
            <IconWidget
              paragraph="25th building 5, 10 Star Street, 5th Settlement, New Cairo, Egypt"
              header="Address"
              icon={<Location />}
            />
            <IconWidget
              paragraph="Hotline 19842
              (+20) 123 456 7890"
              header="Address"
              icon={<Phone />}
            />
            <IconWidget
              paragraph=" info@orient-paints.com"
              header="EMAIL Address"
              icon={<FaMailBulk className=" text-main" />}
            />
            {/* <IconWidget paragraph="From 09 am To 6 pm " header="All Week (off Line)" icon={<Calender />} /> */}
            <div className=" text-xs font-semibold py-3  flex items-center">
              <BookAIcon />
              <p className=" ml-2  inline lg:flex  items-center">
                LEARN ANOUT OUR MOST IMPORTANT{" "}
                <Link className=" ml-2 text-main hover:underline duration-150" href={"/branches"}>
                  BRANCHES AND DISTRIBUTERS
                </Link>
              </p>
            </div>
            <div className=" mt-2">
              <h1 className="  font-semibold text-main">SOCIAL MEDIA</h1>
              <Paragraph description="CONNECT WITH US VIA SOCAIL MEDIA" />
              <SocialMedia />
            </div>
          </Section>
          <div className=" lg:mt-0 mt-2 w-full flex flex-col items-start col-span-2">
            <Head1 text="DO YOU HAVE ANY QUESTIONS ?" />
            <FormContainer
              schema={"contact"}
              btnText="SEND MESSAGE"
              formArray={[
                { name: "name", placeholder: "NAME", type: "text" },
                { name: "phone", placeholder: "PHONE", type: "text", phone: true },
                { name: "email", placeholder: "EMAIL", type: "email" },
                { name: "inquiry", placeholder: "INQUIREIS TYPE", type: "text", select: true },
                { name: "message", placeholder: "MESSAGE", type: "text", area: true },
              ]}
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <div className=" w-full h-[500px]">
        <MapComponent />
      </div>
    </main>
  );
};

export default page;
