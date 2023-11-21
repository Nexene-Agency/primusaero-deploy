"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Like } from "@components/likes/model";
import { getCurrentSession, NULL_SESSION } from "@framework/client.utils";
import "./likes.css";
import AppHeart from "@components/icons/obsolete/AppHeart";
import AppHeartFull from "@components/icons/obsolete/AppHeartFull";
import axios from "axios";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Session } from "next-auth";

const Likes = (props: any) => {
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [session, setSession] = useState<Session>(NULL_SESSION);
  const [prefix] = useState<string>(props.cssPrefix || "default");
  // const { data: session, status } = useSession();

  useEffect(() => {
    getCurrentSession().then((data) => {
      console.log("likes got session", data);
      setSession(data);
    });
  }, []);

  useEffect(() => {
    if (session.userId) {
      reloadLikes();
    }
  }, [session]);

  const reloadLikes = () => {
    axios
      .get(`/api/likes?p=${props.parent}&pId=${props.parentId}`)
      .then((loaded) => {
        const likes = loaded.data as DatabaseEntry<Like>;
        if (likes.id) {
          setLikes(Reflect.ownKeys(likes.data.likes).length);
          setLiked(Reflect.get(likes.data.likes, session.userId!));
        } else {
          setLikes(0);
          setLiked(false);
        }
      })
      .catch((error) => {
        console.error("cannot load likes", error);
        setLikes(0);
        setLiked(false);
      });
  };

  const toLike = () => {
    axios
      .put("/api/likes", {
        parent: props.parent,
        parentId: props.parentId,
        userId: session.userId!,
      })
      .then((saved) => {
        const like = saved.data as DatabaseEntry<Like>;
        setLikes(Reflect.ownKeys(like.data.likes).length);
        setLiked(Reflect.get(like.data.likes, session.userId!));
      })
      .catch((error) => {
        console.error("cannot save like", error);
      });
  };

  return (
    <div className={`flex flex-col items-center __${prefix}-likes-block`}>
      <div className={"cursor-pointer"} onClick={toLike}>
        {liked ? (
          <AppHeartFull className={`__${prefix}-likes-icon`} />
        ) : (
          <AppHeart className={`__${prefix}-likes-icon`} />
        )}
      </div>
      <div className={`__${prefix}-likes-text`}>{likes}</div>
    </div>
  );
};

Likes.propTypes = {
  parent: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  cssPrefix: PropTypes.string,
};

export default Likes;
