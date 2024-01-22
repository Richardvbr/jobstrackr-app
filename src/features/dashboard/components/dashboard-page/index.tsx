import { useTranslation } from "react-i18next";
import { Applications } from "@/features/applications";

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("dashboard.title")}</h1>
      <Applications />
    </section>
  );
}
