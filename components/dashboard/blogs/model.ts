import Joi from "joi";
import { DatabaseEntry } from "@framework/firebase.utils";

export const BLOGPOSTS_COLLECTION = "blogPosts";
export const BLOGPOST_REFERENCES_COLLECTION = "blogPostRefs";

export type BLOG_BLOCK_TYPE = "markdown" | "code" | "images";

export interface BlogResponse {
  blogPost?: DatabaseEntry<BlogPost>;
  comments: number;
  canComment: boolean;
  likes: number;
  related: DatabaseEntry<SimilarBlogPostReference>[];
}

export interface SimilarBlogPostReference {
  title: string;
  description: string;
  coverPicPreview?: string;
}

export interface BlogBlock {
  id: number;
  title: string;
  style: string;
  type: BLOG_BLOCK_TYPE;
}

export interface BlogBlockMarkdown extends BlogBlock {
  content: string;
}

export interface BlogBlockCode extends BlogBlock {
  content: string;
}

export interface BlogImage {
  image: string;
  preview: string;
  copyright: string;
  title: string;
}

export interface BlogBlockImages extends BlogBlock {
  images: BlogImage[];
  columns: number;
}

export interface BlogAuthor {
  name: string;
  bio: string;
  location: string;
  social: string;
  web: string;
  image: string;
}

export interface BlogPost {
  name: string;
  title: string;
  description: string;
  valid: boolean;
  published: boolean;
  author: string;
  authorId: string;
  lastModified: string;
  content: BlogBlock[];
  publishedAt?: string;
  publishedBy?: string;
  tags: string[];
  topic: string;
  blogAuthor: BlogAuthor;
  coverPicPreview: string;
  coverPicImage: string;
}

export interface BlogPostReference {
  name: string;
  title: string;
  description: string;
  valid: boolean;
  published: boolean;
  publishedAt?: string;
  blogAuthorName?: string;
}

export const BLOG_BLOCK_SCHEMA = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().optional().allow("").max(128),
  style: Joi.string().optional().allow("").max(8192),
  type: Joi.string().valid("markdown", "code", "images").required(),
});

export const BLOG_BLOCK_CODE_SCHEMA = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().optional().allow("").max(128),
  style: Joi.string().optional().allow("").max(8192),
  type: Joi.string().valid("markdown", "code", "images").required(),
  content: Joi.string().required().max(16384),
});

export const BLOG_BLOCK_MARKDOWN_SCHEMA = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().optional().allow("").max(128),
  style: Joi.string().optional().allow("").max(8192),
  type: Joi.string().valid("markdown", "code", "images").required(),
  content: Joi.string().required().max(16384),
});

export const BLOG_IMAGE_SCHEMA = Joi.object({
  image: Joi.string().max(1024).required(),
  preview: Joi.string().max(1024).required(),
  copyright: Joi.string().max(256).required(),
  title: Joi.string().max(256).optional().allow(""),
});

export const BLOG_BLOCK_IMAGES_SCHEMA = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().optional().allow("").max(128),
  style: Joi.string().optional().allow("").max(8192),
  type: Joi.string().valid("markdown", "code", "images").required(),
  images: Joi.array().items(BLOG_IMAGE_SCHEMA).required().min(1).max(32),
  columns: Joi.number().required().min(1).max(4),
});

export const BLOG_AUTHOR_SCHEMA = Joi.object({
  name: Joi.string().required().min(1).max(128),
  bio: Joi.string().required().min(1).max(1024),
  location: Joi.string().required().min(1).max(128),
  social: Joi.string().required().min(1).max(128),
  web: Joi.string().required().min(1).max(128),
  image: Joi.string().optional().allow("").max(1024),
});

export const BLOG_POST_SCHEMA = Joi.object({
  name: Joi.string().required().min(1).max(128),
  title: Joi.string().required().min(1).max(128),
  description: Joi.string().optional().allow("").max(1024),
  published: Joi.boolean().required(),
  valid: Joi.boolean().required(),
  author: Joi.string().required().min(1).max(128),
  authorId: Joi.string().required().min(1).max(128),
  lastModified: Joi.string().required().min(1).max(128),
  content: Joi.array().required().max(32),
  publishedAt: Joi.string().optional().allow("").max(10),
  tags: Joi.array().items(Joi.string().max(128)).optional(),
  topic: Joi.string().required().max(128),
  blogAuthor: BLOG_AUTHOR_SCHEMA.required(),
  coverPicPreview: Joi.string().optional().allow("").max(1024),
  coverPicImage: Joi.string().optional().allow("").max(1024),
});

export const newBlogPost = (authorId: string, author: string): BlogPost => {
  return {
    name: "new_blog_post",
    title: "new blog post",
    description: "",
    valid: true,
    published: false,
    lastModified: new Date().toISOString(),
    content: [],
    author,
    authorId,
    tags: [],
    topic: "default",
    blogAuthor: {
      name: "VanLifezone",
      bio: "VanLifezone",
      location: "Graz, Austria",
      social: "@vanlifezone",
      web: "vanlifezone.com",
      image: "",
    },
    coverPicPreview: "",
    coverPicImage: "",
  } as BlogPost;
};

export const newBlogBlockCode = (): BlogBlockCode => {
  return {
    id: Date.now(),
    title: "new-code-block",
    content: "CODE BLOCK",
    style: "",
    type: "code",
  };
};

export const newBlogBlockMarkdown = (): BlogBlockMarkdown => {
  return {
    id: Date.now(),
    title: "new-markdown-block",
    content: "MARKDOWN CONTENT BLOCK",
    style: "",
    type: "markdown",
  };
};

export const newBlogBlockImages = (): BlogBlockImages => {
  return {
    id: Date.now(),
    title: "new-markdown-block",
    style: "",
    type: "images",
    images: [],
    columns: 1,
  };
};

export interface BlockData {
  isValid: boolean;
  isDirty: boolean;
  errors: any;
  fields: any;
}

// export const updateBlogPostModelToLatest = (
//   blogPost: DatabaseEntry<BlogPost>
// ): DatabaseEntry<BlogPost> => {
//   const newBlogPost: DatabaseEntry<BlogPost> = JSON.parse(
//     JSON.stringify(blogPost)
//   );
//   newBlogPost.data.content = newBlogPost.data.content.map((block) => {
//     // images
//     if (!block.images) {
//       block.images = {
//         previews: [],
//         images: [],
//         columns: 1,
//       };
//     }
//     return block;
//   });
//   console.log(
//     "returning new blog post",
//     JSON.stringify(newBlogPost, undefined, 2)
//   );
//   return newBlogPost;
// };

/**
 * Copies a block as a valid block of the given type. All the necessary fields will be copied or created with the
 * appropriate default values.
 *
 * @param block The original block
 * @param type The type of the new block
 */
export const asValidBlock = (
  block: BlogBlock,
  type: string
): BlogBlockMarkdown | BlogBlockImages | BlogBlockCode | BlogBlock => {
  switch (type) {
    case "code":
      return {
        id: block.id,
        type,
        title: block.title,
        style: block.style,
        content: Reflect.get(block, "content") ?? "",
      } as BlogBlockCode;
    case "markdown":
      return {
        id: block.id,
        type,
        title: block.title,
        style: block.style,
        content: Reflect.get(block, "content") ?? "",
      } as BlogBlockMarkdown;
    case "images":
      return {
        id: block.id,
        type,
        title: block.title,
        style: block.style,
        images: Reflect.get(block, "images") ?? [],
        columns: Reflect.get(block, "columns") ?? 1,
      } as BlogBlockImages;
    default:
      return block;
  }
};

export interface BlogPublicationRequest {
  id: string;
}
