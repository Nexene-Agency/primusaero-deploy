import Joi from "joi";
import {Address} from "@framework/googlemaps/model";

export const LOCATIONS_COLLECTION = "locations";

export interface Location {
  name: string;
  description?: string;
  headline: string;
  code: string;
  companies: string[];
  signaturePicture?: string;
  signaturePreview?: string;
  address: Address;
  addressPlus?: string;
  valid: boolean;
  tags: string[];
  listingOrder?: number;
}

export interface LocationReference {
  data: {
    name: string;
    description: string;
    valid: boolean;
    code: string;
  };
}

export const LOCATION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(128),
  description: Joi.string().optional().allow("").max(512),
  headline: Joi.string().required().max(128),
  code: Joi.string().required().min(3).max(32),
  companies: Joi.array().items(Joi.string()).optional().max(10),
  signaturePicture: Joi.string().optional().allow("").max(1024),
  signaturePreview: Joi.string().optional().allow("").max(1024),
  addressPlus: Joi.string().optional().allow("").max(256),
  address: Joi.object().required(),
  valid: Joi.boolean().required(),
  tags: Joi.array().items(Joi.string()).required().min(1).max(10),
  listingOrder: Joi.number().required(),
});

export const newLocation = (): Location => {
  return {
    name: "",
    headline: "",
    address: {
      address: "",
      postal_code: "",
      street: "",
      street_number: "",
      city: "",
      country: "",
      lat: 0,
      lng: 0,
    },
    code: "",
    companies: [],
    valid: true,
    tags: ["other"],
    listingOrder: 10,
  };
};