import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading from "@/app/components/Heading";
import Paragraph from "@/app/components/Paragraph";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import CustomButton from "@/app/components/CustomButton";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { BsExclamationCircle, BsExclamationCircleFill } from "react-icons/bs";
import { ArrowRight } from "@/app/components/Icons";

const page = async ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const { status, message, response, error, explanation } = searchParams;
  console.log(error);

  return (
    <MaxWidthWrapper>
      <Dialog open={true}>
        <DialogContent src="sd" className="  max-w-4xl text-center py-10 overflow-y-auto max-h-[80vh] flex flex-col items-center  sm:rounded-[1.8rem]">
          {status === "success"||!status ? (
            <>
              <div className=" w-32 h-32 relative">
                <Image src="/complete.svg" alt={t("success")} fill />
              </div>
              <h1 className=" hidden">{t("success")}</h1>
              <Heading subText="" mainText={t("orderCompleted")} />
              <Paragraph
                size="sm"
                description={t("orderDescription", {
                  defaultMessage: "Your order will be delivered soon. Thank you for choosing our app!",
                })}
              />
              <div className=" flex items-center gap-2">
                <Link href={"/shop"}>
                  <CustomButton text={t("continueShopping")} />
                </Link>
                <Link href={"/orders"}>
                  <Button className=" rounded-full">{t("viewOrders")}</Button>
                </Link>
              </div>
            </>
          ) : (
            <div className=" flex  bg-background flex-col items-center justify-center ">
              <BsExclamationCircleFill className=" text-red-400 w-32 h-32 relative" />
              <Paragraph className=" uppercase font-semibold text-3xl" size="lg" description={message} />
              <div className=" flex items-center gap-2">
                <Link
                  className=" flex items-center gap-2 hover:underline duration-150 hover:text-main"
                  href={"/checkout"}
                >
                  {t("returnToCheckout")}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MaxWidthWrapper>
  );
};

export default page;
