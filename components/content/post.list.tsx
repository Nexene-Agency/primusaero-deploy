"use client";

import {DatabaseEntry} from "@framework/firebase.utils";
import {ContentFile} from "@components/dashboard/contents/model";
import React, {useState} from "react";
import {getServerFormattedDate} from "@framework/i18n.utils";
import PrimaryButton from "@app/components/webparts/primary.button";
import ArrowRight from "@components/icons/ArrowRight";

interface PostListProps {
  posts: DatabaseEntry<ContentFile>[],
  locale: string,
  postsInPage: number,
  loadMoreText: string,
}

const PostList = (props: PostListProps) => {
  const {posts, locale, postsInPage, loadMoreText} = props;
  const [maxPosts, setMaxPosts] = useState(postsInPage);

  const renderBlock = (file: DatabaseEntry<ContentFile>) => {
    return (
      <a key={file.id!} className="flex flex-col gap-4 mb-16" href={`/content/${file.data.code}`}>
        <img className="__newsroom-image object-cover object-center" src={file.data.signaturePicture}/>
        <div className="mt-4 text-neutral-500 text-lg font-normal">
          {getServerFormattedDate(locale, file.data.publishedAt, "LL")}
        </div>
        <div className="text-stone-950 text-xl font-normal">{file.data.name}</div>
      </a>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-6 lg:px-16">
        {posts.slice(0, maxPosts).map((file) => renderBlock(file))}
      </div>
      {maxPosts < posts.length ?
        <div className="flex justify-center mb-72">
          <PrimaryButton onClick={() => setMaxPosts(maxPosts + postsInPage)}>
            <span>{loadMoreText}</span>
            <ArrowRight className="fill-white"/>
          </PrimaryButton>
        </div> : null}
    </div>
  );
};

export default PostList;