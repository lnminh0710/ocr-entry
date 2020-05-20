import React from "react";

import {
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  Input,
  Checkbox,
  FormControlLabel
} from "components/ui-libraries";

interface IUserItemFormProps {
  t: any;
  styles: any;
  values: any;
  touched: any;
  errors: any;
  handleBlur: any;
  handleChange: any;
}

const UserItemFormContainer: React.FC<IUserItemFormProps> = ({
  t,
  styles,
  values,
  touched,
  errors,
  handleBlur,
  handleChange
}) => {
  const isErrorName = touched.name && Boolean(errors.name);
  const isErrorUrl = touched.url && Boolean(errors.url);

  return (
    <Grid className={styles.form} container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth error={isErrorName}>
          <InputLabel required htmlFor="component-helper">
            {t("name")}
          </InputLabel>
          <Input
            value={values.name}
            name="name"
            inputProps={{
              "aria-label": "rolename"
            }}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormHelperText>{isErrorName && t(`${errors.name}`)}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth error={isErrorUrl}>
          <InputLabel required htmlFor="component-helper">
            {t("url")}
          </InputLabel>
          <Input
            value={values.url}
            name="url"
            inputProps={{
              "aria-label": "url"
            }}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormHelperText>{isErrorUrl && t(`${errors.url}`)}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="active"
              checked={values.active || false}
              onChange={handleChange}
            />
          }
          label={t("active")}
        />
      </Grid>
    </Grid>
  );
};

export default UserItemFormContainer;
