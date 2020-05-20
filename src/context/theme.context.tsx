import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback
} from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import {
  isDarkThemeMode,
  setModeTheme,
  getPrimaryObject,
  getSecondaryObject,
  MODE_THEME
} from "utils/localstorage";

import { loadFont } from "utils/font.util";

export const ThemesContext = createContext<any>(null);

const ThemesProvider = (props: any) => {
  const themeUI = useTheme();
  const isMobile = useMediaQuery(themeUI.breakpoints.down("sm"));

  const generateTheme = useCallback(
    function generateTheme() {
      return createMuiTheme({
        palette: {
          type: isDarkThemeMode() ? MODE_THEME.DARK : MODE_THEME.LIGHT,
          background: {
            default: isDarkThemeMode() ? "#303030" : "#f3f3f3"
          },
          primary: getPrimaryObject(),
          secondary: getSecondaryObject()
        },
        spacing: isMobile ? 4 : 8,
        typography: {
          fontSize: isMobile ? 12 : 14
        }
      });
    },
    [isMobile]
  );

  const [theme, setTheme] = useState<any>(generateTheme());

  useEffect(() => {
    loadFont();
  }, []);

  useEffect(() => {
    setTheme(generateTheme());
  }, [generateTheme]);

  function changeModeType(isDarkTheme: boolean) {
    setModeTheme(isDarkTheme);
    setTheme(generateTheme());
  }

  function changeColor() {
    setTheme(generateTheme());
  }

  return (
    <ThemesContext.Provider value={{ changeModeType, changeColor, isMobile }}>
      <ThemeProvider theme={theme} {...props} />
    </ThemesContext.Provider>
  );
};

export const useThemesContext = () => useContext<any>(ThemesContext);

export default ThemesProvider;
