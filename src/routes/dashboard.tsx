import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function DashboardRoute() {
  useDocumentTitle("Dashboard | JobsTrackr");

  return <h1>Dashboard</h1>;
}
