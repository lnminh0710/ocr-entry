import React from "react";

import { Chip } from "../../ui-libraries";

import { useChipStyles } from "utils/theme.util";

import classnames from "classnames";

import { useTranslation } from "react-i18next";

const Status: React.FC<any> = ({ active }) => {
  const classesChip = useChipStyles();
  const { t } = useTranslation(["common"]);

  return (
    <Chip
      label={t(active ? "active" : "deactive")}
      className={classnames(classesChip.chip, {
        [classesChip["chip__success"]]: active
      })}
    />
  );
};

export default Status;
