import React from "react";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import ModalCustom from "@/app/components/ModalCustom";
import { Lock } from "lucide-react";
import UpdateCard from "@/app/components/UpdateCard";
import FormContainer from "@/app/components/FormContainer";
const updatePassword = [
  { name: "password", placeholder: "NEW PASSWORD", type: "password", password: true, noProgress: false },
];
const UpdatePassword = () => {
  const updatePasswordInfo = async (data: any, setError: any) => {
    const res = await Server({ resourceName: "update_password", body: data, method: "POST" });
    console.log(res);
    if (!res.status) setError(res.errors || res.message)();
    if (res) {
      toast.success(res.message);
      setError(null);
    }
  };

  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            text="UPDATE PASSWORD"
            desc="CONFIGURE CUSTOM SETTINGS"
            icon={<Lock className="w-10 h-10 text-main" />}
          />
        </div>
      }
      content={
        <div className=" px-5 lg:px-20 py-5">
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
  );
};

export default UpdatePassword;