import { DashboardPage } from '@/features/dashboard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function DashboardRoute() {
  useDocumentTitle('Dashboard | JobsTrackr');

  return <DashboardPage />;
}
