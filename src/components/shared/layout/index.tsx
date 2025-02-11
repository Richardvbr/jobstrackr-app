import { Navigate, Outlet } from 'react-router-dom';
import { useSessionContext } from '@/contexts/AuthContext';
import { Header, SidePanel } from '@/components/shared';
import styles from './layout.module.scss';

export function AuthLayout() {
  return (
    <main className={styles.authPage}>
      <Outlet />
    </main>
  );
}

export function AppLayout() {
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
    <Navigate to='/sign-in' replace />
  );
}
