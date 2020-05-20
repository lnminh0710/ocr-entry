import { useCallback } from "react";
import { useHookApi } from "utils/service.util";

import { API_MODULES } from "constants/common";

export function useService() {
  const { callApi } = useHookApi();

  const apiGetAllUser = useCallback(
    async function getAllUser(options: any = {}) {
      options.url = `${API_MODULES.Users}`;

      const res = await callApi(options);
      if (res.isError) {
        return [];
      }

      return res;
    },
    [callApi]
  );

  const apiGetUserById = useCallback(
    async function getUserById(id: any, options: any = {}) {
      options.url = `${API_MODULES.Users}/${id}`;

      const res = await callApi(options);
      if (res.isError) {
        return {};
      }

      return res;
    },
    [callApi]
  );

  const apiGetUsersUser = useCallback(
    async function getUsersUser(id: any, options: any = {}) {
      options.url = `${API_MODULES.Users}/getUsersUser/${id}`;

      return await callApi(options);
    },
    [callApi]
  );

  const apiPostUser = useCallback(
    async function postUser(data: any) {
      return await callApi(
        {
          url: `${API_MODULES.Users}`,
          method: "POST",
          data
        },
        { message: "Success", variant: "success" }
      );
    },
    [callApi]
  );

  const apiPutUserById = useCallback(
    async function putUser(data: any) {
      return await callApi(
        {
          url: `${API_MODULES.Users}/${data._id}`,
          method: "PUT",
          data
        },
        { message: "Success", variant: "success" }
      );
    },
    [callApi]
  );

  return {
    apiGetAllUser,
    apiGetUserById,
    apiGetUsersUser,
    apiPostUser,
    apiPutUserById
  };
}

export { useService as default };
