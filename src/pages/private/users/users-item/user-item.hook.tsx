import { useEffect, useState, useCallback } from "react";

import { User, Role, Organization } from "constants/model";

import useUserService from "services/user.service";
import useOrganizationService from "services/organization.service";
import useRoleService from "services/role.service";

import { ID_EMPTY } from "constants/common";
import { ROUTES } from "constants/navigation";

import { generatePath } from "utils/router.util";

const stateDefault: User = {
  username: "",
  password: "",
  secretKey: "", 
  fullName: "",
  email: "",
  roleIds: []
};

function useUserHook(
  history: any,
  match: any,
  addItemInList: any,
  updateItemInList: any
) {
  const { apiGetUserById, apiPutUserById, apiPostUser } = useUserService();
  const { apiGetAllRole } = useRoleService();
  const { apiGetAllOrganization } = useOrganizationService();
  const [state, setState] = useState<any>({
    isLoading: true,
    data: { ...stateDefault },
    notification: {
      isBlocking: false,
      message: ""
    }
  });
  const isNew = match.params.id === ID_EMPTY;
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const asyncCall = useCallback(
    async function asyncCall(id: any) {
      setState((prevState: any) => ({
        isLoading: true,
        ...prevState
      }));

      const resRole = await apiGetAllRole();
      setRoles(resRole.filter((o: Role) => o.active));

      const resOrganizations = await apiGetAllOrganization();
      setOrganizations(resOrganizations.filter((o: Organization) => o.active));

      const resUser = await apiGetUserById(id);
      if (resUser.isRoot) {
        resUser.secretKey = "";
      }

      setState((prevState: any) => ({
        ...prevState,
        isLoading: false,
        data: resUser
      }));
    },
    [apiGetUserById, apiGetAllRole, apiGetAllOrganization]
  );

  useEffect(() => {
    if (match.params.id !== ID_EMPTY) {
      asyncCall(match.params.id);
    } else {
      setState({
        isLoading: false,
        data: { ...stateDefault }
      });
    }
  }, [asyncCall, match.params.id, match.params.index]);

  async function updateUser(organization: User) {
    return await apiPutUserById(organization);
  }

  async function saveUser(organization: User) {
    const res = await apiPostUser(organization);

    history.push(generatePath.organizationDetail({ id: res._id }));

    return res;
  }

  async function doSave(user: User) {
    setState((prevState: any) => ({
      ...prevState,
      notification: {
        isBlocking: true,
        message: isNew ? "updating" : "saving"
      }
    }));

    try {
      let res;
      const organization = organizations.find(
        (o: any) => o._id === user.organizationId
      );
      if (isNew) {
        res = await saveUser(user);
        res.organization = organization;
        addItemInList(res);
      } else {
        res = await updateUser(user);
        res.organization = organization;

        updateItemInList(res);
      }
    } catch (error) {
      console.log(error);
    }

    setState((prevState: any) => ({
      ...prevState,
      notification: {
        isBlocking: false
      }
    }));
  }

  function handleClose() {
    history.push(ROUTES.Users);
  }

  return { isNew, state, roles, organizations, doSave, handleClose };
}

export default useUserHook;
