import React from "react";
import styles from "./home.module.scss";

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Paper
} from "components/ui-libraries";

import { SendIcon } from "components/ui-libraries/icons";

import useHomeHook from "./home.hook";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { roles } = useHomeHook();
  const { t } = useTranslation(["common", "home"]);

  return (
    <div className={styles.main}>
      <Typography variant="h3" gutterBottom color="secondary">
        {t("lets_work")}
      </Typography>

      {roles && roles.length > 0 && (
        <Paper classes={{ root: styles.roles }}>
          <List component="nav" aria-labelledby="nested-list-subheader">
            {roles.map((r: any, i: number) => (
              <ListItem key={i} button>
                <ListItemText primary={r.name} />
                <ListItemSecondaryAction>
                  <SendIcon />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {!roles ||
        (roles.length < 1 && (
          <Typography
            className={styles.hintError}
            variant="h4"
            gutterBottom
            color="textSecondary"
          >
            {t("home:no_rules")}
          </Typography>
        ))}
    </div>
  );
};

export default Dashboard;
