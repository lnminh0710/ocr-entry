import React from "react";
import styles from "./table.module.scss";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Typography } from "components/ui-libraries";
import { useTranslation } from "react-i18next";

const useBackgroundStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      "& div": {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: `0 0 20px ${theme.palette.secondary.main}`
      }
    },
    loading: {
      backgroundColor: theme.palette.background.default,
      opacity: 0.9
    }
  })
);

const Loading = React.memo(function Loading(props: any) {
  const classes = useBackgroundStyles();
  const { t } = useTranslation(["common"]);

  return (
    <div {...props} className={`${classes.loading} ${styles.loading}`}>
      <div className={styles.loading__container}>
        <Typography color="textPrimary" align="center" gutterBottom>
          {t("loading")}
        </Typography>
        <div className={`${styles.loading__loader} ${classes.loader}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
});

export default Loading;
