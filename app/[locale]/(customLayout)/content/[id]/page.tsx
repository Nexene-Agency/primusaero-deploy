import React, {Suspense} from "react";
import LOCAL_MESSAGES from "./messages";
import MESSAGES from "@app/components/data/common-messages";
import {flatten, getMessages, getServerFormattedDate, translator} from "@framework/i18n.utils";
import "../../../../styles/brand.css";
import "./page.css";
import {ContentResponse, getPublishedContent} from "@app/server-actions/content";
import PrimaryButton from "@app/components/webparts/primary.button";
import ArrowRight from "@components/icons/ArrowRight";
import Header from "@app/components/webparts/header";
import Footer from "@app/components/webparts/footer";
import {ContentFile, ContentFileBlock, ContentFileVersion} from "@components/dashboard/contents/model";
import Print from "@components/icons/Print";
import Share from "@components/icons/Share";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {neutralizeHtml} from "@framework/utils";
import {DatabaseEntry} from "@framework/firebase.utils";
import PrintIcon from "@components/webparts/print.icon";
import ShareIcon from "@components/webparts/share.icon";

interface PageProps {
  params: { locale: string, id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const postsInPage = 4;

const ContentPage = async ({params, searchParams}: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const tc = translator(flatten(getMessages(params.locale, MESSAGES))); // common translator

  const content: ContentResponse = await getPublishedContent(params.id);

  const selectFile = () => {
    const localeFile = content.contentFiles.find((file) => file.data.lang === params.locale);
    const defaultFile = content.contentFiles.find((file) => file.data.lang === process.env.NEXT_PUBLIC_LANGUAGE);
    return localeFile ?? defaultFile ?? content.contentFiles[0];
  };

  const renderHeader = (file: ContentFile, version: ContentFileVersion) => (
    <div className="w-full flex flex-col gap-8 lg:gap-12 mb-12">
      <div className="text-stone-950 text-3xl lg:text-6xl font-bold font-muller uppercase">{file.name}</div>
      <div className="hidden lg:flex text-neutral-500 text-lg font-normal gap-2">
        <span>{getServerFormattedDate(params.locale, file.publishedAt, "LL")}</span>
        <span>•</span>
        <span>
        {tl("postedAt",
          {
            time: getServerFormattedDate(params.locale, file.publishedAt, "HH:mm"),
            author: file.publishedBy
          })}
          </span>
        <span className="grow"></span>
        <Suspense fallback={<Print className="text-black cursor-pointer"/>}>
          <PrintIcon/>
        </Suspense>
        <Suspense fallback={<Share className="text-black cursor-pointer"/>}>
          <ShareIcon description={file.description} title={file.name}/>
        </Suspense>
      </div>
      <div className="lg:hidden flex text-neutral-500 text-lg font-normal">
        <div className="flex flex-col">
          <div className="flex">
            <span>{getServerFormattedDate(params.locale, file.publishedAt, "LL")}</span>
            <span>•</span>
            {tl("postedAtOnlyTime",
              {
                time: getServerFormattedDate(params.locale, file.publishedAt, "HH:mm"),
              })}
          </div>
          <span>
            {tl("postedAtOnlyBy",
              {
                author: file.publishedBy
              })}
          </span>
        </div>
        <span className="grow"></span>
        <Share className="text-black cursor-pointer"/>
      </div>
    </div>
  );

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
        <div id={`b-${block.id}`} className={`${block.cssParts.containerClass} __markdown`}>
          <ReactMarkdown
            key={`mdblk-${block.id}`}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {block.markdown ?? "# No content yet"}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  const renderHtmlBlock = (block: ContentFileBlock) => {
    const buildingBlock = content.blockDefinitions.find((b) => b.data.code === block.code);
    let payload = buildingBlock?.data.template ?? `<div>${tl("noTemplate")}</div>`;
    Object.entries(block.cssParts).forEach(([key, value]) => {
      payload = payload.replaceAll("\$\{" + key + "\}", value);
    });
    Object.entries(block.contentParts).forEach(([key, value]) => {
      payload = payload.replaceAll("\$\{" + key + "\}", value);
    });
    return (<div key={block.id} dangerouslySetInnerHTML={{__html: neutralizeHtml(payload)}}></div>);
  };

  const renderContainer = (block: ContentFileBlock) => (
    <div key={block.id} id={block.id} className={block.cssParts.containerClass}>
      {block.children && block.children.length > 0 ? block.children.map((child) => renderBlock(child)) : block.name}
    </div>
  );

  const renderBlock = (block: ContentFileBlock) => {
    const buildingBlock = content.blockDefinitions.find((b) => b.data.code === block.code);
    switch (buildingBlock?.data.renderAs) {
      case "html":
        return renderHtmlBlock(block);
      case "md":
        return renderMarkdownBlock(block);
      default:
        return renderContainer(block);
    }
  };

  const renderSimilar = (file: DatabaseEntry<ContentFile>) => (
    <a key={file.id!} className="flex flex-col gap-4 mb-16" href={`/content/${file.data.code}`}>
      <img className="__similar-image object-cover object-center" src={file.data.signaturePicture}/>
      <div className="mt-4 text-neutral-500 text-lg font-normal">
        {getServerFormattedDate(params.locale, file.data.publishedAt, "LL")}
      </div>
      <div className="text-stone-950 text-xl font-normal">{file.data.name}</div>
    </a>
  );

  const fallbackPosts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {content.similarFiles.slice(0, postsInPage).map((file) => renderSimilar(file))}
    </div>
  );

  const renderRelatedArticles = () => (
    <div className="no-print mt-36 lg:mt-72 flex flex-col gap-8 lg:gap-12">
      <div
        className="w-full text-stone-950 text-3xl lg:text-6xl font-bold font-muller uppercase">{tl("relatedArticles")}</div>
      {fallbackPosts()}
    </div>
  );

  const renderContent = () => {
    const file = selectFile();
    const fileIndex = content.contentFiles.indexOf(file);
    const version = content.contentFileVersions[fileIndex];

    return (
      <>
        <div className="flex flex-col mt-8 lg:mt-20 mx-4 lg:mx-60 mb-36 lg:mb-72 print:mb-0">
          {renderHeader(file.data, version.data)}
          {version.data.blocks.map((block) => renderBlock(block))}
          {content.similarFiles.length > 0 ? renderRelatedArticles() : null}
        </div>
      </>
    );
  };

  const renderNotFound = () => (
    <div className="flex flex-col mx-8 my-16 items-center gap-12">
      <div className="text-xl">{tl("notFound")}</div>
      <PrimaryButton asLink={true} target="/">
        <ArrowRight className="fill-white rotate-180"/> {tl("backToHome")}
      </PrimaryButton>
    </div>
  );
  return (
    <>
      {content.contentFiles.length < 1 || content.contentFiles[0].data.standardHeader ?
        <Header locale={params.locale}/> : null}
      <div className="__restricted-width mt-[137px] lg:mt-[108px]">
        {content.contentFiles.length < 1 ? renderNotFound() : renderContent()}
      </div>
      {content.contentFiles.length < 1 || content.contentFiles[0].data.standardFooter ?
        <Footer locale={params.locale}/> : null}
    </>
  );
};
export default ContentPage;
