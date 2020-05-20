import React from "react";
// import { useTranslation } from "react-i18next";

import styles from "./add-person-capture.module.scss";

import AddPersonCaptureComponent from "./add-person-capture.components";
import { RecordModel } from "../add-person-data/add-person-data.hook";

interface IAddPersonCaptureProps {
  onFieldKeyDown: Function;
  onFocusField: Function;
  changeValueByRecordId: Function;
  record: RecordModel;
  isEmpty: boolean;
  styleDarkMode: any;
  state: any;
}

const AddPersonCaptureContainer: React.FC<IAddPersonCaptureProps> = ({
  onFieldKeyDown,
  onFocusField,
  changeValueByRecordId,
  isEmpty,
  styleDarkMode,
  record,
  state
}) => {
  return (
    <AddPersonCaptureComponent
      styles={styles}
      styleDarkMode={styleDarkMode}
      isEmpty={isEmpty}
      state={state}
      datas={record ? record.fields : []}
      onFieldKeyDown={onFieldKeyDown}
      onFieldChange={(fieldName: string, value: any) =>
        changeValueByRecordId(record.recordId, fieldName, value)
      }
      onFocusField={onFocusField}
    ></AddPersonCaptureComponent>
  );
};

export default AddPersonCaptureContainer;
