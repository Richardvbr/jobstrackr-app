import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ApplicationsPage } from "@/features/applications";

export function ApplicationsRoute() {
  useDocumentTitle("Applications | JobsTrackr");

  return <ApplicationsPage />;
}
