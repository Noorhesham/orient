// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAL3AouHec0aKu3SzgtQ2YjtTtNvAaJudA",
  authDomain: "react-6bd52.firebaseapp.com",
  projectId: "react-6bd52",
  storageBucket: "react-6bd52.appspot.com",
  messagingSenderId: "453925556171",
  appId: "1:453925556171:web:a3801d8bd6e7283593304e",
  measurementId: "G-EK136EZXQV",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
