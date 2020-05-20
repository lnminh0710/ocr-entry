import React from "react";
import InputUI from "@material-ui/core/Input";

export function Input(props: any) {
  if (!props.required) {
    return <InputUI {...props} />;
  }

  const { InputLabelProps, ...rest } = props;
  return (
    <InputUI
      {...rest}
      InputLabelProps={{
        ...InputLabelProps
      }}
    />
  );
}

Input.defaultProps = {
  inputProps: {
    maxLength: 255
  }
};
