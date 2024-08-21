import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import Image from "next/image";
import Section from "../../../components/Section";
import Card from "../../../components/Card";
import CardHuge from "../../../components/CardHuge";
import Heading from "../../../components/Heading";
import LinkButton from "../../../components/LinkButton";
import ZoomImage from "../../../components/ZoomImage";
import BreadCrumb from "@/app/components/BreadCrumb";
import Paragraph from "@/app/components/Paragraph";
import MotionContainer from "@/app/components/MotionContainer";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
const items = [
  {
    title: " Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    main_gallery: [
      {
        sizes: {
          large: "/unsplash_FWoq_ldWlNQ.png",
        },
      },
    ],
    content:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    title: " Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    main_gallery: [
      {
        sizes: {
          large: "/unsplash_FWoq_ldWlNQ.png",
        },
      },
    ],
    content:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    title: " Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    main_gallery: [
      {
        sizes: {
          large: "/unsplash_FWoq_ldWlNQ.png",
        },
      },
    ],
    content:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
];
const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  // const t = useTranslations();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return (
    <main className=" pt-40 min-h-screen  ">
      <BreadCrumb />
      <section className=" relative min-h-[70vh]">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('/trend.png')`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
      </section>

      <MaxWidthWrapper>
        <div className=" flex flex-col md:flex-row gap-5   justify-between items-start  ">
          <div className=" flex text-amber-700 flex-col items-start">
            <p className=" text-xs font-medium">ABOUT COLOR</p>
            <h1 className=" text-3xl font-[600] uppercase max-w-[20rem] ">burgundy color is a color of life</h1>
          </div>
          <Paragraph
            description="UC developments is an investment entity that was established through an alliance and merger of a number of
            real estate expertise working in the field of real estate investment, engineering, architectural, marketing
            consulting, and project management in the Egyptian market spanning more than 20 years and owns more than 70
            real estate projects in many areas such as Heliopolis, New Cairo and 6th of October. UC developments is an
            investment entity that was established through an alliance and merger of a number of real estate expertise
            working in the field of real estate investment, engineering, architectural, marketing consulting, and
            project management in the Egyptian market spanning more than 20 years and owns more than 70 real estate
            projects in many areas such as Heliopolis, New Cairo and 6th of October."
          />
        </div>
        <div className=" mt-5   h-[80vh] gap-6 grid grid-rows-3 lg:grid-rows-2 relative grid-cols-9">
          <ZoomImage
            src="/brown4.png"
            btn={
              <div className="aspect-square order-1 relative rounded-lg w-full h-full col-span-6 lg:col-span-3">
                <Image className=" rounded-lg w-full h-full absolute object-cover" fill src="/brown4.png" alt="" />
              </div>
            }
          />
          <ZoomImage
            src="/brown.png"
            btn={
              <div className=" w-full order-3 lg:order-2 aspect-square rounded-lg h-full relative col-span-6 lg:col-span-3">
                <Image className=" rounded-lg w-full h-full absolute object-cover" fill src="/brown (2).png" alt="" />
              </div>
            }
          />
          <ZoomImage
            src="/brown.png"
            btn={
              <div className=" order-2 lg:order-3 col-span-3 row-span-2  relative ">
                <Image
                  className=" rounded-lg w-full h-full absolute object-left object-cover"
                  fill
                  src="/brown.png"
                  alt=""
                />
              </div>
            }
          />
          <ZoomImage
            src="/brown.png"
            btn={
              <div className=" order-last w-full rounded-lg h-full relative col-span-full lg:col-span-6 ">
                <Image
                  className=" mb-auto rounded-lg w-full h-full absolute  object-top object-cover"
                  fill
                  src="/brown3.png"
                  alt=""
                />
              </div>
            }
          />
        </div>
      </MaxWidthWrapper>
      <div className=" flex items-center  gap-4  md:flex-row flex-col  ">
        <div className="  flex-1 basis-[45%]   h-[435px] relative">
          <Image src={"/chair.png"} alt="" fill className=" object-cover" />
        </div>
        <MaxWidthWrapper className=" lg:basis-full   flex-1  lg:px-0">
          <Section link="#" className="mt-5 w-full " heading="BEST SELLERS" linkText="BROWSE ALL PRODUCTS">
            <div className="  lg:grid flex flex-col   justify-center lg:grid-cols-3 items-center gap-2 mt-5">
              <Card price="442" img="/Product (3).jpg" text={`putty (acrylic 1000) 233`} />
              <Card price="442" img="/Product (3).jpg" text={`putty (acrylic 1000) 233`} />
              <Card price="442" img="/Product (3).jpg" text={`putty (acrylic 1000) 233`} />
            </div>
          </Section>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className=" flex mt-5 lg:mt-10 flex-col items-center justify-center">
        <Heading
          mainText="DISCOVER THE MOST IMPORTANT"
          subText="ARTICLES ABOUT PAINTS"
          paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio, similique adipisci iure tempora harum
        voluptatum unde magni pariatur expedita ullam reprehenderit corporis! Alias beatae quasi dolore nulla officiis
        rerum."
        />
        <MotionContainer className=" grid md:grid-cols-3 grid-cols-1 justify-center gap-3 lg:gap-10 items-center ">
          {items.map((item, i) => (
            <CardHuge item={item} key={i} />
          ))}
        </MotionContainer>
        <div className=" ">
          <LinkButton text={t("browse")} href="/blog" />
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
