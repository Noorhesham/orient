import Link from "next/link";
import Head1 from "../components/Head1";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
export const dynamic = "force-dynamic";
export default function NotFound({ message }: { message: string }) {
  return (
    <MaxWidthWrapper>
      <Head1 text="Not Found" />
      <p>{message ? message : "Could not find requested resource"}</p>
      {!message && <Link href="/">Return Home</Link>}
    </MaxWidthWrapper>
  );
}
