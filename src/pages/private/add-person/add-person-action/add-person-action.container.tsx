import React from "react";
// import { useTranslation } from "react-i18next";
import styles from "./add-person-action.module.scss";

import AddPersonActionComponent from "./add-person-action.components";
import useAddPersonActionHook from "./add-person-action.hook";

interface IAddPersonActionProps {
  openTreeView: Function;
  isEmpty: boolean;
  isTreeView: boolean;
}

const AddPersonActionContainer: React.FC<IAddPersonActionProps> = ({
  openTreeView,
  isEmpty,
  isTreeView
}) => {
  // const { t } = useTranslation(["common"]);
  const actionProps = useAddPersonActionHook();

  return (
    <div className={styles["add-person-action"]}>
      <AddPersonActionComponent
        {...actionProps}
        openTreeView={openTreeView}
        styles={styles}
        isEmpty={isEmpty}
        isTreeView={isTreeView}
      ></AddPersonActionComponent>
    </div>
  );
};

export default AddPersonActionContainer;
