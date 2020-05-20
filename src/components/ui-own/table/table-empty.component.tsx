import React from "react";
import styles from "./table.module.scss";

import { Typography } from "components/ui-libraries";
import { useTranslation } from "react-i18next";

const Empty = React.memo(function Loading(props: any) {
  const { t } = useTranslation(["common"]);

  return (
    <Typography
      {...props}
      className={styles.empty}
      color="textPrimary"
      align="center"
      gutterBottom
    >
      {t("no_results_found")}
    </Typography>
  );
});

export default Empty;
