import React from "react";
import style from "./layout.module.scss";

import { AppBar, Toolbar, Typography } from "components/ui-libraries";

import MenuComponent from "./layout-menu/layout-menu.component";
import UserSettingsComponent from "../user-settings/user-settings.component";

import { useTranslation } from "react-i18next";

interface IProps {
    isAuth: boolean;
    authData?: any;
    onLogout: Function;
}

const LayoutHeader: React.SFC<IProps> = ({ isAuth, authData, onLogout }) => {
    const { t } = useTranslation(["common"]);

    if (!isAuth) {
        return null;
    }

    return (
        <AppBar color="default" id="a-h-t" classes={{ root: style.header }}>
            <Toolbar variant="dense">
                {/* <MenuComponent authData={authData} /> */}
                <Typography
                    color="textPrimary"
                    variant="h6"
                    className={style.header__title}
                >
                    Data entry
                </Typography>
                <UserSettingsComponent
                    authData={authData}
                    classes={{ avatar: style.header__settings }}
                    onLogout={onLogout}
                />
            </Toolbar>
        </AppBar>
    );
};

export default LayoutHeader;
