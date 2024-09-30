import Link from "next/link";
import Head1 from "../components/Head1";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useTranslations } from "next-intl";
export const dynamic = "force-dynamic";
export default function NotFound({ message }: { message: string }) {
  const t = useTranslations();
  return (
    <MaxWidthWrapper>
      <Head1 text={t("404")} />
      <p>{message ? message : "Could not find requested resource"}</p>
      {!message && <Link href="/">Return Home</Link>}
    </MaxWidthWrapper>
  );
}
