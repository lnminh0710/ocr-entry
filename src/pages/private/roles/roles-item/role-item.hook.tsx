import { useEffect, useState, useCallback } from "react";

import { Role } from "constants/model";
import useService from "services/role.service";

import { ROUTES } from "constants/navigation";
import { ID_EMPTY } from "constants/common";

import { generatePath } from "utils/router.util";

const stateDefault = {
  name: "",
  url: "",
  active: true
};

function useRoleHook(
  history: any,
  match: any,
  addItemInList: any,
  updateItemInList: any
) {
  const { apiGetRoleById, apiPostRole, apiPutRoleById } = useService();

  const [state, setState] = useState<any>({
    isLoading: true,
    data: { ...stateDefault },
    notification: {
      isBlocking: false,
      message: ""
    }
  });
  const isNew = match.params.id === ID_EMPTY;

  const asyncCall = useCallback(
    async function asyncCall(id: any) {
      setState((prevState: any) => ({
        isLoading: true,
        ...prevState
      }));

      const data = await apiGetRoleById(id);

      setState((prevState: any) => ({
        ...prevState,
        isLoading: false,
        data
      }));
    },
    [apiGetRoleById]
  );

  useEffect(() => {
    if (match.params.id !== ID_EMPTY) {
      asyncCall(match.params.id);
    } else {
      setState({
        isLoading: false,
        data: { ...stateDefault }
      });
    }
  }, [asyncCall, match.params.id]);

  async function updateRole(role: Role) {
    return await apiPutRoleById(role);
  }

  async function saveRole(role: Role) {
    const res = await apiPostRole(role);

    history.push(generatePath.functionDetail({ id: res._id }));

    return res;
  }

  async function doSave(role: Role) {
    setState((prevState: any) => ({
      ...prevState,
      notification: {
        isBlocking: true,
        message: isNew ? "updating" : "saving"
      }
    }));
    try {
      let res;
      if (isNew) {
        res = await saveRole(role);
        addItemInList(res);
      } else {
        res = await updateRole(role);
        updateItemInList(res);
      }
    } catch (error) {
      console.log(error);
    }
    setState((prevState: any) => ({
      ...prevState,
      notification: {
        isBlocking: false
      }
    }));
  }

  function handleClose() {
    history.push(ROUTES.Functions);
  }

  return { isNew, state, handleClose, doSave };
}

export default useRoleHook;
