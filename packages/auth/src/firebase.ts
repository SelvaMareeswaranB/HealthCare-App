import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCP9Ra8_rbFBIehWHFh5vTzw2mSzihWmGs",
  authDomain: "healthcare-app-d6ae2.firebaseapp.com",
  projectId: "healthcare-app-d6ae2",
  storageBucket: "healthcare-app-d6ae2.firebasestorage.app",
  messagingSenderId: "894865272814",
  appId: "1:894865272814:web:3a3fea1bb1064b219b68ff",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

let messagingPromise: Promise<Messaging | null> | null = null;

export const getFirebaseMessaging = (): Promise<Messaging | null> => {
  if (!messagingPromise) {
    messagingPromise = (async () => {
      if (!(await isSupported())) {
        return null;
      }
      return getMessaging(app);
    })();
  }
  return messagingPromise;
};
