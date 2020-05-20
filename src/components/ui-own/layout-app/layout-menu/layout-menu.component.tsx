import React, { useState } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon
} from "components/ui-libraries";

import { MenuIcon } from "components/ui-libraries/icons";

import { SIDE_BAR, ROUTES } from "../../../../constants/navigation";

import { useTranslation } from "react-i18next";

interface ILayoutMenuProps extends RouteComponentProps<any> {
  authData?: any;
  history: any;
}

const LayoutMenu: React.FC<ILayoutMenuProps> = ({ authData, history }) => {
  const { t } = useTranslation(["common"]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function doChangePage(event: React.MouseEvent<HTMLElement>) {
    try {
      const url = event.currentTarget.getAttribute("value");
      history.push(url);
    } catch (error) {
      console.log(error);
    }

    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        edge="start"
        color="primary"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon color="action" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {SIDE_BAR.map((e, i) => {
          if (e.linkTo !== ROUTES.Home && e.linkTo !== ROUTES.Dashboard) {
            if (!authData || !authData.isRoot) {
              return null;
            }
          }

          return (
            <MenuItem
              key={`lm_h_${e.linkTo}`}
              value={e.linkTo}
              onClick={doChangePage}
            >
              <ListItemIcon>{e.icon}</ListItemIcon>
              {t(e.keyi18n)}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default withRouter(LayoutMenu);
