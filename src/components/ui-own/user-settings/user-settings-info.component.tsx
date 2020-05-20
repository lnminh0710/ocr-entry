import React from "react";
import styles from "./user-settings.module.scss";

import { AccountBoxIcon } from "components/ui-libraries/icons";
import Typography from "../../ui-own/typography-nowrap";

interface IProps {
  authData: any;
}

const UserSettingsInfo: React.FC<IProps> = ({ authData }) => {
  return (
    <div className={styles.userinfo}>
      <div className={styles.userinfo_image}>
        <AccountBoxIcon color="primary" />
      </div>
      <div className={styles.userinfo_detail}>
        <Typography
          component="div"
          title={authData.username}
          color="textPrimary"
        >
          {authData.username}
        </Typography>
        <Typography
          component="div"
          title={authData.sub}
          color="textSecondary"
        >
          {authData.sub}
        </Typography>
      </div>
    </div>
  );
};

export default UserSettingsInfo;
