import FormContainer from "@/app/components/FormContainer";
import ModalCustom from "@/app/components/ModalCustom";
import UpdateCard from "@/app/components/UpdateCard";
import React, { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { Server } from "../../Server";
import { useDevice } from "@/app/context/DeviceContext";
import { toast } from "react-toastify";
import useFcmToken from "@/app/hooks/useFcmToken";
import { useGetEntity } from "@/lib/queries";
import Spinner from "@/app/components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const UpdateNotifications = () => {
  const t = useTranslations();

  const notifications = [{ name: "active", label: t("activate"), label2: t("deactivate"), switchToggle: true }];

  const { deviceInfo } = useDevice();
  const { token } = useFcmToken();
  const [notificationStatus, setNotificationStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      const res = await Server({
        resourceName: "languageUpdate",
        body: {
          action: "get",
          key: "notification_token_status",
          device_info: deviceInfo,
        },
      });
      console.log(res,'notificaaaaaaaaaaaaaaaaaaaaaaaaaation');
      setNotificationStatus(res.device.notification_token_status);
      setLoading(false);
    };
    getNotifications();
  }, []);
  const UpdateNotificationsSubmit = async (val: any) => {
    const res = await Server({
      resourceName: "languageUpdate",
      body: {
        action: "set",
        key: "notification_token_status",
        value: val.active,
        device_info: deviceInfo,
      },
    });
    const sendVal = async () => {
      const res = await Server({
        resourceName: "languageUpdate",
        body: {
          action: "set",
          key: "notification_token",
          value: token,
          device_info: deviceInfo,
        },
      });
      console.log(res, token);
    };
    if (val.active) sendVal();
    if (res.status) {
      toast.success(res.message);
      setNotificationStatus(val.active);
    } else toast.error(res.message);
  };
  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            text={t("customizeNotifications")}
            desc={t("configureCustomSettings")}
            icon={<MdNotifications className=" text-main h-10 w-10" />}
          />
        </div>
      }
      content={
        loading ? (
          <Spinner />
        ) : (
          <div className=" px-5 lg:px-20 py-5">
            <FormContainer
              defaultValues={{ active: notificationStatus }}
              cancel={true}
              submit={UpdateNotificationsSubmit}
              btnStyles={"w-full"}
              btnText={t("saveChanges")}
              formArray={notifications}
              title={t("customizeNotifications")}
            />
          </div>
        )
      }
    />
  );
};

export default UpdateNotifications;
