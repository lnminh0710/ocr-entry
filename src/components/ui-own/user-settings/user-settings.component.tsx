import React, { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { IconButton, Popover, Divider } from "components/ui-libraries";

import { PersonIcon } from "../../ui-libraries/icons";

import SettingsMain from "./user-settings-main.component";
import SettingsTheme from "./user-settings-theme.component";
import SettingsThemDarkTheme from "./user-settings-theme-dark-theme.component";
import SettingsThemPallete from "./user-settings-theme-pallete.component";
import SettingsInfo from "./user-settings-info.component";

import { SETTINGS } from "./user-settings.constant";

interface IUserSettingsProps {
    classes: any;
    authData: any;
    onLogout: Function;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 300
        }
    })
);

const UserSettings: React.FC<IUserSettingsProps> = ({ authData, onLogout }) => {
    const classeOwns = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [tabTypeSub, setTabTypeSub] = useState<number>(-1);

    function handleClick(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
        setTabTypeSub(SETTINGS.EMPTY);
    }

    function doLogout() {
        onLogout();
    }

    function goToSubSetting(type: number) {
        setTabTypeSub(type);
    }

    function doBack() {
        goToSubSetting(SETTINGS.EMPTY);
    }

    function getSubSetting(type: number) {
        switch (type) {
            case SETTINGS.DARK_THEME:
                return <SettingsThemDarkTheme doBack={doBack} />;
            case SETTINGS.THEMES:
                return <SettingsThemPallete doBack={doBack} />;
            default:
                return null;
        }
    }

    return (
        <>
            <IconButton
                edge="end"
                aria-label="Settings"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <PersonIcon />
            </IconButton>
            <Popover
                transitionDuration={200}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                <div className={classeOwns.root}>
                    {tabTypeSub === SETTINGS.EMPTY && (
                        <>
                            {/* <SettingsInfo authData={authData} /> */}
                            {/* <Divider /> */}
                            <SettingsTheme goToSubSetting={goToSubSetting} />
                            {/* <Divider /> */}
                            {/* <SettingsMain doLogout={doLogout} /> */}
                        </>
                    )}
                    {tabTypeSub !== SETTINGS.EMPTY && getSubSetting(tabTypeSub)}
                </div>
            </Popover>
        </>
    );
};

export default UserSettings;
