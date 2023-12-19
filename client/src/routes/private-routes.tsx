import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSessionContext } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout";

const PrivateRoutes = () => {
  const location = useLocation();
  const { isLoading, session } = useSessionContext();

  if (isLoading) return null;

  return session ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to='/sign-in' replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
