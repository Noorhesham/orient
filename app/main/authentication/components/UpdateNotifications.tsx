"use client";
import FormContainer from "@/app/components/FormContainer";
import { Notifications } from "@/app/components/Icons";
import ModalCustom from "@/app/components/ModalCustom";
import UpdateCard from "@/app/components/UpdateCard";
import { useDevice } from "@/app/context/DeviceContext";
import React from "react";
import { Server } from "../../Server";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl"; // Import useTranslations

const notifications = [{ name: "active", label: "DEACTIVATE", label2: "ACTIVATE", switchToggle: true }];

const UpdateNotifications = () => {
  const { deviceInfo } = useDevice();
  const t = useTranslations(); // Use translations

  const UpdateNotificationsSubmit = async (val: any) => {
    const res = await Server({
      resourceName: "languageUpdate",
      body: {
        action: "set",
        key: "notification_token_status",
        value: val.active,
        deviceInfo,
      },
    });
    if (res.status) toast.success(res.message);
    else toast.error(res.message);
  };

  return (
    <ModalCustom
      btn={
        <div>
          <UpdateCard
            text={t("customizeNotifications")}
            desc={t("configureCustomSettings")}
            icon={<Notifications color="#E6007E" />}
          />
        </div>
      }
      content={
        <div className="px-5 lg:px-20 py-5">
          <FormContainer
            cancel={true}
            btnStyles={"w-full"}
            btnText={t("saveChanges")}
            submit={UpdateNotificationsSubmit}
            formArray={notifications.map((notification) => ({
              ...notification,
              label: t(notification.label.toLowerCase()),
              label2: t(notification.label2.toLowerCase()),
            }))}
            title={t("customizeNotifications")}
          />
        </div>
      }
    />
  );
};

export default UpdateNotifications;
