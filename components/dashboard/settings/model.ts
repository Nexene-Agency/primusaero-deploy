import Joi from "joi";

export interface SystemSettings {
  hotTopics: string[];
}

export const SYSTEM_SETTINGS_SCHEMA = Joi.object({
  hotTopics: Joi.array().items(Joi.string().max(128)).min(0).max(12),
});

export const SYSTEM_SETTINGS_COLLECTION = "systemSettings";

export const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  hotTopics: [],
};

export const SETTINGS_ID = "system";
