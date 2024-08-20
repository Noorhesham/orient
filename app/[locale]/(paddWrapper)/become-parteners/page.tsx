import FormContainer from "@/app/components/FormContainer";
import Head1 from "@/app/components/Head1";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Partner from "@/app/components/Partner";
import Section from "@/app/components/Section";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ( {params: { locale }}:{ params: { locale: string }}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const tabs = [
    { link: "color_center", text: t("color_center") },
    { link: "projects", text: t("projects") },
    { link: "local_distributor", text: t("local_distributor") },
    { link: "all", text: t("all") },
  ];
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
        <div className="  flex flex-col gap-10 md:flex-row  lg:grid items-start lg:grid-cols-4">
          <Section className="  w-full overflow-hidden  col-span-2 flex flex-col gap-10">
            <Partner tabs={tabs} />
          </Section>
          <div className=" col-span-full w-full lg:col-span-2">
            <Head1 text={t("contact.question")} />
            <FormContainer
              btnText={t("contact.send")}
              schema={"contact"}
              formArray={[
                { name: "name", placeholder: t("forms.name"), type: "text" },
                { name: "phone", placeholder: t("forms.phone"), type: "text", phone: true },
                { name: "email", placeholder: t("forms.email"), type: "email" },
                { name: "inquiry", placeholder: t("forms.inquiry"), type: "text", select: true },
                { name: "message", placeholder: "MESSAGE", type: "text", area: true },
              ]}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
