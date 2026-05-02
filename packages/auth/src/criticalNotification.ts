const title = "Patient status: Critical";

function buildOptions(patient: { name: string; id: string }): NotificationOptions {
  return {
    body: `${patient.name} (${patient.id}) requires immediate attention.`,
    tag: `critical-${patient.id}`,
    requireInteraction: true,
  };
}

/**
 * Shows a system notification when a patient becomes critical.
 * Requests permission on this user gesture if still "default" (fixes intermittent misses after login removed FCM init).
 * Prefers service worker notification when a registration exists (often more reliable on Windows).
 */
export async function notifyPatientCriticalStatus(patient: {
  name: string;
  id: string;
}): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }
  if (!("Notification" in window)) {
    return false;
  }

  let permission = Notification.permission;
  if (permission === "default") {
    permission = await Notification.requestPermission();
  }
  if (permission !== "granted") {
    return false;
  }

  const options = buildOptions(patient);

  try {
    const reg =
      (await navigator.serviceWorker?.getRegistration?.()) ?? null;
    if (reg) {
      await reg.showNotification(title, options);
      return true;
    }
  } catch (e) {
    console.warn("Critical alert: serviceWorker.showNotification failed", e);
  }

  try {
    new Notification(title, options);
    return true;
  } catch (e) {
    console.warn("Critical alert: Notification failed", e);
    return false;
  }
}
