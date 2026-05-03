import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import { PushPermissionBanner } from "../components/PushPermissionBanner";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <Navbar />
      <PushPermissionBanner />
      <Outlet />
    </div>
  );
};

export default MainLayout;
