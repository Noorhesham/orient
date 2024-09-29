import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";
import { unstable_setRequestLocale } from "next-intl/server";
const locales = ["en", "ar"];
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <main>
      <NavBar />
      <section className=" pt-40"> {children}</section>
      <Footer />
    </main>
  );
}
