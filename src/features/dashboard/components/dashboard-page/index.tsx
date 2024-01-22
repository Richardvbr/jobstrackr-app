import { Applications } from "@/features/applications";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
  //   const { data: labels } = getApplicationsContentQuery();

  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("home")}</h1>
      <Applications />
    </section>
  );
}
