import React from "react";
import styles from "./loading.module.scss";

import { Typography, CircularProgress } from "components/ui-libraries";

import { useTranslation } from "react-i18next";

const Loading: React.SFC = () => {
  const { t } = useTranslation(["common"]);
  return (
    <div className={styles.loading}>
      <CircularProgress size={200}></CircularProgress>
      <Typography
        className={styles.loading_title}
        variant={"h4"}
        align="center"
        color="textSecondary"
      >
        {t("please_wait")}
      </Typography>
    </div>
  );
};

export default Loading;
