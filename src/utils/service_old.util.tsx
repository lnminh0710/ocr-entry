import axios, { AxiosRequestConfig } from "axios";

import { formatError } from "./http-interceptors/request";

export interface Response<T> {
  isError?: boolean;
  data: T;
}

export function callApi(
  options: AxiosRequestConfig,
  enqueueSnackbar: any
): any {
  return axios(options).catch(function(error) {
    const err: any = formatError(error);

    if (!axios.isCancel(error) && enqueueSnackbar) {
      enqueueSnackbar(err.statusMessage);
    }

    return err;
  });
}

export function apiPost(
  options: AxiosRequestConfig,
  enqueueSnackbar: any
): any {
  return callApi(
    {
      method: "POST",
      ...options
    },
    enqueueSnackbar
  );
}

export function apiGet(options: AxiosRequestConfig, enqueueSnackbar: any): any {
  return callApi(
    {
      method: "GET",
      ...options
    },
    enqueueSnackbar
  );
}

export function apiDelete(
  options: AxiosRequestConfig,
  enqueueSnackbar: any
): any {
  return callApi(
    {
      method: "DELETE",
      ...options
    },
    enqueueSnackbar
  );
}

export function apiPut(options: AxiosRequestConfig, enqueueSnackbar: any): any {
  return callApi(
    {
      method: "PUT",
      ...options
    },
    enqueueSnackbar
  );
}
