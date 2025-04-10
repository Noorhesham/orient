import { useAuth } from "@/app/context/AuthContext";
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
const useGetEntity = (
  resourceName: ResourceNameProps,
  key?: any,
  id?: string,
  options: { enabled?: boolean } = {},
  queryParams?: any
) => {
  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () =>
      await Server({
        resourceName: resourceName,
        id: id,
        queryParams,
      }),
    enabled: options.enabled,
  });

  return { data, isLoading };
};
const useCreateEntity = (resourceName: ResourceNameProps, queryKey: string, id?: string) => {
  const router = useRouter();
  const { setCartCount } = useAuth();
  const QueryClient = useQueryClient();
  const { mutate, isPending, data } = useMutation({
    mutationKey: [resourceName],
    mutationFn: async (body: any) => {
      const res = await Server({
        resourceName: resourceName,
        body: body,
        id,
      });
      console.log(res);
      return res;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.message);
        router.refresh();
        QueryClient.invalidateQueries({ queryKey: [queryKey] });
      }
      if (data?.cartCount) setCartCount(data.cartCount);
      if (!data.status) toast.error(data.message);
      return data;
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { mutate, isPending, data };
};

export { useGetGeneralSettings, useGetEntity, useCreateEntity };
