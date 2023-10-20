import Joi from "joi";

export const ARTICLES_COLLECTION = "articles";

export interface Article {
  title: string;
  subTitle?: string;
  location: string;
  article: string;
  images: string;
  firstName: string;
  lastName?: string;
  social: string;
  web?: string;
  email: string;
  vehicleBrand: string;
  vehicleName?: string;
  vehicleYear?: string;
  recommendVanlifeAcc?: string;
  submitted?: string;
  processed?: string;
  processedBy?: string;
}

export interface ArticleReference {
  id: string;
  data: {
    title: string;
    email: string;
    submitted?: string;
    processed?: string;
  };
}

export const ARTICLE_SCHEMA = Joi.object({
  title: Joi.string().required().min(10).max(60),
  subTitle: Joi.string().optional().allow("").max(60),
  location: Joi.string().required().min(10).max(256),
  article: Joi.string().required().min(10).max(16384),
  images: Joi.string().required().min(10).max(1024),
  firstName: Joi.string().required().min(3).max(60),
  lastName: Joi.string().optional().allow("").max(60),
  social: Joi.string().required().min(3).max(256),
  web: Joi.string().optional().allow("").max(256),
  email: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
  vehicleBrand: Joi.string().required().min(3).max(60),
  vehicleName: Joi.string().optional().allow("").max(60),
  vehicleYear: Joi.string()
    .optional()
    .allow("")
    .pattern(/^[0-9]{4}$/),
  recommendVanlifeAcc: Joi.string().optional().allow("").max(128),
  submitted: Joi.string().optional().allow("").max(32),
  processed: Joi.string().optional().allow("").max(32),
  processedBy: Joi.string().optional().allow("").max(128),
});

export const newArticle = (): Article => ({
  title: "",
  subTitle: "",
  location: "",
  article: "",
  images: "",
  firstName: "",
  lastName: "",
  social: "",
  web: "",
  email: "",
  vehicleBrand: "",
  vehicleName: "",
  vehicleYear: "",
  recommendVanlifeAcc: "",
  submitted: new Date().toISOString(),
  processed: "",
  processedBy: "",
});
