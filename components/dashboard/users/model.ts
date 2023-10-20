import Joi from "joi";

export const USERS_COLLECTION = "users";
export const ROLES_COLLECTION = "roles";

export interface Roles {
  roles: string[];
  valid: boolean;
}

export const ROLES_SCHEMA = Joi.object({
  roles: Joi.array().items(Joi.string()).required().min(1).max(16),
  valid: Joi.boolean().required(),
});

export interface User {
  image?: string;
  emailVerified: boolean;
  name: string;
  email: string;
}

export const USER_SCHEMA = Joi.object({
  image: Joi.string().allow(null).allow("").max(512),
  emailVerified: Joi.boolean().required(),
  name: Joi.string().required().max(128),
  email: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
});

export const ROLES = ["user", "editor", "admin"];
