import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { DashboardPage } from '@/components/dashboard';

export function DashboardRoute() {
  useDocumentTitle('Dashboard | JobsTrackr');

  return <DashboardPage />;
}
