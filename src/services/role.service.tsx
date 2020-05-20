import {
  apiGet,
  Response,
  apiDelete,
  apiPut,
  apiPost
} from "../utils/service_old.util";
import { useCallback } from "react";
import { useHookApi } from "utils/service.util";

import { API_MODULES } from "constants/common";
import { Role } from "../constants/model";

import _get from "lodash/get";

export interface Options {
  id?: any;
  options?: any;
  pushMsgError?: any;
}

export function toModel(role: Role) {
  return {
    _id: _get(role, "_id", "0"),
    name: _get(role, "name", ""),
    url: _get(role, "url", "")
  };
}

export function useService() {
  const { callApi } = useHookApi();

  const apiGetAllRole = useCallback(
    async function getAllRole(options: any = {}) {
      options.url = `${API_MODULES.Roles}`;

      const res = await callApi(options);

      if (res.isError) {
        return [];
      }

      return res;
    },
    [callApi]
  );

  const apiGetRoleById = useCallback(
    async function getRoleById(id: any, options: any = {}) {
      options.url = `${API_MODULES.Roles}/${id}`;

      const res = await callApi(options);
      if (!res) {
        return {};
      }

      return res;
    },
    [callApi]
  );

  const apiGetRolesUser = useCallback(
    async function getRolesUser(id: any, options: any = {}) {
      options.url = `${API_MODULES.Roles}/getRolesUser/${id}`;

      const res = await callApi(options);

      if (!res) {
        return [];
      }

      return res;
    },
    [callApi]
  );

  const apiPostRole = useCallback(
    async function postRole(data: any) {
      return await callApi(
        {
          url: `${API_MODULES.Roles}`,
          method: "POST",
          data
        },
        { message: "Success", variant: "success" }
      );
    },
    [callApi]
  );

  const apiPutRoleById = useCallback(
    async function putRole(data: any) {
      return await callApi(
        {
          url: `${API_MODULES.Roles}/${data._id}`,
          method: "PUT",
          data
        },
        { message: "Success", variant: "success" }
      );
    },
    [callApi]
  );

  return {
    apiGetAllRole,
    apiGetRoleById,
    apiGetRolesUser,
    apiPostRole,
    apiPutRoleById
  };
}

export { useService as default };

export function getAllRole({
  options,
  pushMsgError
}: Options): Response<Role[]> {
  return apiGet(
    {
      url: API_MODULES.Roles,
      ...options
    },
    pushMsgError
  );
}

export function getRoleById({
  id,
  options,
  pushMsgError
}: Options): Response<Role> {
  return apiGet(
    {
      url: `${API_MODULES.Roles}/${id}`,
      ...options
    },
    pushMsgError
  );
}

export function getRolesUser({
  id,
  options,
  pushMsgError
}: Options): Response<Role> {
  return apiGet(
    {
      url: `${API_MODULES.Roles}/getRolesUser/${id}`,
      ...options
    },
    pushMsgError
  );
}

export function postRole({ options, pushMsgError }: Options): Response<Role> {
  return apiPost(
    {
      url: API_MODULES.Roles,
      ...options
    },
    pushMsgError
  );
}

export function putRoleById({
  options,
  pushMsgError
}: Options): Response<Role> {
  return apiPut(
    {
      url: `${API_MODULES.Roles}/${options.data._id}`,
      ...options
    },
    pushMsgError
  );
}

export function deleteRoleById({ options, pushMsgError }: Options) {
  return apiDelete(
    {
      url: `${API_MODULES.Roles}/${options.data._id}`,
      ...options
    },
    pushMsgError
  );
}
