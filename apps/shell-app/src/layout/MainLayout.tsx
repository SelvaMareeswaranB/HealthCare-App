import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ensureWebPushInitialized } from "@repo/auth";
import { useAuthStore } from "@repo/store";
import Navbar from "../components/navigation/Navbar";
import { PushPermissionBanner } from "../components/PushPermissionBanner";

const MainLayout = () => {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const sessionPushStarted = useRef(false);

  useEffect(() => {
    if (isLoading || !user || sessionPushStarted.current) {
      return;
    }
    sessionPushStarted.current = true;
    void ensureWebPushInitialized().then((token) => {
      if (token) {
        console.info("[push] FCM token ready (use Firebase Console → Cloud Messaging to send a test).");
      } else if (typeof Notification !== "undefined" && Notification.permission === "default") {
        console.info("[push] Use “Allow notifications” in the bar below, then check the console for FCM TOKEN.");
      } else {
        console.warn(
          "[push] No FCM token yet — allow the site in browser notification settings, use HTTPS or localhost, and watch for [push] errors above."
        );
      }
    });
  }, [isLoading, user]);

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <Navbar />
      <PushPermissionBanner />
      <Outlet />
    </div>
  );
};

export default MainLayout;
