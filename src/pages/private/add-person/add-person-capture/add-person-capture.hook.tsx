import { useEffect, useReducer } from "react";
import produce from "immer";
import { field } from "../resource/field";

const SET_FIELDS = "SET_FIELDS";
const INCREASE_INDEX_SELECTED = "INCREASE_INDEX_SELECTED";
const DECREASE_INDEX_SELECTED = "DECREASE_INDEX_SELECTED";
const SELECT_INDEX = "SELECT_INDEX";

const KEY_CODE_ENTER = 13;
// const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_UP = 38;
// const KEY_CODE_ARROW_RIGHT = 39;
const KEY_CODE_ARROW_DOWN = 40;

export interface FieldModel {
  id?: any;
  name: string;
  value?: string;
  Position?: any;
  rectDetail?: any;
}

// Action
export interface CaptureState {
  fields: Array<FieldModel>;
  indexSelected: number;
}

const initialState: CaptureState = {
  fields: [],
  indexSelected: 0
};

interface SET_FIELDS {
  type: typeof SET_FIELDS;
  fields: Array<FieldModel>;
}

interface SELECT_INDEX {
  type: typeof SELECT_INDEX;
  indexSelected: number;
}

interface INCREASE_INDEX_SELECTED {
  type: typeof INCREASE_INDEX_SELECTED;
}

interface DECREASE_INDEX_SELECTED {
  type: typeof DECREASE_INDEX_SELECTED;
}

type Actions =
  | SET_FIELDS
  | SELECT_INDEX
  | INCREASE_INDEX_SELECTED
  | DECREASE_INDEX_SELECTED;

// Reducer
const reducer = produce((draft, action: Actions) => {
  switch (action.type) {
    case SET_FIELDS:
      draft.fields = action.fields;
      draft.indexSelected = 0;
      break;
    case SELECT_INDEX:
      draft.indexSelected = action.indexSelected;
      break;

    case INCREASE_INDEX_SELECTED:
      draft.indexSelected =
        draft.indexSelected === draft.fields.length - 1
          ? 0
          : draft.indexSelected + 1;
      break;

    case DECREASE_INDEX_SELECTED:
      draft.indexSelected =
        draft.indexSelected === 0
          ? draft.fields.length - 1
          : draft.indexSelected - 1;
      break;
  }
});

// Action
function useAddPersonCaptureHook(setHeaderData: Function) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getListField = async () => {
    for (const key in field) {
      if (field.hasOwnProperty(key)) {
        const element: FieldModel = field[key];
        element.value = "";
        field[key] = element;
      }
    }

    dispatch({ type: SET_FIELDS, fields: field });
    setHeaderData(field);
  };

  const onFieldKeyDown = (e: any) => {
    switch (e.keyCode) {
      case KEY_CODE_ENTER:
      case KEY_CODE_ARROW_DOWN:
        dispatch({
          type: INCREASE_INDEX_SELECTED
        });
        break;
      case KEY_CODE_ARROW_UP:
        dispatch({
          type: DECREASE_INDEX_SELECTED
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getListField();
    // eslint-disable-next-line
  }, []);

  const onFocusField = (index: number) => {
    if (index === state.indexSelected) return;
    dispatch({ type: SELECT_INDEX, indexSelected: index });
  };

  return { state, onFieldKeyDown, onFocusField };
}

export default useAddPersonCaptureHook;
