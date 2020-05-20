export interface User {
  _id?: string;
  username: string;
  secretKey: string;
  organizationId?: string;
  password: string;
  fullName: string;
  email: string;
  roleIds: any;
  roles?: any;
  isRoot?: boolean;
  active?: boolean;
  organization?: any;
}

export interface Role {
  _id?: string;
  name: string;
  url: string;
  active?: boolean;
}

export interface Organization {
  _id: string;
  name: string;
  groups?: any[];
  active?: boolean;
}
