import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "@/contexts/AuthContext";

const PrivateRoutes = () => {
  const location = useLocation();
  const session = useSession();

  return session ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
