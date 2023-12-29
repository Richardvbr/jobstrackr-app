import { useEffect } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "./styles.module.scss";

export function ThemeToggle() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    prefersDark ? "dark" : "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const options = [
    {
      name: "light",
      label: "Light theme",
    },
    {
      name: "dark",
      label: "Dark theme",
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
            onChange={(e) => setTheme(e.target.value)}
          />
          <label htmlFor={name}>{label}</label>
        </div>
      ))}
    </fieldset>
  );
}
