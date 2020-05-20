import { useCallback } from "react";
import { useHookApi } from "utils/service.util";

import { API_MODULES } from "constants/common";

export function useService() {
  const { callApi } = useHookApi();

  const apiGetAllOrganization = useCallback(
    async function getAllOrganization(options: any = {}) {
      options.url = `${API_MODULES.Organizations}`;

      const res = await callApi(options);
      if (res.isError) {
        return [];
      }

      return res;
    },
    [callApi]
  );

  const apiGetOrganizationById = useCallback(
    async function getOrganizationById(id: any, options: any = {}) {
      options.url = `${API_MODULES.Organizations}/${id}`;

      const res = await callApi(options);
      if (res.isError) {
        return {};
      }

      return res;
    },
    [callApi]
  );

  const apiGetOrganizationsUser = useCallback(
    async function getOrganizationsUser(id: any, options: any = {}) {
      options.url = `${API_MODULES.Organizations}/getOrganizationsUser/${id}`;

      return await callApi(options);
    },
    [callApi]
  );

  const apiPostOrganization = useCallback(
    async function postOrganization(data: any) {
      return await callApi(
        {
          url: `${API_MODULES.Organizations}`,
          method: "POST",
          data
        },
        { message: "Success", variant: "success" }
      );
    },
    [callApi]
  );

  const apiPutOrganizationById = useCallback(
    async function putOrganization(data: any) {
      return await callApi(
        {
          url: `${API_MODULES.Organizations}/${data._id}`,
          method: "PUT",
          data
        },
        { message: "Success", variant: "success" }
      );
    },
    [callApi]
  );

  return {
    apiGetAllOrganization,
    apiGetOrganizationById,
    apiGetOrganizationsUser,
    apiPostOrganization,
    apiPutOrganizationById
  };
}

export { useService as default };
