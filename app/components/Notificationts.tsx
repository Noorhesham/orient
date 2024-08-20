"use client";

import React, { useEffect } from "react";
import { onMessageListener, requestPermission } from "../firebase";
import { toast } from "react-toastify";

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      requestPermission();

      onMessageListener().then((payload: any) => {
        toast.success(`${payload.notification.title} - ${payload.notification.body}`);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { title: payload.notification.title, body: payload.notification.body },
        ]);
      }).catch((err) => console.error(err));
    }
  }, []);

  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index}>
          <strong>{notification.title}</strong>
          <p>{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
