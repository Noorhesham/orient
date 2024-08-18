import { Server } from "@/app/main/Server";
import { useQuery } from "@tanstack/react-query";
import cookies from "js-cookie";
const useGetGeneralSettings = (needed: string[]) => {
  const { data, isLoading } = useQuery({
    queryKey: [needed],
    queryFn: async () =>
      await Server({
        resourceName: "MGS",
        body: {
          needed,
          token: cookies.get("jwt"),
          device_id: JSON.parse(cookies.get("deviceInfo") || "{}")?.device_unique_id,
        },
      }),
  });

  return { data, isLoading };
};
export { useGetGeneralSettings };
