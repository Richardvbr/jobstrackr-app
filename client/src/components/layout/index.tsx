import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

import styles from "./layout.module.scss";
import { Header, SidePanel } from "..";

export const AuthLayout = () => (
  <main className={styles.authPage}>
    <Outlet />
  </main>
);

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.appLayout}>
    <Header />
    <SidePanel />
    <main className={styles.appPage}>{children}</main>
  </div>
);
