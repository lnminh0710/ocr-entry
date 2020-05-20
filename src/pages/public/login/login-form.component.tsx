import React, { useState } from "react";
import styles from "./login.module.scss";

import {
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  IconButton
} from "components/ui-libraries";

import {
  MailIcon,
  LockOpenIcon,
  VisibilityIcon,
  VisibilityOffIcon
} from "components/ui-libraries/icons";

interface ILoginFormProps {
  values: any;
  touched: any;
  errors: any;
  handleBlur: any;
  handleChange: any;
  t: any;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  t
}) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const isErrorUserName = touched.username && Boolean(errors.username);
  const isErrorPassword = touched.password && Boolean(errors.password);
  return (
    <>
      <FormControl
        classes={{ root: styles["login__field"] }}
        error={isErrorUserName}
      >
        <Input
          value={values.username}
          name="username"
          inputProps={{
            "aria-label": "username",
            autoComplete: "new-password"
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={t(`username`)}
          startAdornment={
            <InputAdornment aria-label="User Name Icon" position="start">
              <MailIcon color="action" />
            </InputAdornment>
          }
        />
        <FormHelperText>
          {isErrorUserName && t(`${errors.username}`)}
        </FormHelperText>
      </FormControl>
      <FormControl
        classes={{ root: styles["login__field"] }}
        error={Boolean(isErrorPassword)}
      >
        <Input
          placeholder={t(`password`)}
          value={values.password}
          name="password"
          inputProps={{
            "aria-label": "password",
            autoComplete: "new-password"
          }}
          onBlur={handleBlur}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          startAdornment={
            <InputAdornment aria-label="Password Icon" position="start">
              <LockOpenIcon color="action" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Change Type Password"
                edge="end"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? (
                  <VisibilityIcon color="action" />
                ) : (
                  <VisibilityOffIcon color="action" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>
          {isErrorPassword && t(`${errors.password}`)}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default LoginForm;
