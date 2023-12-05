import Joi from "joi";

export const PERSONNEL_COLLECTION = "personnel";

export interface Personnel {
  publicName: string;
  firstName: string;
  lastName: string;
  title?: string;
  jobTitle?: string;
  email?: string;
  linkedIn?: string;
  phone?: string;
  companies: string[];
  signaturePicture?: string;
  signaturePreview?: string;
  valid: boolean;
  listingOrder: number;
}

export const PERSONNEL_SCHEMA = Joi.object({
  publicName: Joi.string().required().max(64),
  firstName: Joi.string().required().max(64),
  lastName: Joi.string().required().max(64),
  title: Joi.string().optional().allow("").max(64),
  jobTitle: Joi.string().optional().allow("").max(64),
  email: Joi.string().email({tlds: {allow: false}}).optional().allow("").max(128),
  phone: Joi.string().optional().allow("").max(32),
  linkedIn: Joi.string().optional().allow("").max(128),
  companies: Joi.array().items(Joi.string().required().max(16)).required(),
  signaturePicture: Joi.string().optional().allow("").max(1024),
  signaturePreview: Joi.string().optional().allow("").max(1024),
  valid: Joi.boolean().required(),
  listingOrder: Joi.number().required(),
});

export const newPersonnel = (): Personnel => {
  return {
    publicName: "",
    firstName: "",
    lastName: "",
    title: "",
    jobTitle: "",
    email: "",
    phone: "",
    companies: [],
    signaturePicture: "",
    signaturePreview: "",
    valid: true,
    listingOrder: 0,
  };
};