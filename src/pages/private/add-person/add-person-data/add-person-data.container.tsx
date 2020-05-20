import React from "react";
import classnames from "classnames";

// import { useTranslation } from "react-i18next";
import styles from "./add-person-data.module.scss";

import AddPersonDataComponent from "./add-person-data.components";

import { DataState } from "./add-person-data.hook";

interface IAddPersonDataProps {
  addRecord: Function;
  setTableState: Function;
  setFieldFocus: Function;
  selectRecord: Function;
  //End func
  styleDarkMode: any;
  isEmpty: boolean;
  state: DataState;
  documentTableRef: any;
}

const AddPersonDataContainer: React.FC<IAddPersonDataProps> = ({
  setTableState,
  addRecord,
  setFieldFocus,
  selectRecord,
  //End function
  styleDarkMode,
  isEmpty,
  state,
  documentTableRef
}) => {
  // const { t } = useTranslation(["common"]);

  if (state.tableState === 0) {
    return (
      <div
        className={styles["document__hide"]}
        onClick={() => !isEmpty && setTableState(1)}
      >
        Document
      </div>
    );
  }

  return (
    <div
      className={classnames(styles["document__show"], {
        [styleDarkMode.bgLevel2]: true
      })}
      ref={documentTableRef}
    >
      <AddPersonDataComponent
        addRecord={addRecord}
        setTableState={setTableState}
        setFieldFocus={setFieldFocus}
        setRecordIndexSelected={selectRecord}
        styles={styles}
        styleDarkMode={styleDarkMode}
        state={state}
      ></AddPersonDataComponent>
    </div>
  );
};

export default AddPersonDataContainer;
