import { revalidatePath, revalidateTag } from "next/cache";

export const GET = async () => {
  console.log("meow");
  console.log("revalidate");
  revalidatePath("/");
  revalidateTag("colortrend");
  revalidateTag("countries");
  revalidateTag("getForms");
  revalidateTag("getinspired");
  revalidateTag("getEntity");
  console.log("revalidate done");
  return new Response("Revalidated", { status: 200 });
};
