import Joi from "joi";

export const CONTACT_COLLECTION = "contacts";

export interface Contact {
  preferred: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phonePrefix: string;
  subject: string;
  message: string;
  privacy: boolean;
  marketing: boolean;
  timestamp: string;
  meetingDate?: string;
  meetingTime?: string;
  company?: string;
}

export const CONTACT_SCHEMA = Joi.object({
  preferred: Joi.string().required().allow("email", "phone", "whatsapp", "meeting"),
  title: Joi.string().optional().allow("").max(32),
  company: Joi.string().optional().allow("").max(32),
  firstName: Joi.string().required().max(32),
  lastName: Joi.string().required().max(32),
  email: Joi.string().email({tlds: {allow: false}}).required().max(128),
  phonePrefix: Joi.when("preferred", {
    is: "email",
    then: Joi.string().optional().allow("").max(8),
    otherwise: Joi.string().required().max(8),
  }),
  phone: Joi.when("preferred", {
    is: "email",
    then: Joi.string().optional().allow("").max(32),
    otherwise: Joi.string().required().max(32),
  }),
  subject: Joi.string().required().max(128),
  message: Joi.string().required().max(1024),
  privacy: Joi.boolean().required(),
  marketing: Joi.boolean().required(),
  timestamp: Joi.string().required().max(32),
  meetingDate: Joi.when("preferred", {
    is: "meeting",
    then: Joi.string().required().max(32),
    otherwise: Joi.string().optional().allow("").max(32),
  }),
  meetingTime: Joi.when("preferred", {
    is: "meeting",
    then: Joi.string().required().max(16),
    otherwise: Joi.string().optional().allow("").max(16),
  }),
});

export const newContact = (company: string): Contact => {
  return ({
    preferred: "email",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phonePrefix: "",
    subject: "",
    message: "",
    privacy: true,
    marketing: false,
    timestamp: new Date().toISOString(),
    meetingDate: "",
    meetingTime: "",
    company,
  }) as Contact;
};
