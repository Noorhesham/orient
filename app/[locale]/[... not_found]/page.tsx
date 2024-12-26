import QueryProvider from "@/lib/QueryProvider";
import { headers } from "next/headers";

import { convertToHTML } from "@/lib/utils";
import { unstable_setRequestLocale } from "next-intl/server";
import { AuthProvider } from "../../context/AuthContext";
import NavBar from "../../components/NavBar";
import { Server } from "../../main/Server";
import Empty from "../../components/Empty";
import { DeviceProvider } from "../../context/DeviceContext";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import Footer from "../../components/Footer";
import { unstable_cache } from "next/cache";

const cachedServerRequest = unstable_cache(
  async (params) => {
    return await Server({ resourceName: "home", id: params });
  },
  {
    revalidate: 60, // Cache for 1 minute
  }
);
export default async function NotFound() {
  // const headersList = headers();
  // const host = headersList.get("host") || "localhost:3002";
  // let fullUrl = headersList.get("referer") || "";
  // unstable_setRequestLocale("en");

  // if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
  //   fullUrl = `http://${host}${fullUrl}`;
  // }

  // let lastSlug;
  // try {
  //   const url = new URL(fullUrl);
  //   const pathSegments = url.pathname.split("/").filter(Boolean);
  //   lastSlug = pathSegments[pathSegments.length - 1];
  // } catch (error) {
  //   console.error("Invalid URL:", error);
  //   lastSlug = "default"; // Fallback slug
  // }

  // const data = await cachedServerRequest(lastSlug);

  return (
   <div></div>
  );
}
