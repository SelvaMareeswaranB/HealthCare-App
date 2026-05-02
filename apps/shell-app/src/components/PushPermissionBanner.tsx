import { useCallback, useEffect, useState } from "react";
import { requestPushPermissionAndToken } from "@repo/auth";

/**
 * Browsers often ignore Notification.requestPermission() when it runs only from useEffect (no user gesture).
 * This banner asks once so push registration can complete after a click.
 */
export function PushPermissionBanner() {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }
    setShow(Notification.permission === "default");
  }, []);

  const onAllow = useCallback(async () => {
    setBusy(true);
    try {
      const token = await requestPushPermissionAndToken();
      if (token) {
        setShow(false);
        console.info("[push] Registered after permission grant.");
      } else {
        console.warn("[push] Still no token — check console for [push] errors.");
      }
    } finally {
      setBusy(false);
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-app-border)] bg-[var(--color-app-surface-2)] px-4 py-3 text-sm text-[var(--color-app-text)] md:px-8"
      role="region"
      aria-label="Push notifications"
    >
      <p className="max-w-3xl text-[var(--color-app-text-muted)]">
        Allow notifications on this device to receive push alerts (and confirm your browser isn’t blocking
        them for this site).
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={onAllow}
        className="shrink-0 rounded-lg bg-[var(--color-app-primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {busy ? "Working…" : "Allow notifications"}
      </button>
    </div>
  );
}
