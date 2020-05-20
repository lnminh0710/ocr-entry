import { useCallback, useEffect, useRef } from "react";
import axios, { AxiosRequestConfig } from "axios";

import { formatError } from "./http-interceptors/request";

import useMessage from "context/message.context";

export interface Response<T> {
  success?: boolean;
  errors?: any[];
  data: T;
}

const CancelToken = axios.CancelToken;

export function useHookApi() {
  const cancelToken = useRef<any>(null);
  const { pushMsgDefault } = useMessage();

  const clearRequest = useCallback(function clearRequest() {
    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
  }, []);

  useEffect(() => {
    return clearRequest;
  }, [clearRequest]);

  const callApi = useCallback(
    async function callApi(
      options: AxiosRequestConfig,
      notification?: {
        message: any;
        variant: "default" | "error" | "success" | "warning" | "info";
      }
    ) {
      clearRequest();

      let res: any;
      try {
        res = await axios({
          ...options,
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancelToken.current = { cancel: c };
          })
        }).catch(function(error) {
          const err: any = formatError(error);

          if (!axios.isCancel(error)) {
            if (err.messages) {
              err.messages.forEach((message: string) => {
                pushMsgDefault(message, "error");
              });
            }
          }
          return err;
        });
      } catch (error) {
        console.log(error);
      }
      if (!res.isError && notification) {
        pushMsgDefault(notification.message, notification.variant);
      }

      return res;
    },
    [clearRequest, pushMsgDefault]
  );

  return { callApi, pushMsgDefault };
}
