import { ResourceNameProps, Server } from "@/app/main/Server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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
const useGetEntity = (resourceName: ResourceNameProps, key?: any) => {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () =>
      await Server({
        resourceName: resourceName,
      }),
  });
  console.log(data);
  return { data, isLoading };
};
const useCreateEntity = (resourceName: ResourceNameProps, queryKey: string) => {
  const router = useRouter();
  const QueryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: [resourceName],
    mutationFn: async (body: any) => {
      return await Server({
        resourceName: resourceName,
        body: body,
      });
    },
    onSuccess: (data) => {
      console.log("success", data);
      router.refresh();
      QueryClient.invalidateQueries({ queryKey: [queryKey] });
      if (data.status) toast.success(data.message);
    },
  });

  return { mutate, isPending };
};

export { useGetGeneralSettings, useGetEntity, useCreateEntity };
