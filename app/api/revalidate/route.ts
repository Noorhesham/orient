import { revalidatePath } from "next/cache";

export const GET = async () => {
  console.log("revalidate");
  revalidatePath("/");
};
