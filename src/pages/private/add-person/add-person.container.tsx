import React from "react";
import classnames from "classnames";

import get from "lodash/get";

import styles from "./add-person.module.scss";

import { Paper } from "components/ui-libraries";

//Component
import AddPersonCapture from "./add-person-capture/add-person-capture.container";
import AddPersonAction from "./add-person-action/add-person-action.container";
import AddPersonImage from "./add-person-image/add-person-image.container";
import AddPersonDataTable from "./add-person-data/add-person-data.container";

// Hook
import useAddPersonDataHook from "./add-person-data/add-person-data.hook";
import useAddPersonCaptureHook from "./add-person-capture/add-person-capture.hook";
import { useAddPersonStyle } from "../../../utils/theme.util";

const AddPerson: React.FC = () => {
    const {
        setHeaderData,
        getDataById,
        openTreeView,
        changeValueByRecordId,
        state,
        ...dataProps
    } = useAddPersonDataHook();
    const captureProps = useAddPersonCaptureHook(setHeaderData);
    const record = state.datas[state.indexRecordSelected] || {};
    const fieldFocused = get(state.header[captureProps.state.indexSelected], [
        "name"
    ]);

    const isEmpty = state.isEmpty;

    const styleDarkMode = useAddPersonStyle();

    return (
        <>
            <div
                className={classnames(styles["add-person"], {
                    [styles["pin-table"]]: state.tableState === 2
                })}
            >
                <div className={styles["add-person__capture"]}>
                    <div className={styles["add-person__action"]}>
                        <AddPersonAction
                            isEmpty={isEmpty}
                            isTreeView={state.isOpenTree}
                            openTreeView={openTreeView}
                        ></AddPersonAction>
                    </div>
                    <Paper
                        classes={{
                            root: classnames(styles["add-person__fields"], {
                                [styles["tree"]]: state.isOpenTree
                            })
                        }}
                    >
                        {state.isOpenTree ? (
                            <div
                                className={classnames(
                                    styles["add-person__tree-view"],
                                    {
                                        [styleDarkMode.bgLevel1]: true,
                                        [styleDarkMode.treeInvert]: true
                                    }
                                )}
                            ></div>
                        ) : (
                            <AddPersonCapture
                                {...captureProps}
                                styleDarkMode={styleDarkMode}
                                record={record}
                                changeValueByRecordId={changeValueByRecordId}
                                isEmpty={isEmpty}
                            ></AddPersonCapture>
                        )}
                    </Paper>
                </div>
                <Paper
                    id="add-person__image"
                    classes={{
                        root: classnames(styles["add-person__image"])
                    }}
                >
                    <AddPersonImage
                        changeValueByRecordId={changeValueByRecordId}
                        getDataById={getDataById}
                        isPinTable={
                            state.tableState !== 0 && state.tableState === 2
                        }
                        isEmpty={isEmpty}
                        fieldFocused={fieldFocused}
                        recordId={record.recordId}
                    ></AddPersonImage>
                </Paper>
            </div>
            {/* <AddPersonDataTable
        {...dataProps}
        styleDarkMode={styleDarkMode}
        setFieldFocus={captureProps.onFocusField}
        state={state}
        isEmpty={isEmpty}
      ></AddPersonDataTable> */}
        </>
    );
};

export default AddPerson;
