/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/12.12.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.12.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCP9Ra8_rbFBIehWHFh5vTzw2mSzihWmGs",
  authDomain: "healthcare-app-d6ae2.firebaseapp.com",
  projectId: "healthcare-app-d6ae2",
  storageBucket: "healthcare-app-d6ae2.firebasestorage.app",
  messagingSenderId: "894865272814",
  appId: "1:894865272814:web:3a3fea1bb1064b219b68ff",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received:", payload);

  const data = payload.data || {};

  if (data.type === "patient_critical") {
    const title = "Patient status: Critical";
    const body = `${data.patientName || "Patient"} (${data.patientId || ""}) requires immediate attention.`;
    self.registration.showNotification(title, {
      body,
      tag: `critical-${data.patientId || ""}`,
      requireInteraction: true,
      icon: "/firebase-logo.png",
      data: { url: data.click_action || "/" },
    });
    return;
  }

  const notificationTitle =
    payload.notification?.title ||
    data.title ||
    "Notification";

  const notificationOptions = {
    body: payload.notification?.body || data.body || "",
    icon: "/firebase-logo.png",
    data: {
      url: data.click_action || "/",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});