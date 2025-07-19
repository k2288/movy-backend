export enum Roles {
  TENANT_ADMIN='tenant-admin',
  CMS_ADMIN = 'cms-admin',
  ADMIN = 'admin' 
}

export const RolesPermissions = {
  [Roles.CMS_ADMIN]: [

    "read-documents"
  ],
  [Roles.TENANT_ADMIN]: [

  ],
  [Roles.ADMIN]: [

  ]
};
