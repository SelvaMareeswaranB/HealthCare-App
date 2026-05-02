import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@repo/store";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthStore();
  const location = useLocation(); // Remembers where the user wanted to go

  // 1. Loading State: Prevent flickering while Firebase initializes
  if (isLoading) return <div className="loading-screen">Verifying Session...</div>;

  // 2. Auth Check: If no user, bounce to login
  if (!user) {
    // We pass 'state' so we can redirect them back later
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 3. Success: Render the actual page (e.g., your Shell Home)
  return <>{children}</>;
};