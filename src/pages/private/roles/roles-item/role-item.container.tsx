import React from "react";
import styles from "./role-item.module.scss";

import { Formik } from "formik";
import RoleItemSettingsComponent from "components/ui-own/actions-detail/actions-detail.component";
import RoleItemFormComponent from "./role-item-form.components";
import SkeletonDetailComponent from "components/ui-own/skeleton-detail/skeleton-detail.component";
import { Drawer } from "components/ui-libraries";

import RoleSchema from "./role-item.validation";

import { useTranslation } from "react-i18next";

import useRoleHook from "./role-item.hook";

const RoleItemContainer: React.FC<any> = ({
  history,
  match,
  addItemInList,
  updateItemInList
}) => {
  const { t } = useTranslation(["common"]);
  const { state, isNew, doSave, handleClose } = useRoleHook(
    history,
    match,
    addItemInList,
    updateItemInList
  );

  return (
    <Drawer
      classes={{ paper: styles.drawer }}
      anchor="right"
      open={true}
      onClose={handleClose}
    >
      {state.isLoading && <SkeletonDetailComponent />}
      {!state.isLoading && (
        <Formik
          initialValues={state.data}
          validationSchema={RoleSchema}
          onSubmit={(values: any) => {
            doSave(values);
          }}
        >
          {({ handleSubmit, ...rest }) => {
            return (
              <form onSubmit={handleSubmit}>
                <RoleItemSettingsComponent
                  isNew={isNew}
                  {...state.notification}
                  useFormik={true}
                  doSave={doSave}
                  title={t("function")}
                />
                <RoleItemFormComponent t={t} styles={styles} {...rest} />
              </form>
            );
          }}
        </Formik>
      )}
    </Drawer>
  );
};

export default RoleItemContainer;
