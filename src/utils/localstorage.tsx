import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";

export const colors = [
  {
    label: "red",
    value: red
  },
  {
    label: "pink",
    value: pink
  },
  {
    label: "purple",
    value: purple
  },
  {
    label: "deepPurple",
    value: deepPurple
  },
  {
    label: "indigo",
    value: indigo
  },
  {
    label: "blue",
    value: blue
  },
  {
    label: "lightBlue",
    value: lightBlue
  },
  {
    label: "cyan",
    value: cyan
  },
  {
    label: "teal",
    value: teal
  },
  {
    label: "green",
    value: green
  },
  {
    label: "lightGreen",
    value: lightGreen
  },
  {
    label: "lime",
    value: lime
  },
  {
    label: "yellow",
    value: yellow
  },
  {
    label: "amber",
    value: amber
  },
  {
    label: "orange",
    value: orange
  },
  {
    label: "deepOrange",
    value: deepOrange
  }
];

const APP_ID = "ocr_data_entry";

export enum MODE_THEME {
  DARK = "dark",
  LIGHT = "light"
}

const THEME = `${APP_ID}_THEME_MODE`;
const SIDE_BAR = `${APP_ID}_SIDE_BAR`;
const PRIMARY_COLOR = `${APP_ID}_PRIMARY_COLOR`;
const SECONDARY_COLOR = `${APP_ID}_SECONDARY_COLOR`;

export function getModeTheme(): string {
  return localStorage.getItem(THEME) || MODE_THEME.LIGHT;
}

export function isDarkThemeMode(): boolean {
  return getModeTheme() === MODE_THEME.DARK;
}

export function setModeTheme(isDarkTheme: boolean) {
  localStorage.setItem(THEME, isDarkTheme ? MODE_THEME.DARK : MODE_THEME.LIGHT);
}

export function getStatusSideBar(): string {
  return localStorage.getItem(SIDE_BAR) || "open";
}

export function setStatusSideBar(isOpen: boolean) {
  localStorage.setItem(SIDE_BAR, isOpen ? "open" : "close");
}

export function getPrimaryKey() {
  let key = localStorage.getItem(PRIMARY_COLOR);
  if (!key || key.length < 1) {
    key = "deepOrange";
  }
  return key;
}

export function getPrimaryObject() {
  let key = getPrimaryKey();

  const color = colors.find(e => e.label === key);
  if (color) {
    return color.value;
  }
  return deepOrange;
}

export function setPrimaryColor(color: string) {
  localStorage.setItem(PRIMARY_COLOR, color);
}

export function getSecondaryKey() {
  let key = localStorage.getItem(SECONDARY_COLOR);
  if (!key || key.length < 1) {
    key = "blue";
  }
  return key;
}

export function getSecondaryObject() {
  let key = getSecondaryKey();

  const color = colors.find(e => e.label === key);
  if (color) {
    return color.value;
  }
  return blue;
}

export function setSecondaryColor(color: string) {
  localStorage.setItem(SECONDARY_COLOR, color);
}
