import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import SideBar from "@/app/components/SideBar";
import { unstable_setRequestLocale } from "next-intl/server";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);

  return (
    <main className="pt-40">
      <MaxWidthWrapper className=" flex flex-col md:grid md:grid-cols-8 gap-8 items-stretch md:items-start   pb-10">
        <SideBar />
        <section className=" w-full col-span-full md:col-span-6">{children}</section>
      </MaxWidthWrapper>
    </main>
  );
}
