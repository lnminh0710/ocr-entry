import React from "react";

import { Route } from "react-router-dom";

import { Layout } from "components/ui-own/layout-page/layout.component";
import RoleList from "./roles-list/role-list.container";
import RoleItem from "./roles-item/role-item.container";

import { ROUTES } from "constants/navigation";

import useRoleHook from "./roles-list/role-list.hook";

interface IRoleContainerProps {
  history: any;
}

const RoleContainer: React.FC<IRoleContainerProps> = ({ history }) => {
  const { updateItemInList, addItemInList, ...stateParent } = useRoleHook(
    history
  );

  return (
    <Layout>
      <RoleList {...stateParent} />
      <Route
        render={(props: any) => (
          <RoleItem
            {...props}
            updateItemInList={updateItemInList}
            addItemInList={addItemInList}
          />
        )}
        path={ROUTES.FunctionDetail}
      />
    </Layout>
  );
};

export default RoleContainer;
