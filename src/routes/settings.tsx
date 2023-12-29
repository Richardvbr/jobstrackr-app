import { SettingsPage } from "@/features/settings";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SettingsRoute() {
  useDocumentTitle("Settings | JobsTrackr");

  return <SettingsPage />;
}
