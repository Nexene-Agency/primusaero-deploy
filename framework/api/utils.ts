import { ServiceError } from "@framework/api/service.error";
import { Roles, ROLES_COLLECTION } from "@components/dashboard/users/model";
import { getFirestoreInstance } from "@app/api/utils";

export function intersection(first?: any[], second?: any[]): any[] {
  return (first || []).filter((value) => (second || []).includes(value));
}

export const safeParse = (data: any): any => {
  if (!data) {
    return {};
  }
  if (typeof data === "object") {
    return data;
  }
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (exc) {
      console.error("cannot parse data", data, exc);
    }
  }
  return {};
};

export const checkRole2 = async (
  userId: string,
  roles?: string[],
  needAll = false
): Promise<Roles> => {
  console.log("checkRole2:", userId, roles, needAll);

  if (!roles || roles.length === 0) {
    return Promise.resolve({ valid: false, roles: [] });
  }

  const gotRoles: Roles = { valid: false, roles: [] };

  const db = getFirestoreInstance();

  return new Promise((resolve, reject) => {
    db.collection(ROLES_COLLECTION)
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data() as Roles;
        } else {
          return { roles: [], valid: false };
        }
      })
      .then((foundRoles) => {
        gotRoles.valid = foundRoles.valid;
        gotRoles.roles = foundRoles.roles;
        if (gotRoles.valid) {
          const foundCount = intersection(gotRoles.roles, roles).length;
          if (needAll ? foundCount === roles.length : foundCount > 0) {
            resolve(gotRoles);
          } else {
            reject(new ServiceError(403, "not authorized", "have no role"));
          }
        } else {
          reject(new ServiceError(403, "not authorized", "not valid user"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
