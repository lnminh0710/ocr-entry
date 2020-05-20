export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const API_REQUEST = "API_REQUEST";

export const JWT_THE_KEY_OF_THE_LIFE = "s_i_love_my_life";

export const ID_EMPTY = "new";

export interface BlockUI {
  isBlocking: boolean;
  message?: string;
}

export enum API_MODULES {
  Organizations = "/organizations",
  Users = "/users",
  Fields = "/fields",
  Roles = "/roles"
}

export enum HTTP_CODE {
  Unauthorized = 401
}

export enum SNACKBAR_TYPE {
  Error = "error"
}

export enum TIMEOUT {
  Default = 300,
  Search = 300
}

export enum KEYBOARD {
  Enter = 13
}
