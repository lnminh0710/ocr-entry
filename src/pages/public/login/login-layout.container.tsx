import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Redirect } from "react-router-dom";
import styles from "./login.module.scss";

import { Formik } from "formik";

import { MODE_THEME } from "utils/localstorage";

import LoginSchema from "./login.yui";
import { ROUTES } from "constants/navigation";
import MapWhite from "styles/images/map_white.png";
import MapBlack from "styles/images/map_black.png";

import classnames from "classnames";

// Load before access home page, improve user experience
import(
  /* webpackPrefetch: true */ "../../private/home/home.container"
);

export const useBackgroundStyles = makeStyles((theme: Theme) => {
  return createStyles({
    layout: {
      backgroundImage:
        theme.palette.type !== MODE_THEME.DARK
          ? `url(${MapWhite})`
          : `url(${MapBlack})`,
      backgroundColor: `${theme.palette.background.paper} !important`,
      backgroundRepeat: "no-repeat"
    }
  });
});

const userDefault = {
  username: "",
  password: ""
};

const Login: React.FC<any> = props => {
  const classeLayout = useBackgroundStyles();

  if (props.isAuth) {
    return <Redirect to={ROUTES.Dashboard} />;
  }

  return (
    <Formik
      initialValues={userDefault}
      validationSchema={LoginSchema}
      onSubmit={(values: any, actions) => {
        props.handleLogin(values);
      }}
    >
      {({ handleSubmit, ...rest }) => {
        return (
          <div className={classnames(styles.login, classeLayout.layout)}>
            <form onSubmit={handleSubmit}>{props.renderBody(rest)}</form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
