export const LIKES_COLLECTION = "likes";

export interface Like {
  parent: string;
  parentId: string;
  likes: object;
}

export interface LikeRequest {
  parent: string;
  parentId: string;
  userId: string;
}
