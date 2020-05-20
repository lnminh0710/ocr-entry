import * as authReducer from "./auth.reducer";

import { IState } from "../types";

import { logger } from "../middlewares";

export const initialState: IState = {
  auth: authReducer.initialState
};

export default function mainReducer(state: IState, action: any) {
  // Receiving previous state here
  const { auth } = state;

  // Receiving current state here
  const currentState = {
    auth: authReducer.reducer(auth, action)
  };

  // Middlewares
  if (process.env.NODE_ENV !== "production") {
    logger(action, state, currentState);
  }

  return currentState;
}
