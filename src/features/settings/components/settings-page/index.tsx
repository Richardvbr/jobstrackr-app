import { Card, ThemeToggle } from "@/components";

export function SettingsPage() {
  return (
    <section>
      <h1>Settings</h1>
      <Card shadow title='Select your preferred theme'>
        <ThemeToggle />
      </Card>
    </section>
  );
}
