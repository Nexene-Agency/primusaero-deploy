/* eslint-disable react/no-children-prop */
"use client";
import PropTypes from "prop-types";
import {
  BlogBlock,
  BlogBlockCode,
  BlogBlockImages,
  BlogBlockMarkdown,
} from "@components/dashboard/blogs/model";
import { Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import React from "react";

const Renderer = (props: any) => {
  const blocks = props.blocks as BlogBlock[];

  const renderMarkdownBlock = (block: BlogBlockMarkdown) => (
    <div
      onClick={() => clicked(block)}
      className="__blog-block __markdown __in-editor"
      id={`block-${block.id}`}
    >
      <ReactMarkdown
        key={`mdblk-${block.id}`}
        children={block.content}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      />
    </div>
  );

  const clicked = (block: BlogBlock) => {
    props.onClick(block);
  };

  const renderCodeBlock = (block: BlogBlockCode) => (
    <div
      key={`cdblk-${block.id}`}
      id={`block-${block.id}`}
      className="__blog-block __code __in-editor"
      onClick={() => clicked(block)}
    >
      <pre>{block.content}</pre>
    </div>
  );

  const renderImagesBlock = (block: BlogBlockImages) => (
    <div
      key={`imgblk-${block.id}`}
      id={`block-${block.id}`}
      className={`__blog-block __images __in-editor __columns-${block.columns}`}
      onClick={() => clicked(block)}
    >
      {block.images.map((image, index) => (
        <div
          key={`img-${block.id}-${index}`}
          className="__blog-image flex flex-col"
        >
          <img src={image.image} />
          <div className="__blog-image-title">
            &copy; {image.copyright} – {image.title}
          </div>
        </div>
      ))}
    </div>
  );

  const renderBlockByType = (block: BlogBlock) => {
    switch (block.type) {
      case "markdown":
        return renderMarkdownBlock(block as BlogBlockMarkdown);
      case "code":
        return renderCodeBlock(block as BlogBlockCode);
      case "images":
        return renderImagesBlock(block as BlogBlockImages);
      default:
        return <div>UNKNOWN BLOCK</div>;
    }
  };

  const styleAsText = (style: string, index: number) => {
    return style.replaceAll("{{id}}", "#block-" + index);
  };

  const renderBlock = (block: BlogBlock) => (
    <div key={block.id}>
      <style key={`blskey-${block.id}`}>
        {styleAsText(block.style, block.id)}
      </style>
      {renderBlockByType(block)}
    </div>
  );

  const renderAll = () => {
    return blocks.length < 1 ? (
      <div className="ml-10 mt-10">
        <Text fontSize="xl" color="red">
          No content yet, use the menu on the top left to add new content
        </Text>
      </div>
    ) : (
      blocks.map((block) => renderBlock(block))
    );
  };

  return <div className="__blog-page">{renderAll()}</div>;
};

Renderer.propTypes = {
  blocks: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Renderer;
