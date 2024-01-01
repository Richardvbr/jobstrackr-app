import { Applications } from "@/features/applications";

export function DashboardPage() {
  //   const { data: labels } = getApplicationsContentQuery();

  return (
    <section>
      <h1>Dashboard</h1>
      <Applications />
    </section>
  );
}
