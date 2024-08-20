"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL3AouHec0aKu3SzgtQ2YjtTtNvAaJudA",
  authDomain: "react-6bd52.firebaseapp.com",
  projectId: "react-6bd52",
  storageBucket: "react-6bd52.appspot.com",
  messagingSenderId: "453925556171",
  appId: "1:453925556171:web:a3801d8bd6e7283593304e",
  measurementId: "G-EK136EZXQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission to show notificationsexport const requestPermission = async () => {
export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BN6WAOKbpbGGnhCHXisFDt8AIBUDRldWnK6jMegDHkjwTtK7W2fRZEf843QFKLmxjX4-BmZZ5XvERKuwEDt2qXM",
    });
    console.log("FCM Token:", token);
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};
// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { scope: "/" })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// Listen for messages when the app is in the foreground
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      resolve(payload);
    });
  });

// Call requestPermission to initialize notifications
requestPermission();
