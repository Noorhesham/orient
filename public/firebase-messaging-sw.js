try {
  importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js");
  importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js");
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
    const notificationTitle = payload.notification.title || "Background Message Title";
    const link = payload.fcmOptions.link || payload.data.link;
    const notificationOptions = {
      body: payload.notification.body || "Background Message body.",
      icon: "/firebase-logo.png",
      data: { link },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error("Service Worker Error:", error);
}
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == event.notification.data.link && "focus" in client) {
            return client.focus(); // Just focus if it's already opened
          }
        } 
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.link);
        }
      })
  );
});
