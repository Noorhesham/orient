import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionItem from "@/app/components/MotionItem";
import Partner from "@/app/components/Partner";
import Section from "@/app/components/Section";
import { CACHE } from "@/app/constants";
import { Server } from "@/app/main/Server";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

const page = async ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  unstable_setRequestLocale(locale);
  const { page } = await Server({ resourceName: "page", id: "become-partner" });
  console.log(page);
  const t = await getTranslations();
  const { category } = searchParams;
  console.log(category);
  const tabs = [
    { link: "coloring-centers", text: t("color_center") },
    { link: "export-projects", text: t("projects") },
    { link: "local-distributors", text: t("local_distributor") },
    { link: "project-quotations", text: t("quotations") },
  ];
  const { forms } = await Server({
    resourceName: "getForms",
    body: { slugs: [category || "coloring-centers"] },
    cache: CACHE,
  });
  let countryAdded = false;
  const fields = forms[0].fields
    .map((field: any) => {
      if (field.type === "button") return;
      if (field.key === "country_id" || field.key === "city_id") {
        if (!countryAdded) {
          countryAdded = true;
          return {
            country: true,
            countryName: "country_id",
            stateName: "state_id",
            cityName: "city_id",
          };
        }
        return;
      }

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
    <main className="">
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
        <div className=" min-h-[80vh]  flex flex-col gap-10 md:flex-row  lg:grid items-start lg:grid-cols-4">
          <Section className="  w-full overflow-hidden  col-span-2 flex flex-col gap-10">
            <Partner tabs={tabs} />
          </Section>

          <MotionItem
            nohover
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=" col-span-full w-full lg:col-span-2"
          >
            <Head1 text={t("contact.question")} />
            <FormContainer server id={category} submit={"submitForm"} btnText={t("contact.send")} formArray={fields} />
          </MotionItem>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
