import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useBackgroundStyles = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      backgroundColor: theme.palette.background.default
    }
  })
);

const isDarkMode = (theme: Theme) => {
  return theme.palette.type === "dark";
};

export const useAddPersonStyle = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      backgroundColor: theme.palette.background.default
    },
    bgLevel1: {
      backgroundColor: isDarkMode(theme) ? "#616161" : "#fff"
    },
    bgLevel2: {
      backgroundColor: isDarkMode(theme) ? "#353535" : "#eeeeee"
    },
    bgSelected: {
      backgroundColor: theme.palette.action.selected
    },
    imageInvert: {
      filter: isDarkMode(theme) ? "invert(100%)" : "invert(0%)"
    },
    treeInvert: {
      filter: isDarkMode(theme) ? "invert(74%)" : "invert(0%)"
    }
  })
);

export const useChipStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      minWidth: 79,
      height: "21px !important",
      borderRadius: `${theme.shape.borderRadius}px !important`
    },
    chip__success: {
      color: `${theme.palette.getContrastText("#689f38")} !important`,
      backgroundColor: "#689f38 !important",
      borderColor: "#558b2f !important"
    },
    chip__error: {
      color: `${theme.palette.getContrastText(
        theme.palette.error.main
      )} !important`,
      backgroundColor: `${theme.palette.error.main} !important`,
      borderColor: `${theme.palette.error.dark} !important`
    }
  })
);
