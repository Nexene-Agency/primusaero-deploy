import crypto from "crypto";

export interface Counter {
  parent?: string;
  parentId?: string;
  parentName?: string;
}

export interface PendingCommentsCounter extends Counter {
  pending: number;
}

export const COUNTERS_COLLECTION = "counters";

export const PENDING_COMMENTS_ID = "pending-comments";

export interface CommentsCounter extends Counter {
  comments: number;
  pending: number;
}

export const idByParent = (parent: string, parentId: string): string => {
  return crypto.createHash("md5").update(`${parent}-${parentId}`).digest("hex");
};
