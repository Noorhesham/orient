import { revalidatePath, revalidateTag } from "next/cache";

export const POST = async () => {
  console.log("revalidate");
  revalidatePath("/");
  console.log("revalidate color center");
  revalidateTag("colortrend");
  revalidateTag("countries");
  revalidateTag("getForms");
  revalidateTag("states");
};
