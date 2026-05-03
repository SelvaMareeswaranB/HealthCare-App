import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@repo/store";
import { PageLoader } from "../components/PageLoader";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuthStore();
  const location = useLocation(); // Remembers where the user wanted to go

  // 1. Loading State: Prevent flickering while Firebase initializes
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-[var(--color-app-bg)] text-[var(--color-app-text)]">
        <PageLoader message="Verifying session…" />
      </div>
    );
  }

  // 2. Auth Check: If no user, bounce to login
  if (!user) {
    // We pass 'state' so we can redirect them back later
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 3. Success: Render the actual page (e.g., your Shell Home)
  return <>{children}</>;
};