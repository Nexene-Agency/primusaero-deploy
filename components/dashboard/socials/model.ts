import Joi from "joi";

export interface SocialMedia {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

export const SOCIAL_MEDIA_SCHEMA = Joi.object({
  facebook: Joi.string().optional().allow("").max(128),
  linkedin: Joi.string().optional().allow("").max(128),
  instagram: Joi.string().optional().allow("").max(128),
});
