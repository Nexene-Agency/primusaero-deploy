import Joi from "joi";

export const COMMENTS_COLLECTION = "comments";

export interface Comment {
  parent: string;
  parentId: string;
  parentName: string;
  when: string;
  user: string;
  userName: string;
  userImage: string;
  text: string;
  approved: boolean;
  approvedAt?: string;
  approvedBy?: string;
  likes: object;
}

export interface CommentLike {
  commentId: string;
  userId: string;
  vote: number;
}

export interface CommentModerationRequest {
  parent: string;
  parentId: string;
  revoke: boolean;
}

export const COMMENT_SCHEMA = Joi.object({
  parent: Joi.string().required().max(128),
  parentId: Joi.string().required().max(128),
  parentName: Joi.string().required().max(128),
  when: Joi.string().required().max(128),
  user: Joi.string().required().max(128),
  userName: Joi.string().required().max(128),
  userImage: Joi.string().optional().allow("").max(1024),
  text: Joi.string().required().min(10).max(512),
  approved: Joi.boolean().required(),
  likes: Joi.object().required(),
});

export const newComment = (
  parent: string,
  parentId: string,
  parentName: string,
  user: string,
  userName: string,
  userImage: string
): Comment => ({
  parent,
  parentId,
  parentName,
  when: new Date().toISOString(),
  user,
  userName,
  userImage,
  text: "",
  approved: false,
  likes: {},
});
