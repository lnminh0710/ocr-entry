import React, { useState } from "react";
import styles from "./user-settings.module.scss";

import { Typography, Switch, FormControlLabel } from "components/ui-libraries";

import Layout from "./components/subsetting-layout.component";
import { useThemesContext } from "context/theme.context";
import { MODE_THEME, getModeTheme } from "utils/localstorage";

import { useTranslation } from "react-i18next";

import { TIMEOUT } from "constants/common";

interface IDarkThemeProps {
  doBack: any;
}

let timeoutId: any = 0;

const DarkTheme: React.FC<IDarkThemeProps> = ({ doBack }) => {
  const [mode, setMode] = useState(getModeTheme() === MODE_THEME.DARK);
  const { t } = useTranslation(["common"]);
  const { changeModeType } = useThemesContext();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.checked;
    setMode(value);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      changeModeType(value);
    }, TIMEOUT.Default);
  }

  return (
    <Layout
      doBack={doBack}
      title={t("dark_theme")}
      body={
        <>
          <Typography className={styles.dark_theme_tip} variant="body1">
            {t("dark_theme_tip_1")}
          </Typography>
          <Typography className={styles.dark_theme_tip} variant="body1">
            {t("dark_theme_tip_2")}
          </Typography>
          <FormControlLabel
            className={styles.dark_theme_switch}
            value="start"
            control={
              <Switch checked={mode} color="primary" onChange={handleChange} />
            }
            label={
              <Typography variant="button" display="block" gutterBottom>
                {t("dark_theme")}
              </Typography>
            }
            labelPlacement="start"
          />
        </>
      }
    />
  );
};

export default DarkTheme;
