import React, {Suspense} from "react";
import LOCAL_MESSAGES from "./messages";
import MESSAGES from "@app/components/data/common-messages";
import {flatten, getMessages, getServerFormattedDate, translator} from "@framework/i18n.utils";
import "../../../styles/brand.css";
import "./page.css";
import {ContentResponse, getPublishedFiles} from "@app/server-actions/content";
import Header from "@app/components/webparts/header";
import Footer from "@app/components/webparts/footer";
import {ContentFile} from "@components/dashboard/contents/model";
import {DatabaseEntry} from "@framework/firebase.utils";
import PostList from "@components/content/post.list";

interface PageProps {
  params: { locale: string };
}

const postsInPage = 4;

const NewsroomPage = async ({params}: PageProps) => {
  const tl = translator(flatten(getMessages(params.locale, LOCAL_MESSAGES))); // local translator
  const tc = translator(flatten(getMessages(params.locale, MESSAGES))); // common translator
  const content: ContentResponse = await getPublishedFiles(["newsroom"]);

  console.log("content", content);

  const renderBlock = (file: DatabaseEntry<ContentFile>) => (
    <a key={file.id!} className="flex flex-col gap-4 mb-16" href={`/content/${file.data.code}`}>
      <img className="__newsroom-image object-cover object-center" src={file.data.signaturePicture}/>
      <div className="mt-4 text-neutral-500 text-lg font-normal">
        {getServerFormattedDate(params.locale, file.data.publishedAt, "LL")}
      </div>
      <div className="text-stone-950 text-xl font-normal">{file.data.name}</div>
    </a>
  );

  const fallBackPosts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-6 lg:px-16">
      {content.contentFiles.slice(0, postsInPage).map((file) => renderBlock(file))}
    </div>
  );

  return (
    <>
      <Header locale={params.locale}/>
      <div className="__restricted-width mt-[137px] lg:mt-[108px]">

        <div
          className="px-6 lg:px-16 pt-12 lg:pt-20 pb-16 lg:pb-36 text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase">{tl("newsRoom")}</div>

        <Suspense fallback={fallBackPosts()}>
          <PostList postsInPage={postsInPage} locale={params.locale} posts={content.contentFiles}
                    loadMoreText={tl("loadMore")}/>
        </Suspense>

        {/*podcast episodes*/}
        <div
          className="px-6 lg:px-16 pt-12 lg:pt-20 pb-16 lg:pb-36 text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase">
          {tl("aeroPeople")}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-top px-6 lg:px-16 mb-20 gap-4 lg:gap-0">
          <div className="w-full lg:w-[24%] text-stone-950 text-xl font-normal">
            {tl("aeroPeopleText")}
          </div>
          <div className="w-full lg:w-[62%] text-neutral-500 text-xl font-normal">
            {tl("aeroPeopleDescription")}
          </div>
        </div>

        <div
          className="flex flex-col-reverse lg:flex-row lg:justify-between items-top px-6 lg:px-16 mb-36 lg:mb-72 gap-8 lg:gap-0">
          <div className="w-full lg:w-[30%] flex flex-col-reverse lg:flex-col gap-8 lg:gap-4">
            <div className="bg-black w-full aspect-video text-white">&nbsp;</div>
            <div className="bg-black w-full aspect-video text-white">&nbsp;</div>
          </div>
          <div className="w-full lg:w-[62%] aspect-video bg-black text-white">
            &nbsp;
          </div>
        </div>

        <div
          className="px-6 lg:px-16 pb-16 lg:pb-36 text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase">
          {tl("socialMedia")}</div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-2 px-6 lg:px-16 pb-72">
          {Array.from({length: 8}).map((_, i) => (<div key={i} className="__social-media-block">&nbsp;</div>))}
        </div>


      </div>
      <Footer locale={params.locale}/>
    </>
  );
};
export default NewsroomPage;
