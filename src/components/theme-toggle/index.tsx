import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

type Theme = "light" | "dark";

const ThemeToggle = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    prefersDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className='theme-toggle' onClick={switchTheme}>
      Switch theme
    </div>
  );
};

export default ThemeToggle;
