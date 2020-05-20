import React from "react";

import { useOwnRedux } from "./login.store";

import LoadingComponent from "../components/loading/loading.component";
import FormComponent from "./login-form.component";
import ButtonComponent from "./login-button.component";
import LayoutComponent from "./login-layout.container";
import { Typography } from "components/ui-libraries";

import { useTranslation } from "react-i18next";

interface ILoginProps { 
  history: any;
  location: any; 
}

const Login: React.FC<ILoginProps> = ({ history }) => {
  const { t } = useTranslation(["common"]);
  const { isLoading, isAuth, handleLogin } = useOwnRedux(history);

  function _renderBody(props: any) {
    if (isLoading) {
      return <LoadingComponent />;
    }
    return (
      <React.Fragment>
        <Typography variant="h5" color="textPrimary">
          {t("sign_in")}
        </Typography>
        <FormComponent t={t} {...props} />
        <ButtonComponent label={t("lets_go")} />
      </React.Fragment>
    );
  }

  return (
    <LayoutComponent
      isAuth={isAuth}
      renderBody={_renderBody}
      handleLogin={handleLogin}
    />
  );
};

export default Login;
