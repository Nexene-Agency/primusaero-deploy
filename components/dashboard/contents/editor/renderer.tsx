/* eslint-disable react/no-children-prop */
"use client";
import PropTypes from "prop-types";
import React from "react";
import {ContentBlock, ContentFile, ContentFileBlock} from "@components/dashboard/contents/model";
import Footer from "@app/components/webparts/footer";
import Header from "@app/components/webparts/header";
import {getCurrentLocale} from "@framework/i18n.client.utils";
import {neutralizeHtml} from "@framework/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {DatabaseEntry} from "@framework/firebase.utils";

const Renderer = (props: any) => {
  const locale = getCurrentLocale();
  const file = props.file as ContentFile;
  const blocks = props.blocks as ContentFileBlock[];
  const buildingBlocks = props.buildingBlocks.map((block: DatabaseEntry<ContentBlock>) => block.data) as ContentBlock[];
  const [markSelectedBlock, setMarkSelectedBlock] = React.useState<boolean>(true);
  const [selectedBlock, setSelectedBlock] = React.useState<ContentFileBlock | undefined>(props.selectedBlock);

  const getStylesAsText = (block: ContentFileBlock) => {
    const parts = Object.entries(block.cssParts).map(([key, value]) => `#b-${block.id} > ${key} {\n ${value};\n}\n`);
    return parts.join("\n");
  };

  const renderMarkdownBlock = (block: ContentFileBlock) => {
    return (
      <div key={block.id}>
        <style>
          {getStylesAsText(block)}
        </style>
        <div id={`b-${block.id}`}
             className={`${block.cssParts.containerClass} ${block.id === selectedBlock?.id && markSelectedBlock ? "bg-red-300" : ""}`}>
          <ReactMarkdown
            key={`mdblk-${block.id}`}
            children={block.markdown && block.markdown.trim().length > 0 ? block.markdown : "# No markdown content yet"}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
    );
  };

  const renderHtmlBlock = (block: ContentFileBlock) => {
    const buildingBlock = buildingBlocks.find((b) => b.code === block.code);
    let payload = buildingBlock?.template ?? "<div>template not found</div>";
    console.log("template", payload);
    Object.entries(block.cssParts).forEach(([key, value]) => {
      payload = payload.replaceAll("\$\{" + key + "\}", value);
    });
    Object.entries(block.contentParts).forEach(([key, value]) => {
      payload = payload.replaceAll("\$\{" + key + "\}", value);
    });
    return (<div key={block.id} dangerouslySetInnerHTML={{__html: neutralizeHtml(payload)}}></div>);
  };

  const renderContainer = (block: ContentFileBlock) => (
    <div key={block.id} id={block.id}
         className={`${block.cssParts.containerClass} ${block.id === selectedBlock?.id && markSelectedBlock ? "bg-red-300" : ""}`}>
      {block.children && block.children.length > 0 ? block.children.map((child) => renderBlock(child)) : block.name}
    </div>
  );

  const renderBlock = (block: ContentFileBlock) => {
    const buildingBlock = buildingBlocks.find((b) => b.code === block.code);
    switch (buildingBlock?.renderAs) {
      case "html":
        return renderHtmlBlock(block);
      case "md":
        return renderMarkdownBlock(block);
      default:
        return renderContainer(block);
    }
  };

  const renderAll = () => {
    return blocks.length < 1 ? (
      <div className="m-10 text-red-500 text-xl font-bold">
        No content yet, use the menu on the top left to add a new block.
      </div>
    ) : (
      blocks.map((block) => renderBlock(block))
    );
  };

  return (
    <>
      {file.standardHeader ? <Header locale={locale} inactive={true}/> : null}
      <div className="__restricted-width mt-[137px] lg:mt-[108px]">
        {renderAll()}
      </div>
      {file.standardFooter ? <Footer locale={locale} inactive={true}/> : null}
    </>
  );
};

Renderer.propTypes = {
  file: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  buildingBlocks: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedBlock: PropTypes.object,
};
export default Renderer;
