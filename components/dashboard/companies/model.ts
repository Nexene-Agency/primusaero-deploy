import Joi from "joi";
import {SOCIAL_MEDIA_SCHEMA, SocialMedia} from "@components/dashboard/socials/model";

export const COMPANIES_COLLECTION = "companies";

export type PartnerType = "full" | "affiliate" | "main";

// office.de@primus.aero
// MSJ AeroSolution Hamburg GmbH
// Commercial Register No.: HRB 180001 Amtsgericht Hamburg

// office.pt@primus.aero
// +351 910 732 102
//
// Crowns and Podium, LDA
// Commercial Register No.: 516509934
// VAT: PT516509934

export interface Company {
  name: string;
  description?: string;
  code: string;
  locations?: string[];
  signaturePicture?: string;
  signaturePreview?: string;
  vatNumber?: string;
  eoriNumber?: string;
  registrationNumber?: string;
  postalAddress?: string;
  email: string;
  phone: string;
  socials: SocialMedia;
  valid: boolean;
  tags: string[];
  partner: PartnerType;
}

export interface CompanyReference {
  data: {
    name: string;
    description: string;
    valid: boolean;
    code: string;
    partner: PartnerType;
  };
}

export const COMPANY_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(128),
  description: Joi.string().optional().allow("").max(512),
  code: Joi.string().required().min(3).max(32),
  locations: Joi.array().items(Joi.string()).optional().max(10),
  signaturePicture: Joi.string().optional().allow("").max(1024),
  signaturePreview: Joi.string().optional().allow("").max(1024),
  vatNumber: Joi.string().optional().allow("").max(64),
  eoriNumber: Joi.string().optional().allow("").max(64),
  registrationNumber: Joi.string().optional().allow("").max(64),
  postalAddress: Joi.string().optional().allow("").max(256),
  email: Joi.string().required().email({tlds: {allow: false}}).max(128),
  phone: Joi.string().required().max(128),
  socials: SOCIAL_MEDIA_SCHEMA.required(),
  valid: Joi.boolean().required(),
  tags: Joi.array().items(Joi.string()).required().min(1).max(10),
  partner: Joi.string().required().allow("full", "affiliate", "main"),
});

export const newCompany = (): Company => {
  return {
    name: "",
    code: "",
    locations: [],
    email: "",
    phone: "",
    socials: {},
    valid: true,
    tags: ["other"],
    partner: "affiliate",
  };
};