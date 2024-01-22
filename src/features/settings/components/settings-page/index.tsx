import { useTranslation } from "react-i18next";

import { changeLanguage } from "@/utils/localization";
import { Card, ThemeToggle } from "@/components";

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("settings.title")}</h1>
      <Card shadow title='Select your preferred theme'>
        <ThemeToggle />
      </Card>
      <Card shadow title='Select your preferred language'>
        {/* <ThemeToggle /> */}
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("nl")}>NL</button>
      </Card>
    </section>
  );
}
