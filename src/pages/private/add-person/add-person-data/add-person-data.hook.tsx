import { FieldModel } from "../add-person-capture/add-person-capture.hook";
import produce from "immer";
import { useReducer, useEffect, useRef } from "react";

import find from "lodash/find";
import cloneDeep from "lodash/cloneDeep";

import { generateDataByFieldName } from "./add-person-data.util";
import { spellCheck } from "services/spell-check";

const SET_HEADER = "SET_HEADER";
const SET_DATAS = "SET_DATAS";
const UPDATE_DATA = "UPDATE_DATA";
const ADD_RECORD = "ADD_RECORD";
const SET_RECORD_SELECTED = "SET_RECORD_SELECTED";
const SET_TABLE_STATE = "SET_TABLE_STATE";
const SET_TREE_VIEW = "SET_TREE_VIEW";

const TABLE_STATE_HIDE = 0;
const TABLE_STATE_SHOW = 1;
// const TABLE_STATE_PIN = 2;

export interface RecordModel {
    recordId: number;
    fields: Array<FieldModel>;
}

interface SET_HEADER {
    type: typeof SET_HEADER;
    header: Array<FieldModel>;
}

interface SET_TREE_VIEW {
    type: typeof SET_TREE_VIEW;
    isOpenTree: boolean;
}

interface SET_DATAS {
    type: typeof SET_DATAS;
    datas: Array<RecordModel>;
}

interface SET_RECORD_SELECTED {
    type: typeof SET_RECORD_SELECTED;
    indexRecordSelected: number;
}
interface ADD_RECORD {
    type: typeof ADD_RECORD;
}

interface UPDATE_DATA {
    type: typeof UPDATE_DATA;
    data: RecordModel;
}

interface SET_TABLE_STATE {
    type: typeof SET_TABLE_STATE;
    tableState: number;
}

type Actions =
    | SET_DATAS
    | SET_HEADER
    | SET_TABLE_STATE
    | UPDATE_DATA
    | ADD_RECORD
    | SET_RECORD_SELECTED
    | SET_TREE_VIEW;

// Reducer
export interface DataState {
    isEmpty: boolean;
    isOpenTree: boolean;
    datas: Array<RecordModel>;
    documents: Array<RecordModel>;
    header: Array<FieldModel>;
    indexRecordSelected: number;
    tableState: number;
}

const initialState: DataState = {
    isEmpty: true,
    isOpenTree: false,
    header: [],
    datas: [],
    documents: [],
    indexRecordSelected: 0,
    tableState: TABLE_STATE_HIDE
};

const reducer = produce((draft, action: Actions) => {
    switch (action.type) {
        case SET_HEADER:
            draft.header = action.header;
            break;
        case SET_DATAS:
            draft.datas = action.datas;
            draft.isEmpty = false;
            break;

        case UPDATE_DATA:
            draft.datas[draft.indexRecordSelected] = action.data;
            break;

        case ADD_RECORD:
            draft.datas.push({
                recordId: draft.datas.length,
                fields: cloneDeep(draft.header)
            });
            break;
        case SET_RECORD_SELECTED:
            draft.indexRecordSelected = action.indexRecordSelected;
            break;
        case SET_TABLE_STATE:
            draft.tableState = action.tableState;
            break;
        case SET_TREE_VIEW:
            draft.isOpenTree = action.isOpenTree;
            break;

        default:
            break;
    }
});

function useAddPersonDataHook() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const documentTableRef = useRef<any>(null);

    function handleClickOutside(event: any) {
        if (
            documentTableRef.current &&
            !documentTableRef.current.contains(event.target)
        ) {
            if (state.tableState === TABLE_STATE_SHOW)
                dispatch({
                    type: SET_TABLE_STATE,
                    tableState: TABLE_STATE_HIDE
                });
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const setHeaderData = (fields: Array<FieldModel>) => {
        dispatch({ type: SET_HEADER, header: fields });
    };

    const getDataById = (data: any) => {
        setTimeout(() => {
            dispatch({
                type: SET_DATAS,
                datas: [
                    {
                        recordId: 1,
                        fields: generateDataByFieldName(cloneDeep(state.header))
                    }
                ]
            });
        }, 1600);
    };

    const setTableState = (tableState: number) => {
        dispatch({ type: SET_TABLE_STATE, tableState });
    };

    const changeValueByRecordId = async (
        recordId: number,
        fieldName: string,
        data: any
    ) => {
        const datas = cloneDeep(state.datas);
        const record: RecordModel = find(datas, ["recordId", recordId]);
        if (record && record.fields) {
            const field: FieldModel = find(record.fields, [
                "name",
                fieldName
            ]) || {
                name: ""
            };
            if (!field.name) return;
            // const response = await spellCheck(data.value);

            field.value = data.value;
            if (data.Position) field.Position = data.Position;
            if (data.rectDetail) field.rectDetail = data.rectDetail;
        }
        dispatch({ type: UPDATE_DATA, data: record });

        reRenderGrid();
    };

    const reRenderGrid = () => {
        setTimeout(() => {
            const ele = document.getElementById("multi-grid__rerender");
            ele && ele.click();
        }, 100);
    };

    const addRecord = () => {
        dispatch({ type: ADD_RECORD });
    };

    const selectRecord = (indexRecordSelected: number) => {
        dispatch({ type: SET_RECORD_SELECTED, indexRecordSelected });
        reRenderGrid();
    };

    const openTreeView = (isOpenTree: boolean) => {
        dispatch({ type: SET_TREE_VIEW, isOpenTree });
    };

    return {
        addRecord,
        changeValueByRecordId,
        getDataById,
        setHeaderData,
        selectRecord,
        setTableState,
        openTreeView,
        // END fund
        documentTableRef,
        state
    };
}

export default useAddPersonDataHook;
