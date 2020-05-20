import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import TextFieldUI from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) => ({
  labelAsterisk: {
    color: theme.palette.error.main
  }
}));

export function TextField(props: any) {
  const classes = useStyles();

  if (!props.required) {
    return <TextFieldUI {...props} />;
  }

  const { InputLabelProps, ...rest } = props;
  return (
    <TextFieldUI
      {...rest}
      InputLabelProps={{
        ...InputLabelProps,
        classes: {
          asterisk: classes.labelAsterisk
        }
      }}
    />
  );
}

TextField.defaultProps = {
  inputProps: {
    maxLength: 255
  }
};
