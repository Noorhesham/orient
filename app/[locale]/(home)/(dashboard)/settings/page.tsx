"use client";
import FormContainer from "@/app/components/FormContainer";
import { Notifications, Translate } from "@/app/components/Icons";
import ModalCustom from "@/app/components/ModalCustom";
import { Server } from "@/app/main/Server";
import { Checkbox } from "@/components/ui/checkbox";
import { QueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Lock } from "lucide-react";
import React from "react";
import { GoPeople } from "react-icons/go";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { InputOTPPattern } from "@/app/main/authentication/components/OTP";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

const updatePassword = [
  // { name: "newPassword", placeholder: "NEW PASSWORD", type: "password", password: true },
  { name: "password", placeholder: "NEW PASSWORD", type: "password", password: true, noProgress: false },
];
const notifications = [{ name: "active", label: "DEACTIVATE", label2: "ACTIVATE", switchToggle: true }];
const Page = () => {
  const searchParams = useSearchParams();
  const { userSettings, setLogin, handleLogout } = useAuth();
  const router = useRouter();
  const user = userSettings;
  const personal = [
    { name: "name", placeholder: "YOUR NAME" },
    { name: "birth_day", placeholder: "YOUR BIRTHDAY", date: true },
  ];

  const email = [{ name: "email", placeholder: "YOUR EMAIL" }];
  const updatePersonalInfro = async (data: any, setError: any) => {
    let birthDate = data?.birth_day;

    const updatedData = { ...data, birth_day: format(birthDate, "yyyy-MM-dd") };
    console.log(updatedData);
    const res = await Server({ resourceName: "update_profile", body: updatedData, method: "POST" });
    console.log(res);
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
    if (!res.status) setError(res.errors || res.message)();
    if (res) {
      toast.success(res.message);
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("email", data.email);
      updatedParams.set("uuid", res.email_code_uuid);
      setError(null);
    }
  };
  const updatePasswordInfo = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "update_password", body: data, method: "POST" });
    console.log(res);
    if (!res.status) setError(res.errors || res.message)();
    if (res) {
      toast.success(res.message);
      setError(null);
    }
  };
  const removeAccount = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "remove_account", body: data, method: "POST" });
    if (!res.status) setError(res.errors?.length > 0 ? res.errors : res.message)();
    if (res.status) {
      toast.success(res.message);
      router.push("/");
      handleLogout();
    }
  };
  return (
    <>
      {" "}
      <div className=" grid gap-4 grid-cols-3">
        <ModalCustom
          btn={
            <div className="  cursor-pointer rounded-2xl  py-12    flex flex-col items-center  text-xl bg-[#F2F5FF] ">
              <Lock className=" w-10 h-10" />
              <h1 className=" my-2 font-medium">UPDATE PASSWORD</h1>
              <p className=" text-black    text-muted-foreground text-sm">CONFIGURE CUSTOM SETTINGS</p>
            </div>
          }
          content={
            <div className=" px-20 py-5">
              <FormContainer
                submit={updatePasswordInfo}
                cancel={true}
                btnStyles={"w-full"}
                btnText="SAVE CHANGES"
                schema="forgotPassword"
                formArray={updatePassword}
                title="UPDATE PASSWORD"
              />
            </div>
          }
        />
        <ModalCustom
          btn={
            <div className="  cursor-pointer rounded-2xl  py-12    flex flex-col items-center  text-xl bg-[#F2F5FF] ">
              <Notifications />
              <h1 className=" my-2 text-xl font-medium">CUSTOMIZE NOTIFICATIONS</h1>
              <p className=" text-black    text-muted-foreground text-sm">CONFIGURE CUSTOM SETTINGS</p>
            </div>
          }
          content={
            <div className=" px-20 py-5">
              <FormContainer
                cancel={true}
                btnStyles={"w-full"}
                btnText="SAVE CHANGES"
                schema="notifictations"
                formArray={notifications}
                title="CUSTOMIZE  NOTIFICATIONS"
              />
            </div>
          }
        />
        <ModalCustom
          btn={
            <div className="   cursor-pointer rounded-2xl  py-12    flex flex-col items-center  text-xl bg-[#F2F5FF] ">
              <GoPeople className=" text-4xl" />

              <h1 className=" my-2 font-medium">PERSONAL INFO</h1>
              <p className=" text-black    text-muted-foreground text-sm">CONFIGURE CUSTOM SETTINGS</p>
            </div>
          }
          content={
            <div className=" px-20 py-5">
              <FormContainer
                submit={updatePersonalInfro}
                cancel={true}
                defaultValues={user}
                btnStyles={"w-full"}
                btnText="SAVE CHANGES"
                schema="personalInfo"
                formArray={personal}
                title="UPDATE EMAIL"
              >
                {" "}
                <div className="flex mt-5 items-center space-x-2">
                  <Checkbox onChange={async () => {}} id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Activate TWO FACTOR AUTHENTICATION
                  </label>
                </div>
              </FormContainer>
            </div>
          }
        />
        <ModalCustom
          btn={
            <div className="   cursor-pointer rounded-2xl  py-12    flex flex-col items-center  text-xl bg-[#F2F5FF] ">
              <MdEmail className=" text-4xl" />
              <h1 className=" my-2 font-medium">Email</h1>
            </div>
          }
          content={
            <div className=" px-20 py-5">
              {!searchParams.get("uuid") && (
                <FormContainer
                  submit={updateEmailInfo}
                  cancel={searchParams.get("uuid") ? false : true}
                  defaultValues={user}
                  btnStyles={searchParams.get("uuid") ? "hidden" : "w-full"}
                  btnText="SAVE CHANGES"
                  schema="email"
                  formArray={email}
                  title="PERSONAL INFO"
                />
              )}

              {searchParams.get("uuid") && <InputOTPPattern handleSend={updateEmailInfo} sendType="email" email />}
            </div>
          }
        />
      </div>
      <ModalCustom
        btn={
          <p className=" cursor-pointer mt-5 ml-3 font-semibold text-red-500 hover:text-red-400 duration-150">
            Delete Account ?
          </p>
        }
        content={
          <div className=" px-20 py-5">
            <p>Are You Sure You Want To Delete Your Account ?</p>
            <p>Please Confirm Your Password before proceeding.</p>
            <FormContainer
              btnText="CONFIRM DELETE"
              schema="forgotPassword"
              submit={removeAccount}
              formArray={[
                { ...updatePassword[0], noProgress: true, password: false, placeholder: "Enter Your Password" },
              ]}
            />
          </div>
        }
      />
    </>
  );
};

export default Page;
