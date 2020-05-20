import { useEffect, useCallback, useReducer } from "react";

import { User } from "constants/model";
import useUserService from "services/user.service";

import { generatePath } from "utils/router.util";
import { ID_EMPTY } from "constants/common";

import produce from "immer";

const ADD_DATA = "ADD_DATA";
const UPDATE_DATA = "UPDATE_DATA";
const SET_DATAS = "SET_DATAS";
const LOADING_DATAS = "LOADING_DATAS";

export interface State {
  isLoading: boolean;
  isFirstLoad: boolean;
  indexSelected: number;
  datas: User[];
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
  data: User;
}

interface UPDATE_DATA {
  type: typeof UPDATE_DATA;
  data: User;
}

interface SET_DATAS {
  type: typeof SET_DATAS;
  datas: User[];
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

function useUserHook(history: any) {
  const { apiGetAllUser } = useUserService();
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadData = useCallback(
    async (textSearch?: string) => {
      const datas = await apiGetAllUser({ params: { search: textSearch } });

      dispatch({ type: SET_DATAS, datas });
    },
    [apiGetAllUser]
  );

  useEffect(() => {
    let runFirstLoad = async () => {
      await loadData();
    };

    runFirstLoad();
  }, [loadData]);

  async function handleSearch({ keyword }: any) {
    dispatch({ type: LOADING_DATAS });

    await loadData(keyword);
  }

  function handleRowClick(row: any) {
    history.push(generatePath.userDetail({ id: row._id }));
  }

  function doCreate() {
    history.push(generatePath.userDetail({ id: ID_EMPTY }));
  }

  function addItemInList(data: User) {
    dispatch({ type: ADD_DATA, data });
  }

  function updateItemInList(data: User) {
    dispatch({ type: UPDATE_DATA, data });
  }

  return {
    state,
    handleSearch,
    handleRowClick,
    doCreate,
    addItemInList,
    updateItemInList
  };
}

export default useUserHook;
