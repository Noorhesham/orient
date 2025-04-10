import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <main className=" min-h-screen h-full flex items-stretch  w-full ">
      <div className=" hidden md:block md:w-[40%] lg:w-[60%]  min-h-full relative">
        <Image src="/log in screen photo.webp" alt="login" className=" object-cover" fill />
      </div>
      {children}
    </main>
  );
}
