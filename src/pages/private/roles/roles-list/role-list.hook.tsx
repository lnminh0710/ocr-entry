import { useEffect, useCallback, useReducer } from "react";

import { Role } from "constants/model";
import useRoleService from "services/role.service";

import { generatePath } from "utils/router.util";

import produce from "immer";

const ADD_DATA = "ADD_DATA";
const UPDATE_DATA = "UPDATE_DATA";
const SET_DATAS = "SET_DATAS";
const LOADING_DATAS = "LOADING_DATAS";

export interface State {
  isLoading: boolean;
  isFirstLoad: boolean;
  indexSelected: number;
  datas: Role[];
}

const initialState: State = {
  isLoading: false,
  isFirstLoad: true,
  indexSelected: -1,
  datas: []
};

interface LOADING_DATAS {
  type: typeof LOADING_DATAS;
}

interface ADD_DATA {
  type: typeof ADD_DATA;
  data: Role;
}

interface UPDATE_DATA {
  type: typeof UPDATE_DATA;
  data: Role;
}

interface SET_DATAS {
  type: typeof SET_DATAS;
  datas: Role[];
}

type Actions = ADD_DATA | UPDATE_DATA | LOADING_DATAS | SET_DATAS;

const reducer = produce((draft, action: Actions) => {
  switch (action.type) {
    case LOADING_DATAS:
      draft.isLoading = true;
      break;
    case ADD_DATA:
      draft.datas.unshift(action.data);
      break;
    case UPDATE_DATA:
      let index = draft.datas.findIndex(
        (data: any) => data._id === action.data._id
      );
      if (index > -1) {
        draft.datas[index] = action.data;
      }
      break;
    case SET_DATAS:
      draft.datas = action.datas;
      draft.isFirstLoad = false;
      draft.isLoading = false;
      break;
  }
});

function useRoleHook(history: any) {
  const { apiGetAllRole } = useRoleService();
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadData = useCallback(
    async (textSearch?: string) => {
      const datas = await apiGetAllRole({ params: { search: textSearch } });
    
      dispatch({ type: SET_DATAS, datas });
    },
    [apiGetAllRole]
  );

  useEffect(() => {
    let runFirstLoad = async () => {
      await loadData();
    };

    runFirstLoad();
  }, [loadData]);

  async function handleSearch(textSearch: string) {
    dispatch({ type: LOADING_DATAS });

    await loadData(textSearch);
  }

  function handleClick(index: number) {
    history.push(generatePath.functionDetail({ id: state.datas[index]._id }));
  }

  function doCreateData() {
    history.push(generatePath.functionDetail({ id: "new" }));
  }

  function addItemInList(data: Role) {
    dispatch({ type: ADD_DATA, data });
  }

  function updateItemInList(data: Role) {
    dispatch({ type: UPDATE_DATA, data });
  }

  return {
    state,
    handleSearch,
    handleClick,
    doCreateData,
    addItemInList,
    updateItemInList
  };
}

export default useRoleHook;
