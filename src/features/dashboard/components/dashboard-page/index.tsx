import { Applications } from "@/features/applications";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
  //   const { data: labels } = getApplicationsContentQuery();

  const { t, i18n } = useTranslation();

  const changeLanguageHandler = () => {
    i18n.changeLanguage("nl");
  };

  return (
    <section>
      <button onClick={changeLanguageHandler}>Change language</button>
      <h1>{t("home")}</h1>
      <Applications />
    </section>
  );
}
