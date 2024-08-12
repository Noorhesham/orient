import Head1 from "@/app/components/Head1";
import React from "react";

const Methods = ({
  handleSend,
  message,
  methods,
  tfa,
}: {
  handleSend: (type: string) => void;
  message: string;
  methods: { email: string; sms: string ,apps:any};
  tfa?: string;
}) => {
  return (
    <div>
      <h1 className=" text-center text-2xl mt-8 font-bold text-main2">{message}</h1>
      <div>
        {methods.email && (
          <div
            onClick={() => handleSend("email")}
            className=" flex cursor-pointer hover:border-main  hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 text={tfa === "true" ? "SEND TFA CODE TO " : "SEND PASSWORD RESET EMAIL TO :"} />
            <p className=" text-main2 font-medium text-base">{methods.email}</p>
          </div>
        )}
        {methods.sms && (
          <div
            onClick={() => handleSend("sms")}
            className=" flex cursor-pointer hover:border-main  hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 text={tfa === "true" ? "SEND TFA CODE TO " : "SEND PASSWORD RESET SMS TO :"} />
            <p className=" text-main2 font-medium text-base">{methods.sms}</p>
          </div>
        )}
        {methods.apps && (
          <div
            onClick={() => handleSend("device")}
            className=" flex cursor-pointer hover:border-main  hover:bg-gray-50 duration-100 flex-col gap-3 bg-white py-4 px-8 rounded-2xl border border-input items-center mt-5"
          >
            <Head1 text={tfa === "true" ? "SEND TFA CODE TO " : "SEND PASSWORD RESET SMS TO :"} />
            <p className=" text-main2 font-medium text-base">Auth app</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Methods;
