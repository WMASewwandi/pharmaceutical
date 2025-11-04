"use client";

import { useTheme } from "./ThemeProvider";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // sun
import DarkModeIcon from "@mui/icons-material/DarkMode"; // moon

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: 18,
        border: "1px solid var(--color-border)",
        background: "transparent",
        color: "inherit",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {isDark ? <Brightness7Icon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </button>
  );
}


