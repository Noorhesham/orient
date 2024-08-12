import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import SideBar from "@/app/components/SideBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <MaxWidthWrapper className=" grid grid-cols-8 gap-8 items-start pt-40 pb-10">
        <SideBar />
        <section className=" col-span-6">
        {children}
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
