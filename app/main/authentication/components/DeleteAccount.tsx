import FormContainer from "@/app/components/FormContainer";
import ModalCustom from "@/app/components/ModalCustom";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import { Server } from "../../Server";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const router = useRouter();
  const { handleLogout } = useAuth();

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
    <ModalCustom
      btn={
        <p className=" cursor-pointer z-10  mt-5 ml-3 font-semibold text-red-500 hover:text-red-400 duration-150">
          Delete Account ?
        </p>
      }
      content={
        <div className=" px-5 lg:px-20 py-5">
          <p>Are You Sure You Want To Delete Your Account ?</p>
          <p>Please Confirm Your Password before proceeding.</p>
          <FormContainer
            btnText="CONFIRM DELETE"
            schema="forgotPassword"
            submit={removeAccount}
            formArray={[
              {
                name: "password",
                type: "password",
                placeholder: "Enter Your Password",
              },
            ]}
          />
        </div>
      }
    />
  );
};

export default DeleteAccount;