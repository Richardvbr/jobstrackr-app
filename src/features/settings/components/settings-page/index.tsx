import { useTranslation } from "react-i18next";

import { Card, ThemeToggle } from "@/components";
import { ChangeLanguage } from "@/components/change-language";

import styles from "./styles.module.scss";

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <section>
      <h1>{t("settings.title")}</h1>
      <div className={styles.cards}>
        <Card shadow title='Select your preferred theme'>
          <ThemeToggle />
        </Card>
        <Card shadow title='Select your preferred language'>
          <ChangeLanguage />
        </Card>
      </div>
    </section>
  );
}
