import { Navigate } from "react-router-dom";
import { useAuthStore } from "@repo/store";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthStore();
  console.log("PublicRoute - user:", user);

  //While Firebase is checking the session, show nothing or a spinner
  if (isLoading) {
    return <div className="min-h-screen bg-app-bg text-app-text" />
  }


  //  If the user IS logged in, bounce them to the home/dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  //  If no user, allow them to see the Login/Signup page
  return <>{children}</>;
};