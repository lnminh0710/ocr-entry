import { useReducer, useEffect } from "react";
import produce from "immer";

const GETTING_CARD = "GETTING_CARD";
const SET_CARD = "SET_CARD";

// Action
export interface ImageState {
    isLoading: boolean;
    filePath: string;
    OCRText: any;
    OCRJson: any;
}

const initialState: ImageState = {
    isLoading: false,
    filePath: "",
    OCRText: "",
    OCRJson: {}
};

interface GETTING_CARD {
    type: typeof GETTING_CARD;
}

interface SET_CARD {
    type: typeof SET_CARD;
}
type Actions = GETTING_CARD | SET_CARD;

// Reducer
const reducer = produce((draft, action: Actions) => {
    switch (action.type) {
        case GETTING_CARD:
            draft.isLoading = true;
            break;
        case SET_CARD:
            draft.isLoading = false;
            break;
    }
});
interface Params {
    recordId: number;
    fieldFocused: string;
}
// Action
function useAddPersonImageHook(getDataById: Function, isEmpty: boolean) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        if (isEmpty) {
            setTimeout(() => {
                getCard();
            }, 100);
        }
    });
    async function getCard() {
        if (state.isLoading) return;
        dispatch({ type: GETTING_CARD });
        // call API here

        // Success get data
        getDataById(1);

        setTimeout(() => {
            dispatch({ type: SET_CARD });
        }, 1500);
    }

    return { getCard, state };
}

export default useAddPersonImageHook;
