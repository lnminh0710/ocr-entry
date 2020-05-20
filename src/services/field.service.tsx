import { useCallback, useEffect } from "react";
import axios from "axios";
import { apiGet, Response } from "../utils/service_old.util";
import useMessage from "../context/message.contex";

import { API_MODULES } from "../constants/common";

export interface Field {
  name: string;
}

const CancelToken = axios.CancelToken;
let cancel: any;

function useFieldServices() {
  const { pushMsgError } = useMessage();

  function clearRequest() {
    cancel && cancel();
  }

  useEffect(() => {
    return clearRequest;
  }, []);

  const getAllField = useCallback(
    function getAllFields(params?: any): Response<Field[]> {
      clearRequest();

      return apiGet(
        {
          url: API_MODULES.Roles,
          params,
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          })
        },
        pushMsgError
      );
    },
    [pushMsgError]
  );

  return { getAllField };
}

export { useFieldServices as default };
