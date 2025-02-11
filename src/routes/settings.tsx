import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { SettingsPage } from '@/components/settings';

export function SettingsRoute() {
  useDocumentTitle('Settings | JobsTrackr');

  return <SettingsPage />;
}
