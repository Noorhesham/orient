import BreadCrumb from "@/app/components/BreadCrumb";
import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Section from "@/app/components/Section";
import SocialMedia from "@/app/components/SocialMedia";
import { BookAIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Paragraph from "@/app/components/Paragraph";
import Address from "@/app/components/Address";
import ContactUsLocation from "@/app/components/ContactUsLocation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Server } from "@/app/main/Server";
import { CACHE } from "@/app/constants";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { page } = await Server({ resourceName: "page", id: "contact-us" });

  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const { forms } = await Server({ resourceName: "getForms", body: { slugs: ["contact-us"] }, cache: CACHE });
  const fields = forms[0].fields
    .map((field: any) => {
      if (field.type === "button") return;
      return {
        name: field.key,
        label: field.label,
        placeholder: field.label,
        type: field.type === "textfield" ? "text" : field.type,
        area: field.type === "textarea" ? true : false,
        phone: field.type === "phoneNumber" ? true : false,
        select: false,
        required: field.validate?.required || false,
        returnFullPhone: true,
        optional: !field.validate?.required || false,
      };
    })
    .filter((field: any) => field !== undefined);
  console.log(page);
  return (
    <main className=" pt-40">
      <BreadCrumb />
      <section className=" relative min-h-[37vh] md:min-h-[46vh] lg:min-h-[60vh]">
        <div
          style={{
            backgroundImage: `url(${page?.cover_desktop?.[0]?.file})`,
            backgroundPosition: "center",
            zIndex: 1,
            backgroundRepeat: "no-repeat",
          }}
          className={`reveal_animation lg:block hidden absolute inset-0 bg-cover `}
        />
        <div
          style={{
            backgroundImage: `url(${page.cover_mobile?.[0]?.file})`,
            backgroundPosition: "center",
            zIndex: 1,
            backgroundRepeat: "no-repeat",
          }}
          className={`reveal_animation lg:hidden block absolute inset-0 bg-cover `}
        />
      </section>
      <MaxWidthWrapper>
        <div className=" flex flex-col  gap-4 lg:gap-2 md:grid items-center lg:items-start  md:grid-cols-4">
          <Section className="  w-full col-span-2 flex flex-col gap-2 lg:gap-4" heading={t("contact.title")}>
            <Paragraph description={t("contact.description")} />
            <Address className="mt-2" />
            {/* <IconWidget paragraph="From 09 am To 6 pm " header="All Week (off Line)" icon={<Calender />} /> */}
            <div className=" text-xs font-semibold py-3  flex items-center">
              <BookAIcon />

              <p className=" ml-2  inline lg:flex  items-center">
                {t("contact.book")}{" "}
                <Link className=" ml-2 mr-1 text-main hover:underline duration-150" href={"/branches"}>
                  {t("contact.branches")}
                </Link>
              </p>
            </div>
            <div className=" mt-2 ">
              <h1 className="  font-semibold text-main">{t("contact.contact")}</h1>
              <Paragraph description={t("contact.contactDescription")} />
              <SocialMedia />
            </div>
          </Section>
          <div className="w-full flex  flex-col items-start col-span-2">
            <Head1 text={t("contact.question")} />
            <div className=" lg:mt-0 w-full  mt-3">
              <FormContainer server submit={"submitForm"} btnText={t("contact.send")} formArray={fields} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <ContactUsLocation />
    </main>
  );
};

export default Page;
