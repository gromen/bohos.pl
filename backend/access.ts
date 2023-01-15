import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatePermissions,
};

export const rules = {
  canManageProducts({ session }) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { status: 'AVAILABLE' };
  },
};
