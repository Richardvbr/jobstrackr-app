import { type Theme, useTheme } from "@/contexts/ThemeContext";

import styles from "./styles.module.scss";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  type ThemeOptions = {
    value: Theme;
    label: string;
  };

  const options: ThemeOptions[] = [
    {
      value: "light",
      label: "Light theme",
    },
    {
      value: "dark",
      label: "Dark theme",
    },
    {
      value: "system",
      label: "System default",
    },
  ];

  return (
    <fieldset className={styles.fieldset}>
      {options.map(({ value, label }) => (
        <div className={styles.themeOption} key={value}>
          <input
            type='radio'
            id={value}
            value={value}
            name='theme'
            checked={value === theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
    </fieldset>
  );
}
