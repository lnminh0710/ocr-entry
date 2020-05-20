import React from "react";
import styles from "./subsetting-layout.module.scss";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "components/ui-libraries";

import { ArrowBackIcon } from "components/ui-libraries/icons";

interface ISubSettingLayoutProps {
  title: any;
  body: any;
  doBack: any;
}

const SubSettingLayout: React.FC<ISubSettingLayoutProps> = ({
  title,
  body,
  doBack
}) => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={doBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles.subsettings}>{body}</div>
    </div>
  );
};

export default SubSettingLayout;
