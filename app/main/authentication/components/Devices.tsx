import ModalCustom from "@/app/components/ModalCustom";
import Spinner from "@/app/components/Spinner";
import UpdateCard from "@/app/components/UpdateCard";
import { useGetEntity } from "@/lib/queries";
import React from "react";
import { MdOutlineDevices } from "react-icons/md";

const Devices = () => {
  const { data: devices, isLoading } = useGetEntity("getDevices",);
  console.log(devices);
  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            desc="BROWSE YOUR DEVICES"
            text="MY DEVICES"
            icon={<MdOutlineDevices className=" text-main w-10 h-10" />}
          />
        </div>
      }
      content={isLoading ? <Spinner /> : <div className=" px-5 lg:px-20 py-5"></div>}
    />
  );
};

export default Devices;
