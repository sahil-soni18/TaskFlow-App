import React, { useState } from "react";
import { ThemeContext, type ThemeMode } from "./ThemeContext";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "../Theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved) return saved;

    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return systemDark ? "dark" : "light";
  });

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
