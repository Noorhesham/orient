import BreadCrumb from "@/app/components/BreadCrumb";
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
    <section>
      <BreadCrumb />
      {children}
    </section>
  );
}
