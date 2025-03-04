import { useEffect, useState } from "react";

const theme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <button
      onClick={toggleTheme}
      className="absolute bottom-0 p-2 rounded bg-gray-100 border border-2/1 dark:bg-gray-800 text-black dark:text-white"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default theme;
