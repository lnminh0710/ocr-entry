import React from "react";

import clasnames from "classnames";
 
import { IconButton } from "components/ui-libraries";
import { AddIcon } from "components/ui-libraries/icons";

import GridComponent from "../../../../components/ui-own/grid/grid.container";
import { DataState } from "./add-person-data.hook";
import { FieldModel } from "../add-person-capture/add-person-capture.hook";

interface IAddPersonDataProps {
  setTableState: Function;
  addRecord: Function;
  setFieldFocus: Function;
  setRecordIndexSelected: Function;
  styles: any;
  styleDarkMode: any;
  state: DataState;
}

const AddPersonDataComponent: React.FC<IAddPersonDataProps> = ({
  setTableState,
  addRecord,
  setFieldFocus,
  setRecordIndexSelected,
  styles,
  styleDarkMode,
  state
}) => {
  function rowRender(rowIndex: number, columnIndex: number) {
    let data: Array<FieldModel> = state.header;
    let header = true;
    if (rowIndex > 0) {
      data = state.datas[rowIndex - 1].fields;
      header = false;
    }
    return (
      <div
        className={clasnames(styles["document__row"], {
          [styles["document__header-row"]]: header,
          [styleDarkMode.bgSelected]: state.indexRecordSelected === rowIndex - 1
        })}
        onClick={() => {
          if (header) return;
          setRecordIndexSelected(rowIndex - 1);
          setFieldFocus(columnIndex);
        }}
      >
        {header ? data[columnIndex].name : data[columnIndex].value}
      </div>
    );
  }
  return (
    <>
      <div
        className={clasnames(styles["document__header"], {
          [styleDarkMode.bgLevel1]: true
        })}
      >
        <IconButton
          disableRipple
          disableFocusRipple
          className={styles["document__header-button-add"]}
          onClick={() => addRecord()}
        >
          <AddIcon color="primary"></AddIcon>
        </IconButton>
        <div className={styles["document__header-space"]}>
          {state.datas.length} records
        </div>
        <IconButton
          className={styles["document__header-button"]}
          onClick={() => setTableState(state.tableState === 2 ? 0 : 2)}
        >
          <div
            className={clasnames(styles["push-pin"], {
              [styles.pinned]: state.tableState === 2,
              [styleDarkMode.imageInvert]: true
            })}
          ></div>
        </IconButton>
      </div>
      <div className={styles["document__grid"]}>
        <GridComponent
          onRowClick={() => undefined}
          rowCount={state.datas.length + 1}
          columnCount={state.header.length}
          rowRender={rowRender}
          scrollToRow={0}
        ></GridComponent>
      </div>
    </>
  );
};

export default AddPersonDataComponent;
