import { Card, ThemeToggle } from "@/components";
import styles from "./styles.module.scss";

export function SettingsPage() {
  return (
    <section>
      <h1>Settings</h1>
      <div className={styles.cards}>
        <Card shadow title='Select your preferred theme'>
          <ThemeToggle />
        </Card>
      </div>
    </section>
  );
}
