import Joi from "joi";
import { REGEX } from "@/framework/constants";

export type ContactData = {
  firstName: string;
  lastName: string;
  email: string;
  select: string;
  dsgvo: boolean;
  // agb: boolean;
};

export const CONTACT_DATA_SCHEMA = Joi.object({
  firstName: Joi.string().required().min(1).max(128),
  lastName: Joi.string().required().min(1).max(128),
  email: Joi.string().required().pattern(REGEX.EMAIL),
  select: Joi.string().required().min(1).max(128),
  dsgvo: Joi.boolean().required(),
  // agb: Joi.boolean().required(),
});
