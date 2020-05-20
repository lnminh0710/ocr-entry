import React from "react";
import { Route, Redirect } from "react-router-dom";

import Routes from "./private.components.route";

import { useAuthDataContext } from "../../context/auth.context";

const withAuth = (Component: any) => (props: any) => {
  const { isAuth } = useAuthDataContext();

  if (!isAuth) {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }
  return <Component {...props} />;
};

const PrivateRoute: React.SFC = () => (
  <>
    {Routes.map(({ component, ...rest }: any, i) => (
      <Route key={`key_r_p_${i}`} {...rest} component={withAuth(component)} />
    ))}
  </>
);

export default PrivateRoute;
