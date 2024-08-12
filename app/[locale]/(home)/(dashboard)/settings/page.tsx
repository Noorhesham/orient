"use client";
import FormContainer from "@/app/components/FormContainer";
import { Notifications, Translate } from "@/app/components/Icons";
import ModalCustom from "@/app/components/ModalCustom";
import { Server } from "@/app/main/Server";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetGeneralSettings } from "@/lib/queries";
import { QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Lock } from "lucide-react";
import React from "react";
import { GoPeople } from "react-icons/go";
import { toast } from "react-toastify";

const Page = () => {
  const updatePassword = [{ name: "newPassword", placeholder: "NEW PASSWORD", password: true }];
  const notifications = [{ name: "active", label: "DEACTIVATE", label2: "ACTIVATE", switchToggle: true }];
  const queryClient = new QueryClient();
  const { data, isLoading } = useGetGeneralSettings(["user_settings"]);
  const user = data?.user_settings;
  const personal = [
    { name: "name", placeholder: "YOUR NAME" },
    { name: "birthday", placeholder: "YOUR BIRTHDAY", date: true },
  ];
  const updatePersonalInfro = async (data: any, setError: any) => {
    const updatedData = { ...data, birthday: format(data.birthday, "yyyy-MM-dd") };
    console.log(updatedData);
    const res = await Server({ resourceName: "update_profile", body: updatedData, method: "POST" });
    console.log(res);
    if (!res) setError(res.errors || res.message);
    if (res) {
      toast.success(res.message);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["user_settings"] });
    }
  };
  const updatePasswordInfo = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "update_password", body: data, method: "POST" });
    console.log(res);
    if (!res) setError(res.errors || res.message);
    if (res) {
      toast.success(res.message);
      setError(null);
    }
  };
  return (
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
              title="PERSONAL INFO"
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
    </div>
  );
};

export default Page;
