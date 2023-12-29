import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSessionContext } from "@/contexts/AuthContext";
import { Header, SidePanel } from "@/components";
import styles from "./layout.module.scss";

export function AuthLayout() {
  return (
    <main className={styles.authPage}>
      <Outlet />
    </main>
  );
}

export function AppLayout() {
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
}
