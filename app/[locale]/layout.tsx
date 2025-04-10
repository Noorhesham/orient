import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./button.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { DeviceProvider } from "../context/DeviceContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryProvider from "@/lib/QueryProvider";
import 'react-toastify/dist/ReactToastify.min.css'; // Minified version
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";
import Notifications from "../components/Notificationts";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "600"] });
const locales = ["en", "ar"];
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  title: "Orient ",
  description: "Orient",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);
  let fontClassName = poppins.className;
  if (locale === "ar") {
    //@ts-ignore
    await import("../cairo.css");
    fontClassName = "cairo-font";
  }
  return (
    <html lang={locale}>
      <body
        style={{ textAlign: locale === "ar" ? "right" : "left", direction: locale === "ar" ? "rtl" : "ltr" }}
        className={fontClassName}
      >
        <QueryProvider>
          <DeviceProvider>
            <AuthProvider>
              <Notifications />

              <ToastContainer
                position="top-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover={false}
                theme="light"
              />
              <ReactQueryDevtools initialIsOpen={false} />
              <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </AuthProvider>
          </DeviceProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
