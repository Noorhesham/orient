import Login from "@/app/main/authentication/components/Login";
import { Server } from "@/app/main/Server";

const Page = async () => {
  const res = await Server({
    method: "POST",
    resourceName: "MGS",
    body: { needed: ["general_settings"] },
    cache: true,
  });
  const loginMethods = res.general_settings.data.login_types;
  return <Login />;
};

export default Page;
