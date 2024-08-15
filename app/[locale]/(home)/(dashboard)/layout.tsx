import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import SideBar from "@/app/components/SideBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pt-40">
      <MaxWidthWrapper className=" flex flex-col md:grid md:grid-cols-8 gap-8 items-stretch md:items-start   pb-10">
        <SideBar />
        <section className=" w-full col-span-full md:col-span-6">
        {children}
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
