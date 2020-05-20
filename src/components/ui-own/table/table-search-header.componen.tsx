import React from "react";
import styles from "./table.module.scss";

import { Typography } from "components/ui-libraries";

import { useTranslation } from "react-i18next";

const SearchHeader: React.FC = () => {
  const { t } = useTranslation(["common"]);
  return (
    <Typography
      className={styles.advanced_search_header}
      variant="h5"
      color="textPrimary"
    >
      {t("advanced_search")}
    </Typography>
  );
};

export default SearchHeader;
