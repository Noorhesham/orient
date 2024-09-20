import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading from "@/app/components/Heading";
import Paragraph from "@/app/components/Paragraph";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import CustomButton from "@/app/components/CustomButton";
import { unstable_setRequestLocale } from "next-intl/server";
const page = ({ params: { locale }, searchParams }: { params: { locale: string }; searchParams: any }) => {
  unstable_setRequestLocale(locale);

  return (
    <MaxWidthWrapper>
      <Dialog open={true}>
        <DialogContent className="  max-w-4xl text-center py-10 overflow-y-auto max-h-[80vh] flex flex-col items-center  sm:rounded-[1.8rem]">
          <div className=" w-32 h-32 relative">
            <Image src="/complete.svg" alt="success" fill />
          </div>
          <Heading subText="" mainText={"Order Completed"} />
          <Paragraph
            description="Your order will be delivered soon.
Thank you for choosing our app! Your order will be delivered soon. Thank you for choosing our app!"
          />
          <div className=" flex items-center gap-2">
            <Link href={"/shop"}>
              <CustomButton text={"Continue Shopping"} />
            </Link>
            <Link href={"/orders"}>
              <Button className=" rounded-full">View Orders</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </MaxWidthWrapper>
  );
};

export default page;
