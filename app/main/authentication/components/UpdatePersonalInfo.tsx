import React from "react";
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
const personal = [
  { name: "name", placeholder: "YOUR NAME" },
  { name: "birth_day", placeholder: "YOUR BIRTHDAY", date: true },
  { name: "avatar", placeholder: "YOUR PHOTO", photo: true },
];
const email = [{ name: "email", placeholder: "YOUR EMAIL" }];
const phone = [{ name: "phone", placeholder: "YOUR PHONE NUMBER", phone: true }];
const UpdatePersonalInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLogin, userSettings: user, loading } = useAuth();
  const updatePersonalInfro = async (data: any, setError: any) => {
    const formData = new FormData();
    formData.append("birth_day", format(data.birth_day, "yyyy-MM-dd"));
    formData.append("avatar", data.avatar[0]);
    formData.append("name", data.name);
    const res = await Server({ resourceName: "update_profile", body: formData, method: "POST" });
    if (!res.status) setError(Array.isArray(res.errors) ? res.errors : res.errors.password || res.message);
    if (res.status === true) {
      toast.success(res.message);
      setError(null);
      setLogin((l: any) => !l);
    }
  };

  const updateEmailInfo = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "update_profile", body: data, method: "POST" });
    console.log(res);
    if (!res.status) setError(res.errors?.length > 0 ? res.errors : res.errors.email || res.message)();
    if (res.status) {
      toast.success(res.message);
      setLogin((l: any) => !l);

      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("email", data.email);
      updatedParams.set("uuid", res.email_code_uuid);
      setError(null);
      router.push(`?${updatedParams.toString()}`, { scroll: false });
    }
  };

  return (
    <>
      <ModalCustom
        btn={
          <div>
            <UpdateCard text="UPDATE EMAIL" desc={user?.email} icon={<MailIcon className=" text-main w-10 h-10" />} />
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
                btnText="SAVE CHANGES"
                schema="email"
                formArray={email}
                title="UPDATE EMAIL"
              />
              {searchParams.get("uuid") && (
                <InputOTPPattern  email sendType="email" handleSend={updateEmailInfo} />
              )}
            </div>
          )
        }
      />
      <ModalCustom
        btn={
          <div>
            <UpdateCard text="UPDATE PHONE" desc={user?.email} icon={<PhoneIcon className=" text-main w-10 h-10" />} />
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
                btnText="SAVE CHANGES"
                schema="phone"
                formArray={phone}
                title="UPDATE PHONE"
              />
              {searchParams.get("uuid") && (
                <InputOTPPattern revalidate={()=> setLogin((l: any) => !l)} email sendType="email" handleSend={updateEmailInfo} />
              )}
            </div>
          )
        }
      />
      <ModalCustom
        btn={
          <div>
            <UpdateCard
              text="PERSONAL INFO"
              desc="CONFIGURE CUSTOM SETTINGS"
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
                title="UPDATE Personal INFO"
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
