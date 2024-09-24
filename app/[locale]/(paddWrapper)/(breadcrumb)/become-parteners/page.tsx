import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Partner from "@/app/components/Partner";
import Section from "@/app/components/Section";
import { Server } from "@/app/main/Server";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

const page = async ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  unstable_setRequestLocale(locale);

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
    cache: Infinity,
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
      };
    })
    .filter((field: any) => field !== undefined);

    console.log(fields,forms[0].fields)
  return (
    <main className="">
      <section className=" relative min-h-[34vh] md:min-h-[46vh] lg:min-h-[60vh]">
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
        <div className="  flex flex-col gap-10 md:flex-row  lg:grid items-start lg:grid-cols-4">
          <Suspense>
            <Section className="  w-full overflow-hidden  col-span-2 flex flex-col gap-10">
              <Partner tabs={tabs} />
            </Section>
          </Suspense>
          <div className=" col-span-full w-full lg:col-span-2">
            <Head1 text={t("contact.question")} />
            <FormContainer server submit={"submitForm"} btnText={t("contact.send")} formArray={fields} />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
