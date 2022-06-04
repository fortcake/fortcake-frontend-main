import { useContext } from "react";
import { ThemeContext as StyledThemeContext } from "styled-components";
import { useTheme as useNextTheme } from "next-themes";

const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme();
  const toggleTheme = (isDark: boolean) => {
    setTheme(!isDark ? "light" : "dark");
  };

  const theme = useContext(StyledThemeContext);
  return { isDark: resolvedTheme === "dark", theme, toggleTheme };
};

export default useTheme;
