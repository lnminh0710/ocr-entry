import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import InputLabelUI from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: Theme) => ({
  labelAsterisk: {
    color: theme.palette.error.main
  }
}));

export function InputLabel(props: any) {
  const classLocals = useStyles();

  if (!props.required) {
    return <InputLabelUI {...props} />;
  }

  const { classes, ...rest } = props;
  return (
    <InputLabelUI
      {...rest}
      classes={{
        ...classes,
        asterisk: classLocals.labelAsterisk
      }}
    />
  );
}
