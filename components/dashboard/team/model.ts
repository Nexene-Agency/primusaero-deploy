import Joi from "joi";

export const TEAM_MEMBERS_COLLECTION = "teamMembers";

export interface TeamMember {
  name: string;
  title: string;
  imageURL: string;
  social: string;
  web: string;
  email: string;
  valid: boolean;
  order: number;
  visible: boolean;
}

export interface TeamMemberReference {
  id: string;
  data: {
    name: string;
    title: string;
    valid: boolean;
    visible: boolean;
    order: number;
  };
}

export const TEAM_MEMBER_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(128),
  title: Joi.string().required().min(3).max(128),
  imageURL: Joi.string().optional().allow("").max(512),
  social: Joi.string().optional().allow("").max(128),
  web: Joi.string().optional().allow("").max(128),
  email: Joi.string().optional().allow("").max(128),
  valid: Joi.boolean().required(),
  order: Joi.number().required(),
  visible: Joi.boolean().required(),
});

export const newTeamMember = (): TeamMember => {
  return {
    name: "",
    title: "Project Founder & Executive Manager",
    imageURL: "",
    social: "@fluadwirt",
    web: "www.fluadwirt.com",
    email: "office@fluadwirt.com",
    valid: true,
    order: 10,
    visible: true,
  };
};
