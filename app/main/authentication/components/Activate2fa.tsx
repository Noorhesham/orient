"use client";

import { toast } from "react-toastify";
import { Server } from "../../Server";
import { Checkbox } from "@/components/ui/checkbox";
import Head1 from "@/app/components/Head1";
import { useLocalStorageState } from "@/app/hooks/useLocalStorageState";
import QRCode from "qrcode";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputOTPPattern } from "./OTP";
const Activate2fa = () => {
  const [serial, setSerial] = useLocalStorageState("serial", "");
  const [qr, setQr] = useState<string>("");
  const [err, setErr] = useState<string>("");
  useEffect(() => {
    QRCode.toDataURL(serial).then(setQr);
  }, []);
  const handleCheckTfa = async () => {
    const res = await Server({
      body: { tfa: 1, type: "activate" },
      resourceName: "tfaActivate",
    });
    console.log(res);
    if (!res.status) toast.error(res.message);
    if (res.status) {
      toast.success(res.message);
      setSerial(res.serial);
    }
  };

  return (
    <section className=" flex flex-col items-center">
      <div className="flex mt-5 items-center space-x-2">
        <Checkbox onCheckedChange={() => handleCheckTfa()} id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Activate TWO FACTOR AUTHENTICATION
        </label>
      </div>
      <div>
        {serial && (
          <div className=" text-2xl items-center flex flex-col mt-5">
            <Head1 text="YOUR SERIAL" />
            <p className=" text-black text-lg">{serial}</p>
            <Image alt="" src={`${qr}`} width={200} height={200} />
            <InputOTPPattern setServerError={setErr} sendType="" activate={true} handleSend={handleCheckTfa} />
          </div>
        )}
        {err && <p className=" hover:text-red-400 text-red-500 font-semibold ">{err}</p>}
      </div>
    </section>
  );
};

export default Activate2fa;
