import Joi from "joi";

export const CONTENT_BLOCKS_COLLECTION = "blocks";

export type RenderingType = "builtIn" | "html" | "md";

export interface ContentBlock {
  code: string;
  name: string;
  description?: string;
  contentParts: string[];
  cssParts: string[];
  defaultCssParts: Record<string, string>;
  renderAs: RenderingType;
  template?: string;
  valid: boolean;
  allowChildren: boolean;
}

export const CONTENT_BLOCK_SCHEMA = Joi.object({
  code: Joi.string().required().max(32),
  name: Joi.string().required().max(64),
  description: Joi.string().optional().allow("").max(512),
  contentParts: Joi.array().items(Joi.string()).required().max(32),
  cssParts: Joi.array().items(Joi.string()).required().max(32),
  defaultCssParts: Joi.object().pattern(Joi.string().max(32), Joi.string().max(512)).required().max(32),
  renderAs: Joi.string().valid("builtIn", "html", "md").required(),
  template: Joi.string().optional().allow("").max(4096),
  valid: Joi.boolean().required(),
  allowChildren: Joi.boolean().required(),
});

export const newContentBlock = (): ContentBlock => {
  return {
    code: "",
    name: "",
    description: "",
    contentParts: [],
    cssParts: [],
    defaultCssParts: {},
    renderAs: "builtIn",
    template: "",
    valid: true,
    allowChildren: false,
  } as ContentBlock;
};

export const CONTENT_FILES_COLLECTION = "files";

export const CONTENT_FILE_VERSION_COLLECTION = (fileId: string, version: number): string => {
  return `files/${fileId}||versions||${version}`;
};

export interface ContentFile {
  code: string;
  name: string;
  description?: string;
  valid: boolean;
  version: number;
  publishedVersion: number;
  standardHeader: boolean;
  standardFooter: boolean;
  signaturePicture?: string;
  signaturePreview?: string;
  lang: string;
  publishedAt: string;
  publishedBy: string;
  topics: string[];
  similars: string[];
}

export const CONTENT_FILE_SCHEMA = Joi.object({
  code: Joi.string().required().max(64),
  name: Joi.string().required().max(64),
  description: Joi.string().optional().allow("").max(512),
  valid: Joi.boolean().required(),
  version: Joi.number().required(),
  publishedVersion: Joi.number().required(),
  standardHeader: Joi.boolean().required(),
  standardFooter: Joi.boolean().required(),
  signaturePicture: Joi.string().optional().allow("").max(512),
  signaturePreview: Joi.string().optional().allow("").max(512),
  lang: Joi.string().required().max(3),
  publishedAt: Joi.string().optional().allow("").max(64),
  publishedBy: Joi.string().optional().allow("").max(64),
  topics: Joi.array().items(Joi.string().max(32)).required().max(32),
  similars: Joi.array().items(Joi.string().max(32)).required().max(32),
});

export const newContentFile = (): ContentFile => {
  return {
    code: "",
    name: "",
    description: "",
    valid: true,
    version: 1,
    publishedVersion: 0,
    standardHeader: false,
    standardFooter: false,
    lang: "en",
    publishedAt: "",
    publishedBy: "",
    topics: [],
    similars: [],
  } as ContentFile;
};

export interface ContentFileVersion {
  createdAt: string;
  createdBy: string;
  version: number;
  updatedAt?: string;
  updatedBy?: string;
  publishedAt?: string;
  publishedBy?: string;
  blocks: ContentFileBlock[];
}

export const CONTENT_FILE_VERSION_SCHEMA = Joi.object({
  version: Joi.number().required(),
  createdAt: Joi.string().required().max(64),
  createdBy: Joi.string().required().max(64),
  updatedAt: Joi.string().optional().allow("").max(64),
  updatedBy: Joi.string().optional().allow("").max(64),
  publishedAt: Joi.string().optional().allow("").max(64),
  publishedBy: Joi.string().optional().allow("").max(64),
  blocks: Joi.array().items(Joi.object()).required().max(32),
});

export const newContentFileVersion = (user: string, version: number, blocks?: ContentFileBlock[]): ContentFileVersion => {
  return {
    version,
    createdAt: new Date().toISOString(),
    createdBy: user,
    updatedAt: "",
    updatedBy: "",
    publishedAt: "",
    publishedBy: "",
    blocks: blocks ?? [],
  } as ContentFileVersion;
};

export const findBlock = (blocks: ContentFileBlock[], blockId: string): ContentFileBlock | undefined => {
  for (const block of blocks) {
    if (block.id === blockId) {
      return block;
    }
    const found = findBlock(block.children, blockId);
    if (found) {
      return found;
    }
  }
  return undefined;
};

export interface FlattenedBlock {
  block: ContentFileBlock;
  level: number;
}

export const flatten = (blocks: ContentFileBlock[], level = 0): FlattenedBlock[] => {
  return blocks.reduce((acc, block) => {
    return [...acc, {block, level}, ...flatten(block.children, level + 1)];
  }, [] as FlattenedBlock[]);
};

export const replaceInBlocks = (blocks: ContentFileBlock[], blockId: string, newBlock: ContentFileBlock): ContentFileBlock[] => {
  return blocks.map((block) => {
    if (block.id === blockId) {
      return newBlock;
    }
    return {
      ...block,
      children: replaceInBlocks(block.children, blockId, newBlock),
    };
  });
};

export const deleteInBlocks = (blocks: ContentFileBlock[], blockId: string): ContentFileBlock[] => {
  return blocks.filter((block) => block.id !== blockId).map((block) => {
    return {
      ...block,
      children: deleteInBlocks(block.children, blockId),
    };
  });
};

export interface ContentFileBlock {
  id: string;
  code: string;
  name: string;
  contentParts: Record<string, string>;
  cssParts: Record<string, string>;
  markdown?: string;
  valid: boolean;
  children: ContentFileBlock[];
}

export const CONTENT_FILE_BLOCK_SCHEMA = Joi.object({
  id: Joi.string().required().max(32),
  code: Joi.string().required().max(32),
  name: Joi.string().required().max(64),
  contentParts: Joi.object().pattern(Joi.string().max(32), Joi.string().max(2048)).required().max(32),
  cssParts: Joi.object().pattern(Joi.string().max(32), Joi.string().max(512)).required().max(32),
  markdown: Joi.string().optional().allow("").max(16384),
  valid: Joi.boolean().required(),
  children: Joi.array().items(Joi.object()).required().max(32),
});

export const newContentFileBlock = (template: ContentBlock): ContentFileBlock => {
  console.log("using template", template);
  const contentParts = template.contentParts.map((key) => [key, ""]).reduce((obj, [key, value]) => ({
    ...obj,
    [key]: value
  }), {});
  const cssParts = template.cssParts.map((key) => [key, template.defaultCssParts[key] ?? ""]).reduce((obj, [key, value]) => ({
    ...obj,
    [key]: value
  }), {});

  return {
    id: `${new Date().getTime()}`,
    code: template.code,
    name: "new block",
    contentParts,
    cssParts,
    markdown: "",
    valid: true,
    children: [],
  } as ContentFileBlock;
};

export enum BLOCK_ACTIONS {
  SAVE = "save",
  ADD_CHILD = "add_child",
  DELETE = "delete",
  ADD = "add",
  SAVE_FILE = "save_file",
  LEAVE_EDITOR = "leave_editor",
}

export interface FilePublicationRequest {
  fileId: string;
}

export const PUBLISHED_FILES_COLLECTION = "publishedFiles";