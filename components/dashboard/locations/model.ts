import Joi from "joi";
import moment from "moment/moment";
import { Address } from "@framework/googlemaps/model";

export const LOCATIONS_COLLECTION = "locations";

export interface Location {
  name: string;
  description: string;
  text: string;
  imageTag: string;
  signaturePicture: string;
  signaturePreview: string;
  address: Address;
  valid: boolean;
  expires: string;
  type: string[];
}

export interface LocationReference {
  data: {
    name: string;
    description: string;
    valid: boolean;
    expires: string;
    type: string[];
  };
}

export const LOCATION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(128),
  description: Joi.string().required().min(3).max(256),
  text: Joi.string().optional().allow("").max(16384),
  imageTag: Joi.string().required().min(3).max(32),
  signaturePicture: Joi.string().required().min(10).max(1024),
  signaturePreview: Joi.string().required().min(10).max(1024),
  address: Joi.object().required(),
  valid: Joi.boolean().required(),
  expires: Joi.string().required(),
  type: Joi.array().items(Joi.string()).required().min(1).max(10),
});

export const newLocation = (): Location => {
  return {
    name: "",
    description: "",
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
    text: "",
    imageTag: "",
    signaturePicture: "",
    signaturePreview: "",
    valid: true,
    expires: moment().add(1, "y").format("YYYY-MM-DD"),
    type: ["other"],
  };
};

export const LocationTypes = [
  "rental",
  "garage",
  "shop",
  "magazine_store",
  "campground",
  "other",
];
