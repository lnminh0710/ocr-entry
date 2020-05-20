import { generatePath as _generatePath } from "react-router-dom";
import { ROUTES } from "constants/navigation";

export const generatePath = {
  userDetail: function generatePath(params?: { id: string }) {
    return _generatePath(ROUTES.UserDetail, params);
  },
  functionDetail: function generatePath(params?: { id: string }) {
    return _generatePath(ROUTES.FunctionDetail, params);
  },
  organizationDetail: function generatePath(params?: { id: string }) {
    return _generatePath(ROUTES.OrganizationDetail, params);
  }
};
