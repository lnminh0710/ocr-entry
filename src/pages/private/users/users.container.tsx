import React from "react";

import { Route } from "react-router-dom";

import UserList from "./users-list/users-list.container";
import UserItem from "./users-item/user-item.container";

import { ROUTES } from "constants/navigation";

import useUserHook from "./users-list/users-list.hook";

interface IUserContainerProps {
  history: any;
}

const UserContainer: React.FC<IUserContainerProps> = ({ history }) => {
  const { updateItemInList, addItemInList, ...stateParent } = useUserHook(
    history
  );

  return (
    <>
      <UserList {...stateParent} />

      <Route
        render={(props: any) => (
          <UserItem
            {...props}
            updateItemInList={updateItemInList}
            addItemInList={addItemInList}
          />
        )}
        path={ROUTES.UserDetail}
      />
    </>
  );
};

export default UserContainer;
