import { Role } from "../../constants/model";

import produce from "immer";

export const SET_ROLES = "[AUTH] SET_ROLES";

export interface IAuthState {
  roles: Role[];
}

const initialState: IAuthState = {
  roles: []
};

interface SET_ROLES {
  type: typeof SET_ROLES;
  roles: [];
}

type Actions = SET_ROLES;

const reducer = produce((draft, action: Actions) => {
  switch (action.type) {
    case SET_ROLES:
      draft.roles = action.roles;
      break;
  }
}, initialState);

export { initialState, reducer };
