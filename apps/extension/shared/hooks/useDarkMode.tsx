import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const DEFAULT_THEME: Theme = "dark";

const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme ? savedTheme : DEFAULT_THEME;
  });

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  return { theme, toggleTheme };
};

export default useDarkMode;
