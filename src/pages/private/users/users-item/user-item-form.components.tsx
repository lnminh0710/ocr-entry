import React, { useState, useEffect } from "react";

import {
  Grid,
  FormControl,
  TextField,
  InputLabel,
  FormHelperText,
  MenuItem,
  Chip,
  Select as SelectUI,
  Input,
  Checkbox,
  FormControlLabel
} from "components/ui-libraries";

const UserItemFormContainer: React.FC<any> = ({
  t,
  organizations,
  roles,
  styles,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue
}) => {
  const [groups, setGroups] = useState<any>([]);
  const isErrorUserName = touched.username && Boolean(errors.username);
  const isErrorSecretKey = touched.secretKey && Boolean(errors.secretKey);
  const isErrorPassword = touched.password && Boolean(errors.password);

  useEffect(() => {
    if (!organizations) {
      return;
    }
    const organization = organizations.find(
      (o: any) => o._id === values.organizationId
    );

    const groups =
      organization && organization.groups ? organization.groups : [];

    setGroups(groups);
  }, [values.organizationId, organizations]);

  function handleOrgChange(e: any) {
    setFieldValue("groupId", "");
   
    handleChange(e);
  }

  return (
    <Grid className={styles.form} container spacing={3}>
      <Grid item xs={6}>
        <FormControl fullWidth error={isErrorUserName}>
          <InputLabel required htmlFor="component-helper">
            {t("username")}
          </InputLabel>
          <Input
            autoFocus
            autoComplete="new-password"
            value={values.username}
            name="username"
            inputProps={{
              "aria-label": "username"
            }}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormHelperText>
            {isErrorUserName && t(`${errors.username}`)}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth error={isErrorPassword}>
          <InputLabel required htmlFor="component-helper">
            {t("password")}
          </InputLabel>
          <Input
            autoComplete="new-password"
            value={values.password}
            name="password"
            inputProps={{
              "aria-label": "password"
            }}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormHelperText>
            {isErrorPassword && t(`${errors.password}`)}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          name="fullName"
          fullWidth
          label={t("fullname")}
          value={values.fullName}
          inputProps={{
            "aria-label": "fullName"
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          name="email"
          fullWidth
          label={t("email")}
          value={values.email}
          inputProps={{
            "aria-label": "email"
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="org">{t("organization")}</InputLabel>
          <SelectUI
            value={values.organizationId || ""}
            onChange={handleOrgChange}
            inputProps={{
              name: "organizationId",
              id: "organizationId"
            }}
          >
            {organizations.map((e: any, i: number) => (
              <MenuItem key={i} value={e._id}>
                {e.name}
              </MenuItem>
            ))}
          </SelectUI>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="org">{t("group")}</InputLabel>
          <SelectUI
            value={groups.length > 0 ? values.groupId || "" : ""}
            onChange={handleChange}
            inputProps={{
              name: "groupId",
              id: "groupId"
            }}
          >
            {groups.map((e: any, i: number) => (
              <MenuItem key={i} value={e._id}>
                {e.name}
              </MenuItem>
            ))}
          </SelectUI>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="select-functions">{t("functions")}</InputLabel>
          <SelectUI
            multiple
            name="roleIds"
            value={values.roleIds || []}
            onChange={handleChange}
            input={<Input id="select-functions" />}
            renderValue={(selected: any) => (
              <>
                {(selected as any[]).map(roleId => {
                  const role = roles.find((r: any) => r._id === roleId);

                  if (!role) {
                    return null;
                  }

                  return (
                    <Chip
                      className={styles.chip}
                      key={role._id}
                      label={role.name}
                    />
                  );
                })}
              </>
            )}
          >
            {roles.map((r: any) => (
              <MenuItem key={r._id} value={r._id}>
                {r.name}
              </MenuItem>
            ))}
          </SelectUI>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
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

      {values.isRoot && (
        <Grid item xs={6}>
          <FormControl fullWidth error={isErrorSecretKey}>
            <InputLabel required htmlFor="component-helper">
              {t("secret_key")}
            </InputLabel>
            <Input
              value={values.secretKey}
              name="secretKey"
              inputProps={{
                "aria-label": "secretKey"
              }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormHelperText>
              {isErrorSecretKey && t(`${errors.secretKey}`)}
            </FormHelperText>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default UserItemFormContainer;
