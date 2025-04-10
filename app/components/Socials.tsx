import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useDevice } from "../context/DeviceContext";
import { useAuth } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { URL, WEBSITEURL } from "../constants";

const Socials = () => {
  const t = useTranslations();
  const router = useRouter();
  const { generalSettings, loading } = useAuth();
  const { deviceInfo } = useDevice();

  if (loading || !deviceInfo.device_unique_id)
    return (
      <MaxWidthWrapper className=" grid grid-cols-3">
        <Skeleton className=" rounded-full w-10 h-10 aspect-square" />
        <Skeleton className=" rounded-full w-10 h-10 aspect-square" />
        <Skeleton className=" rounded-full w-10 h-10 aspect-square" />
      </MaxWidthWrapper>
    );
  const { login_types } = generalSettings;
  return (
    <div className=" flex flex-col mt-10">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <p className=" text-xs  text-main2 bg-gray-50 font-[400] mx-auto text-center">{t("orSign")}</p>
        </div>
      </div>
      <div className="flex cursor-pointer text-gray-50 self-center mt-3 items-center gap-5">
        {login_types.includes("social_google") && (
          <Link
            href={`${URL}/auth/socialite/google/login?redirect_url=${WEBSITEURL}/login&device_unique_id=${deviceInfo.device_unique_id}`}
            className="  p-1.5 rounded-full  text-lg bg-main2"
          >
            <FaGoogle />
          </Link>
        )}
        {login_types.includes("social_facebook") && (
          <span
            onClick={() =>
              router.push(
                `${URL}/auth/socialite/facebook/login?redirect_url=${WEBSITEURL}/login&device_unique_id=${deviceInfo.device_unique_id}`
              )
            }
            className="  p-1.5 rounded-full  text-lg bg-main2"
          >
            <FaFacebook />
          </span>
        )}
        {login_types.includes("social_linkedin-openid") && (
          <span
            onClick={() =>
              router.push(
                `${URL}/auth/socialite/linkedin-openid/login?redirect_url=${WEBSITEURL}/login&device_unique_id=${deviceInfo.device_unique_id}`
              )
            }
            className="  p-1.5 rounded-full  text-lg bg-main2"
          >
            <FaLinkedin />
          </span>
        )}
      </div>
    </div>
  );
};

export default Socials;
