"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentSession, NULL_SESSION } from "@framework/client.utils";
import "./comments.css";
import { Comment, CommentLike, newComment } from "./model";
import {
  getClientTranslator,
  getRelativeDate,
} from "@framework/i18n.client.utils";
import { Command, openPopupCommand } from "@framework/events";
import CommentingPopup from "@components/comments/commenting.popup";
import { Avatar, ChakraProvider } from "@chakra-ui/react";
import { DatabaseEntry } from "@framework/firebase.utils";
import axios from "axios";
import AppUpArrow from "@components/icons/AppUpArrow";
import AppDownArrow from "@components/icons/AppDownArrow";
import AppPlus from "@components/icons/AppPlus";
import { Session } from "next-auth";
import { ListContent } from "@/framework/list/list.definition";

const Commenting = (props: any) => {
  const t = getClientTranslator();
  const [comments, setComments] = useState<ListContent<Comment>>({
    data: [],
    pageSize: 1,
  });
  const [session, setSession] = useState<Session>(NULL_SESSION);
  const [prefix] = useState<string>(props.cssPrefix || "default");
  const [popupCommand, setPopupCommand] = useState<Command>();
  const [commentsKey, setCommentsKey] = useState<number>(0);

  useEffect(() => {
    getCurrentSession().then((data) => {
      console.log("commenting got session", data);
      setSession(data);
    });
  }, []);

  useEffect(() => {
    if (session.userId) {
      readComments();
    }
  }, [session]);

  useEffect(() => {
    setCommentsKey(new Date().getTime());
  }, [comments]);

  const readComments = () => {
    axios
      .get(`/api/comments?p=${props.parent}&pId=${props.parentId}`)
      .then((loaded) => {
        const commentList = loaded.data as ListContent<Comment>;
        console.log("got comments for blog entry", commentList);
        setComments(commentList);
      })
      .catch((error) => {
        console.error("cannot load comments", error);
        setComments({ data: [], pageSize: 1 });
      });
  };

  const getLikes = (comment: DatabaseEntry<Comment>): number => {
    let likes = 0;
    Reflect.ownKeys(comment.data.likes).map((key) => {
      likes += Reflect.get(comment.data.likes, key as string) as number;
    });
    return likes;
  };

  const getMyLike = (comment: DatabaseEntry<Comment>): number => {
    return Reflect.get(comment.data.likes, session.userId!)
      ? (Reflect.get(comment.data.likes, session.userId!) as number)
      : 0;
  };

  const updateComments = (comment: DatabaseEntry<Comment>) => {
    const newComments = comments.data.map((item) => {
      console.log("checking", item.id, comment.id);
      if (item.id === comment.id) {
        console.log("returning comment", comment);
        return comment;
      } else {
        console.log("returning original item", item);
        return item;
      }
    });
    setComments((current) => {
      return {
        ...current,
        data: newComments,
      };
    });
  };

  const upVote = (comment: DatabaseEntry<Comment>) => {
    if (getMyLike(comment) > 0) {
      return;
    }
    axios
      .put("/api/comments", {
        commentId: comment.id,
        vote: 1,
        userId: session.userId!,
      } as CommentLike)
      .then((response) => {
        console.log("response", response.data);
        updateComments(response.data as DatabaseEntry<Comment>);
      })
      .catch((error) => {
        console.error(error);
      });
    // do it
  };

  const downVote = (comment: DatabaseEntry<Comment>) => {
    if (getMyLike(comment) < 0) {
      return;
    }
    axios
      .put("/api/comments", {
        commentId: comment.id,
        vote: -1,
        userId: session.userId!,
      } as CommentLike)
      .then((response) => {
        console.log("response", response.data);
        updateComments(response.data as DatabaseEntry<Comment>);
      })
      .catch((error) => {
        console.error(error);
      });
    // do it
  };

  const renderComment = (comment: DatabaseEntry<Comment>, index: number) => {
    console.log("must render comment", comment, index);
    return (
      <div
        className={`__${prefix}-commenting-comment`}
        key={`${commentsKey}-${comment.id!}`}
      >
        <div className="flex flex-col flex-grow">
          <div className="flex">
            <div className={`__${prefix}-commenting-comment-user-image`}>
              {comment.data.userName ? (
                <img
                  src={comment.data.userImage}
                  alt={comment.data.userName}
                  className={`__${prefix}-commenting-avatar`}
                />
              ) : (
                <Avatar src="" />
              )}
            </div>
            <div className="flex flex-col">
              <div className={`__${prefix}-commenting-avatar-name`}>
                {comment.data.userName}
              </div>
              <div className={`__${prefix}-commenting-timestamp ml-4 mt-1`}>
                {getRelativeDate(comment.data.when)}
              </div>
            </div>
          </div>
          <div className={`__${prefix}-commenting-comment-text`}>
            {comment.data.text}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center gap-2 mr-2">
          <div onClick={() => upVote(comment)}>
            <AppUpArrow
              className={`__${prefix}-commenting-arrow ${
                getMyLike(comment) === 1 ? "up" : "cursor-pointer"
              }`}
            />
          </div>
          <div
            className={`__${prefix}-commenting-likes ${
              getMyLike(comment) === 1 ? "up" : ""
            } ${getMyLike(comment) === -1 ? "down" : ""}`}
          >
            {getLikes(comment)}
          </div>
          <div onClick={() => downVote(comment)}>
            <AppDownArrow
              className={`__${prefix}-commenting-arrow  ${
                getMyLike(comment) === -1 ? "down" : "cursor-pointer"
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  // FIXME: implement not approved comments check
  const renderComments = () => {
    return (
      <>
        {comments.data.map((comment, index) => {
          return renderComment(comment, index);
        })}
      </>
    );
  };

  const add = () => {
    if (props.canComment === false) {
      return;
    }
    setPopupCommand(
      openPopupCommand({
        data: newComment(
          props.parent,
          props.parentId,
          props.parentName,
          session.userId!,
          session.user!.name ?? "",
          session.user!.image ?? ""
        ),
      })
    );
  };

  const popupAction = (saved: boolean) => {
    console.log("comment saved", saved);
  };

  return (
    <ChakraProvider>
      <div className={`__${prefix}-commenting-block`}>
        <div className={`__${prefix}-commenting-title`}>
          {t("app.comment.plural")}
        </div>
        <div className={`__${prefix}-commenting-share`}>
          <div>{t("app.comment.add")}</div>
          <div
            className={`${props.canComment ? "cursor-pointer" : ""}`}
            onClick={add}
          >
            <AppPlus className={`__${prefix}-commenting-icon`} />
          </div>
        </div>
        {renderComments()}
        <CommentingPopup
          key={popupCommand?.key}
          command={popupCommand}
          onAction={popupAction}
          prefix={prefix}
        ></CommentingPopup>
      </div>
    </ChakraProvider>
  );
};

Commenting.propTypes = {
  parent: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  parentName: PropTypes.string.isRequired,
  cssPrefix: PropTypes.string,
  canComment: PropTypes.bool.isRequired,
};

export default Commenting;
