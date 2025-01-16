import QueryProvider from "@/lib/QueryProvider";
import { unstable_setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { Server } from "../../main/Server";
import { AuthProvider } from "../../context/AuthContext";
import Empty from "../../components/Empty";

import { DeviceProvider } from "../../context/DeviceContext";
import { convertToHTML } from "@/lib/utils";
import Footer from "../../components/Footer";
import NavBar from "@/app/components/NavBar";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";

export default async function Page({ params }: { params: { slug: string[] } }) {
  let lastSlug = params.slug[params.slug.length - 1];

  const data = await Server({ resourceName: "home", id: lastSlug, cache: 0 });
  console.log(data, lastSlug);
  return (
    <QueryProvider>
      <DeviceProvider>
        <AuthProvider>
          <NavBar />
          <MaxWidthWrapper className=" !pt-32 flex justify-center items-center min-h-screen">
            {!data.status ? (
              <Empty text="404 Page Not Found" />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: convertToHTML(data.page.content || "") }}
                className={`  text-black lg:text-base m text-sm  font-medium my-2 leading-[1.7] `}
              />
            )}
          </MaxWidthWrapper>
          <Footer />
        </AuthProvider>
      </DeviceProvider>
    </QueryProvider>
  );
}
