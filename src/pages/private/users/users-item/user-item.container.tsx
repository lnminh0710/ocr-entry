import React from "react";
import styles from "./user-item.module.scss";

import { Formik } from "formik";
import UserItemSettingsComponent from "components/ui-own/actions-detail/actions-detail.component";
import UserItemFormComponent from "./user-item-form.components";
import SkeletonDetailComponent from "components/ui-own/skeleton-detail/skeleton-detail.component";
import { Drawer } from "components/ui-libraries";

import { AdminSchema, UserSchema } from "./user-item.validation";

import { useTranslation } from "react-i18next";

import useUserHook from "./user-item.hook";

const UserItemContainer: React.FC<any> = ({
  history,
  match,
  addItemInList,
  updateItemInList
}) => {
  const { t } = useTranslation(["common"]);
  const {
    state,
    isNew,
    organizations,
    roles,
    doSave,
    handleClose
  } = useUserHook(history, match, addItemInList, updateItemInList);

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
          validationSchema={state.data.isRoot ? AdminSchema : UserSchema}
          onSubmit={(values: any, actions) => {
            doSave(values);
          }}
        >
          {({ handleSubmit, ...rest }) => (
            <form onSubmit={handleSubmit}>
              <UserItemSettingsComponent
                title={t("user")}
                {...state.notification}
                isNew={isNew}
                useFormik={true}
                doSave={doSave}
              />
              <UserItemFormComponent
                roles={roles}
                t={t}
                styles={styles}
                organizations={organizations}
                {...rest}
              />
            </form>
          )}
        </Formik>
      )}
    </Drawer>
  );
};

export default UserItemContainer;
