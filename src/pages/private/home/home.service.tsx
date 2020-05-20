import { useEffect, useCallback } from "react";
import axios from "axios";

import { getRolesUser } from "../../../services/role.service";

import useMessage from "../../../context/message.contex";

const CancelToken = axios.CancelToken;
let cancel: any;

function useUserServices() {
  const { pushMsgError } = useMessage();

  function clearRequest() {
    cancel && cancel();
  }

  useEffect(() => {
    return clearRequest;
  }, []);

  const apiGetUserById = useCallback(
    function apiGetUserById(id: any): any {
      clearRequest();

      return getRolesUser({
        id,
        options: {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          })
        },
        pushMsgError
      });
    },
    [pushMsgError]
  );

  return { apiGetUserById };
}

export { useUserServices as default };
