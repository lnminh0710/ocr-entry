import React from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "components/ui-libraries";

import {
  Brightness4Icon,
  TranslateIcon,
  ChevronRightIcon,
  PaletteIcon
} from "components/ui-libraries/icons";

import { SETTINGS } from "./user-settings.constant";
import { getModeTheme } from "utils/localstorage";

import { useTranslation } from "react-i18next";

interface IUserSettingsMainProps {
  goToSubSetting: any;
}

const UserSettingsMain: React.FC<IUserSettingsMainProps> = ({
  goToSubSetting
}) => {
  const { t } = useTranslation(["common", "theme"]);
  const modeTheme = getModeTheme();

  return (
    <List>
      <ListItem button onClick={event => goToSubSetting(SETTINGS.THEMES)}>
        <ListItemIcon>
          <PaletteIcon />
        </ListItemIcon>
        <ListItemText>{t("pallete")}</ListItemText>
        <ChevronRightIcon />
      </ListItem>
      <ListItem button onClick={event => goToSubSetting(SETTINGS.DARK_THEME)}>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText>{`${t("dark_theme")}: ${t(
          `theme:${modeTheme}`
        )}`}</ListItemText>
        <ChevronRightIcon />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText>{t("language")}</ListItemText>
      </ListItem>
    </List>
  );
};

export default UserSettingsMain;
