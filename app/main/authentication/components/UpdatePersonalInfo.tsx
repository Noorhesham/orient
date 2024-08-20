"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import { format } from "date-fns";
import ModalCustom from "@/app/components/ModalCustom";
import UpdateCard from "@/app/components/UpdateCard";
import { GoPeople } from "react-icons/go";
import FormContainer from "@/app/components/FormContainer";
import Activate2fa from "./Activate2fa";
import { MailIcon, PhoneIcon } from "lucide-react";
import Spinner from "@/app/components/Spinner";
import { InputOTPPattern } from "./OTP";
import { useTranslations } from "next-intl";

const UpdatePersonalInfo = () => {
  const t = useTranslations();
  const router = useRouter();
  const personal = [
    { name: "name", placeholder: t("name") },
    { name: "birth_day", placeholder: t("birth_day"), date: true },
    { name: "avatar", placeholder: t("avatar"), photo: true },
  ];
  const email = [{ name: "email", placeholder: t("email") }];
  const phone = [{ name: "phone", placeholder: t("phone"), phone: true }];
  const searchParams = useSearchParams();
  const { setLogin, userSettings: user, loading } = useAuth();
  const updatePersonalInfro = async (data: any, setError: any) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.birth_day) formData.append("birth_day", format(data.birth_day, "yyyy-MM-dd"));
    if (data.avatar) formData.append("avatar", data.avatar[0]); 

    console.log(data);
    const res = await Server({
      resourceName: "update_profile",
      body: {
        formData,
      },
    });
    if (!res.status) setError(Array.isArray(res.errors) ? res.errors : res.errors.password || res.message);
    if (res.status === true) {
      toast.success(res.message);
      setError(null);
      setLogin((l: any) => !l);
    }
  };

  const updateEmailInfo = async (data: any, setError: any) => {
    if (data.phone && data.phone.startsWith(user.country_key)) {
      // Remove the country_key from the phone number
      data.phone = data.phone.slice(user.country_key.length);
      data.country_key = user.country_key;
    }
    const res = await Server({ resourceName: "update_profile", body: data });

    if (!res.status) {
      setError(res.errors?.length > 0 ? res.errors.join(", ") : res.errors?.email || res.message);
      return;
    }
    if (res.status) {
      toast.success(res.message);
      setLogin((l: any) => !l);

      const updatedParams = new URLSearchParams(searchParams);
      data.phone
        ? updatedParams.set("phone", data.phone.slice(user.country_key.length))
        : updatedParams.set("email", data.email);
      data.phone ? updatedParams.set("uuid", res.phone_code_uuid) : updatedParams.set("uuid", res.email_code_uuid);
      setError(null);
      router.push(`?${updatedParams.toString()}`, { scroll: false });
    }
  };

  return (
    <>
      <ModalCustom
        btn={
          <div>
            <UpdateCard
              text={t("updateEmail")}
              desc={user?.email}
              icon={<MailIcon className=" text-main w-10 h-10" />}
            />
          </div>
        }
        content={
          loading ? (
            <Spinner />
          ) : (
            <div className=" px-5 lg:px-20 py-5">
              <FormContainer
                submit={updateEmailInfo}
                cancel={true}
                defaultValues={user}
                btnStyles={"w-full"}
                btnText={t("confirm")}
                schema="email"
                formArray={email}
                title={t("updateEmail")}
              />
              {searchParams.get("uuid") && <InputOTPPattern email sendType="email" handleSend={updateEmailInfo} />}
            </div>
          )
        }
      />
      <ModalCustom
        btn={
          <div>
            <UpdateCard
              text={t("updatePhone")}
              desc={`+${user?.country_key} ${user?.phone}`}
              icon={<PhoneIcon className=" text-main w-10 h-10" />}
            />
          </div>
        }
        content={
          loading ? (
            <Spinner />
          ) : (
            <div className=" px-5 lg:px-20 py-5">
              <FormContainer
                submit={updateEmailInfo}
                cancel={true}
                defaultValues={user}
                btnStyles={"w-full"}
                btnText={t("confirm")}
                schema="phone"
                formArray={phone}
                title={t("updatePhone")}
              />
              {searchParams.get("uuid") && (
                <InputOTPPattern
                  revalidate={() => setLogin((l: any) => !l)}
                  phone
                  country_key={user.country_key}
                  sendType="username"
                  handleSend={updateEmailInfo}
                />
              )}
            </div>
          )
        }
      />
      <ModalCustom
        btn={
          <div>
            <UpdateCard
              text={t("personalInfo")}
              desc={t("personalDetails")}
              icon={<GoPeople className=" text-main w-10 h-10" />}
            />
          </div>
        }
        content={
          loading ? (
            <Spinner />
          ) : (
            <div className=" px-5 lg:px-20 py-5">
              <FormContainer
                submit={updatePersonalInfro}
                cancel={true}
                defaultValues={user}
                btnStyles={"w-full"}
                btnText="SAVE CHANGES"
                schema="personalInfo"
                formArray={personal}
                title={t("updatePersonalInfo")}
              />
              <Activate2fa />
            </div>
          )
        }
      />
    </>
  );
};

export default UpdatePersonalInfo;
