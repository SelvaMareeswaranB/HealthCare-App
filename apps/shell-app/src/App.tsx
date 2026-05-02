import { useEffect } from "react";
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/route"
import { useAuthStore } from "@repo/store";

const App = () => {
  const initAuthState = useAuthStore((state) => state.initAuthState);

  useEffect(() => {
    const unsubscribe = initAuthState();
    return () => unsubscribe();
  }, [initAuthState]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App