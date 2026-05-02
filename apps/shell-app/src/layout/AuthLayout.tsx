import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-app-bg text-app-text">
      
        <Outlet />
    
    </div>
  );
};

export default AuthLayout;