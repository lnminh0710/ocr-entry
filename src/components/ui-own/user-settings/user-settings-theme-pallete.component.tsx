import React, { useState, useMemo } from "react";
import styles from "./user-settings.module.scss";

import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "components/ui-libraries";

import Layout from "./components/subsetting-layout.component";
import { useThemesContext } from "context/theme.context";

import {
  colors,
  getPrimaryKey,
  getSecondaryKey,
  setPrimaryColor,
  setSecondaryColor
} from "utils/localstorage";
import { TIMEOUT } from "constants/common";

import { useTranslation } from "react-i18next";

interface IPalleteProps {
  doBack: any;
}

let timeoutId: any = 0;

const Pallete: React.FC<IPalleteProps> = ({ doBack }) => {
  const { t } = useTranslation(["common"]);
  const [primary, setPrimary] = useState<any>(getPrimaryKey());
  const [secondary, setSecondary] = useState<any>(getSecondaryKey());
  const { changeColor } = useThemesContext();

  function handleChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    if (event.target.name === "primary") {
      setPrimary(event.target.value);

      setPrimaryColor(String(event.target.value));
    } else {
      setSecondary(event.target.value);

      setSecondaryColor(String(event.target.value));
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      changeColor();
    }, TIMEOUT.Default);
  }

  const optionPrimary = useMemo(() => {
    const arr: any = [];
    colors.forEach((e, i) => {
      arr.push(
        <MenuItem key={i} value={e.label}>
          <div
            style={{
              width: 30,
              height: 30,
              backgroundColor: e.value[500],
              marginRight: 8
            }}
          ></div>
          {t(`color:${e.label}`)}
        </MenuItem>
      );
    });
    return arr;
  }, [t]);

  const optionSecondary = useMemo(() => {
    const arr: any = [];
    colors.forEach((e, i) => {
      arr.push(
        <MenuItem key={i} value={e.label}>
          <div
            style={{
              width: 30,
              height: 30,
              backgroundColor: e.value.A400,
              marginRight: 8
            }}
          ></div>
          {t(`color:${e.label}`)}
        </MenuItem>
      );
    });
    return arr;
  }, [t]);

  return (
    <Layout
      doBack={doBack}
      title={t("pallete")}
      body={
        <>
          <Typography className={styles.pallete_tip} variant="body1">
            {t("pallete_tip_1")}
          </Typography>
          <Typography className={styles.pallete_tip} variant="body1">
            {t("pallete_tip_2")}
          </Typography>
          <FormControl className={styles.pallete_select} fullWidth>
            <InputLabel htmlFor="primary">{t("primary")}</InputLabel>
            <Select
              onChange={handleChange}
              classes={{ select: styles.pallete_select_item }}
              value={primary}
              inputProps={{
                name: "primary",
                id: "primary"
              }}
            >
              {optionPrimary}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="secondary">{t("secondary")}</InputLabel>
            <Select
              onChange={handleChange}
              classes={{ select: styles.pallete_select_item }}
              value={secondary}
              inputProps={{
                name: "secondary",
                id: "secondary"
              }}
            >
              {optionSecondary}
            </Select>
          </FormControl>
        </>
      }
    />
  );
};

export default Pallete;
