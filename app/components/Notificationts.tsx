"use client";
import React, { useEffect } from "react";
import { onMessageListener, requestPermission } from "../firebase";
import { toast } from "react-toastify";

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([]);

  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessageListener().then((payload: any) => {
      toast.success(`${payload.notification.title} - ${payload.notification.body}`);
      //@ts-ignore
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { title: payload.notification.title, body: payload.notification.body },
      ]);
    });

    return () => {
      unsubscribe.catch((err: any) => console.error(err));
    };
  }, []);

  return (
    <div>
      {/* Rendering notifications if needed */}
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
