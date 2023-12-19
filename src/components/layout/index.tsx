import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSessionContext } from "@/contexts/AuthContext";
import { Header, SidePanel } from "@/components";
import styles from "./layout.module.scss";

export const AuthLayout = () => (
  <main className={styles.authPage}>
    <Outlet />
  </main>
);

export const AppLayout = () => {
  const location = useLocation();
  const { isLoading, session } = useSessionContext();

  if (isLoading) return null;

  return session ? (
    <div>
      <Header />
      <SidePanel />
      <main className={styles.appPage}>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to='/sign-in' replace state={{ from: location }} />
  );
};
