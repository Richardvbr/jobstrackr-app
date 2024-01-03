import { type Theme, useTheme } from "@/contexts/ThemeContext";

import styles from "./styles.module.scss";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  type ThemeOptions = {
    name: Theme;
    label: string;
  };

  const options: ThemeOptions[] = [
    {
      name: "light",
      label: "Light theme",
    },
    {
      name: "dark",
      label: "Dark theme",
    },
    {
      name: "system",
      label: "System default",
    },
  ];

  return (
    <fieldset className={styles.fieldset}>
      {options.map(({ name, label }) => (
        <div className={styles.themeOption} key={name}>
          <input
            type='radio'
            id={name}
            value={name}
            name='theme'
            checked={name === theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          />
          <label htmlFor={name}>{label}</label>
        </div>
      ))}
    </fieldset>
  );
}
