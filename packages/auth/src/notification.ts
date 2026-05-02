import {
  getToken,
  onMessage,
  type MessagePayload,
  type Messaging,
} from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";
import { FIREBASE_CONFIG } from "./config";
import { notifyPatientCriticalStatus } from "./criticalNotification";

const PATIENT_CRITICAL_FCM_TYPE = "patient_critical";

/** Must match file in shell `public/firebase-messaging-sw.js` (app origin root). */
const FCM_SW_PATH = "/firebase-messaging-sw.js";

let foregroundUnsubscribe: (() => void) | null = null;
let foregroundSetupPromise: Promise<void> | null = null;

let fcmRegistrationPromise: Promise<string | null> | null = null;

let messagingSwRegistration: Promise<ServiceWorkerRegistration | null> | null =
  null;

function pushError(prefix: string, error: unknown): void {
  const code =
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
      ? (error as { code: string }).code
      : "";
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[push] ${prefix}`, code || message, error);
}

/** Register the Firebase messaging worker at app root (required for reliable getToken on Vite). */
export async function registerFirebaseMessagingServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) {
    console.warn("[push] Service workers not supported");
    return null;
  }
  if (!messagingSwRegistration) {
    messagingSwRegistration = (async () => {
      try {
        const reg = await navigator.serviceWorker.register(FCM_SW_PATH, {
          scope: "/",
        });
        await navigator.serviceWorker.ready;
        return reg;
      } catch (e) {
        pushError("Service worker registration failed — is the app opened on localhost or HTTPS, and is firebase-messaging-sw.js reachable?", e);
        return null;
      }
    })();
  }
  return messagingSwRegistration;
}

/**
 * Registers the FCM token (only if permission is already "granted") and attaches the foreground listener.
 * Does not call requestPermission (often blocked outside a user gesture). Deduped per page load.
 */
export function ensureWebPushInitialized(): Promise<string | null> {
  if (!fcmRegistrationPromise) {
    fcmRegistrationPromise = (async (): Promise<string | null> => {
      startForegroundNotificationListener();
      const token = await initializeNotifications();
      return token ?? null;
    })();
  }
  return fcmRegistrationPromise;
}

/**
 * Call from a button click. Requests notification permission, then registers the FCM token.
 */
export async function requestPushPermissionAndToken(): Promise<string | null> {
  try {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      console.warn("[push] Notifications not supported in this environment.");
      return null;
    }

    const messagingInstance = await getFirebaseMessaging();
    if (!messagingInstance) {
      console.warn("[push] FCM not supported in this browser.");
      return null;
    }

    let permission = Notification.permission;
    if (permission === "denied") {
      console.warn("[push] Notifications are blocked for this site in browser settings.");
      return null;
    }

    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      return null;
    }

    return await generateFCMToken(messagingInstance);
  } catch (error) {
    pushError("requestPushPermissionAndToken failed", error);
    return null;
  }
}

export const startForegroundNotificationListener = () => {
  if (foregroundUnsubscribe) {
    return;
  }

  if (!foregroundSetupPromise) {
    foregroundSetupPromise = (async () => {
      const messagingInstance = await getFirebaseMessaging();
      if (!messagingInstance) {
        console.warn("[push] Foreground listener skipped: FCM not supported.");
        return;
      }
      if (foregroundUnsubscribe) {
        return;
      }

      foregroundUnsubscribe = onMessage(
        messagingInstance,
        (payload: MessagePayload) => {
          console.log("[push] Foreground message:", payload);

          const data = payload.data;
          if (data?.type === PATIENT_CRITICAL_FCM_TYPE) {
            void notifyPatientCriticalStatus({
              name: String(data.patientName ?? "Patient"),
              id: String(data.patientId ?? ""),
            });
            return;
          }

          if (
            !("Notification" in window) ||
            Notification.permission !== "granted"
          ) {
            return;
          }

          const title =
            payload.notification?.title ||
            (data?.title as string | undefined) ||
            "Notification";
          const body =
            payload.notification?.body ||
            (data?.body as string | undefined) ||
            "";

          new Notification(title, { body });
        }
      );
    })();
  }
};

/**
 * If permission is already granted, obtains an FCM token. Does not prompt (use requestPushPermissionAndToken from a click).
 */
export const initializeNotifications = async () => {
  try {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      console.warn("[push] Push not supported in this browser.");
      return null;
    }

    const messagingInstance = await getFirebaseMessaging();
    if (!messagingInstance) {
      console.warn("[push] FCM not supported in this browser.");
      return null;
    }

    if (Notification.permission === "denied") {
      console.warn("[push] Notifications blocked — reset permission in browser site settings.");
      return null;
    }

    if (Notification.permission !== "granted") {
      return null;
    }

    return await generateFCMToken(messagingInstance);
  } catch (error) {
    pushError("initializeNotifications failed", error);
    return null;
  }
};

const generateFCMToken = async (
  messagingInstance: Messaging
): Promise<string | null> => {
  try {
    const swReg = await registerFirebaseMessagingServiceWorker();
    if (!swReg) {
      return null;
    }

    const token = await getToken(messagingInstance, {
      vapidKey: FIREBASE_CONFIG.vapidKey,
      serviceWorkerRegistration: swReg,
    });

    if (!token) {
      console.warn("[push] getToken returned empty — check VAPID key in Firebase Console → Project settings → Cloud Messaging.");
      return null;
    }

    console.log("[push] FCM TOKEN:", token);
    return token;
  } catch (error) {
    pushError("getToken failed — verify Web Push certificate (VAPID) matches FIREBASE_CONFIG.vapidKey", error);
    return null;
  }
};
