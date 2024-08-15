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

const page = () => {
  return (
    <main className=" pt-40 min-h-screen  ">
      <BreadCrumb />
      <section className=" relative min-h-screen">
        <div
          style={{
            backgroundSize: "cover",
            backgroundImage: `url('/trend.png')`,
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className={`reveal_animation absolute inset-0 `}
        />
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 flex flex-col">
          <div className="flex  z-10 items-center justify-center gap-3">
            <div className=" w-20 bg-white h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#7F4222] h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#D9D9D9] h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#BA6E46] h-20 aspect-square rounded-full border-white border-[3px]"></div>
            <div className=" w-20 bg-[#D7C3A6] h-20 aspect-square rounded-full border-white border-[3px]"></div>
          </div>
        </div>
      </section>

      <MaxWidthWrapper className=" my-8 md:my-16">
        <div className=" flex flex-col md:flex-row gap-5  lg:gap-20 justify-center items-start py-5  ">
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
        <div className="  mx-auto lg:ml-32 h-[616px] gap-3 grid grid-rows-2 relative grid-cols-7">
          <ZoomImage
            src="/brown.png"
            btn={
              <div className=" relative rounded-lg w-full h-full col-span-3 lg:col-span-2">
                <Image className=" rounded-lg w-full h-full absolute object-cover" fill src="/brown4.png" alt="" />
              </div>
            }
          />
          <ZoomImage
            src="/brown.png"
            btn={
              <div className=" w-full rounded-lg h-full relative lg:col-span-2">
                <Image className=" rounded-lg w-full h-full absolute object-cover" fill src="/brown (2).png" alt="" />
              </div>
            }
          />
          <ZoomImage
            src="/brown.png"
            btn={
              <div className=" col-span-3 relative row-span-2 ">
                <Image
                  className=" rounded-lg w-full h-full absolute object-left object-contain"
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
              <div className=" w-full rounded-lg h-full relative col-span-4 ">
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
      <div className=" flex items-center  md:flex-row flex-col   mt-10">
        <div className=" flex-grow  w-full lg:min-w-[563px] h-[435px] relative">
          <Image src={"/chair.png"} alt="" fill className=" object-cover" />
        </div>
        <Section link="#" className="mt-[79px] w-full " heading="BEST SELLERS" linkText="BROWSE ALL PRODUCTS">
          <div className="  lg:grid flex flex-col   justify-center lg:grid-cols-3 items-center gap-4 lg:gap-2 mt-[62px] ">
            <Card price="442" img="/Product (3).jpg" text={`putty (acrylic 1000) 233`} />
            <Card price="442" img="/Product (3).jpg" text={`putty (acrylic 1000) 233`} />
            <Card price="442" img="/Product (3).jpg" text={`putty (acrylic 1000) 233`} />
          </div>
        </Section>
      </div>
      <MaxWidthWrapper className=" flex mt-5 lg:mt-10 flex-col items-center justify-center">
        <Heading
          mainText="DISCOVER THE MOST IMPORTANT"
          subText="ARTICLES ABOUT PAINTS"
          paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio, similique adipisci iure tempora harum
        voluptatum unde magni pariatur expedita ullam reprehenderit corporis! Alias beatae quasi dolore nulla officiis
        rerum."
        />
        <MotionContainer className=" grid md:grid-cols-3 grid-cols-1 justify-center gap-3 items-center ">
          <CardHuge />
          <CardHuge />
          <CardHuge />
        </MotionContainer>
        <div className=" mt-[50px] ">
          <LinkButton text="BROWSE ALL BLOG" href="/blog" />
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
