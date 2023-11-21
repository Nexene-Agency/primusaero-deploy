import Joi from "joi";

export const TESTIMONIALS_COLLECTION = "testimonials";

export interface Testimonial {
  text: string;
  author: string;
  valid: boolean;
  lastMod: string;
}

export interface TestimonialReference {
  id: string;
  data: {
    text: string;
    author: string;
    valid: boolean;
  };
}

export const TESTIMONIAL_SCHEMA = Joi.object({
  text: Joi.string().required().min(10).max(2048),
  author: Joi.string().required().min(10).max(256),
  valid: Joi.boolean().required(),
  lastMod: Joi.string().required().min(10).max(256),
});

export const newTestimonial = (lastMod: string): Testimonial => {
  return {
    text: "",
    author: "",
    valid: true,
    lastMod,
  };
};
