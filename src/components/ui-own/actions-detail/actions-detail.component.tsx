import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import styles from "./actions-detail.module.scss";

import { Button, Typography } from "components/ui-libraries";

import { useTranslation } from "react-i18next";

interface IActionDetailProps {
  title?: string;
  isNew: boolean;
  useFormik: boolean;
  isBlocking?: boolean;
  message?: string;
  blockUI?: any;
  doSave: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark
  }
}));

const ActionsDetail: React.FC<IActionDetailProps> = ({
  isNew,
  title,
  useFormik,
  doSave,
  isBlocking,
  message
}) => {
  const classes = useStyles();
  const { t } = useTranslation(["common"]);

  if (isBlocking) {
    return (
      <div
        className={`${styles.actions} ${classes.root} ${styles["actions--blocking"]}`}
      >
        <Typography color="textPrimary" variant="button" align="center">
          {t(message || "saving")}
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      <Typography variant="h6">{title}</Typography>
      {useFormik ? (
        <Button 
          color="primary"
          variant="contained"
          aria-label="save or update"
          type="submit"
        >
          {t(isNew ? "save" : "update")}
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          aria-label="save or update"
          onClick={doSave}
        >
          {t(isNew ? "save" : "update")}
        </Button>
      )}
    </div>
  );
};

export default ActionsDetail;
