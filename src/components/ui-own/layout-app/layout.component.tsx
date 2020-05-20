import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import style from "./layout.module.scss";

import CssBaseline from "@material-ui/core/CssBaseline";

import LayoutHeaderComponent from "./layout-header.component";

import { useGlobalStore } from "../../../store/index.store";
import { useAuthDataContext } from "../../../context/auth.context";
import { loadFont } from "../../../utils/font.util";
import { SET_ROLES } from "../../../store/reducer/auth.reducer";

import useRoleServices from "services/role.service";

import classnames from "classnames";

import { lazyLoadBG } from "utils/image.util";

import ImgBg from "styles/images/bg_body.png";

const Layout: React.FC = ({ children }) => {
  const [isShow, setShow] = useState<boolean>(false);
  const { isAuth, authData, onLogout } = useAuthDataContext();
  const { dispatch } = useGlobalStore();
  const { apiGetRolesUser } = useRoleServices();

  useEffect(() => {
    loadFont();

    setTimeout(() => {
      setShow(true);
    }, 800);
  }, []);

  const loadData = useCallback(async () => {
    if (!authData) {
      return;
    }

    lazyLoadBG("root-body", ImgBg);

    const roles = await apiGetRolesUser(authData._id);
   
    dispatch({ type: SET_ROLES, roles });
  }, [dispatch, apiGetRolesUser, authData]);

  useEffect(() => {
    let runFirstLoad = async () => {
      await loadData();
    };

    loadFont();

    runFirstLoad();
  }, [loadData]);

  return (
    <>
      <CssBaseline />
      <div
        id="root-body"
        className={classnames("scrollbar", {
          [style["body--not-login"]]: !isAuth,
          [style["body--has-login"]]: isAuth
        })}
      >
        <LayoutHeaderComponent
          isAuth={isAuth}
          authData={authData}
          onLogout={onLogout}
        />
        {isShow && <div className={style.wrapper}>{children}</div>}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
