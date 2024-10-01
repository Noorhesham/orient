import { revalidatePath, revalidateTag } from "next/cache";

export const POST = async () => {
  console.log('meow')
  console.log("revalidate");
  revalidatePath("/");
  revalidateTag("colortrend");
  revalidateTag("countries");
  revalidateTag("getForms");
  revalidateTag("getinspired");
  revalidateTag("getEntity");
};
