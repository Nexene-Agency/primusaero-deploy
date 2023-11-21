"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCurrentSession, NULL_SESSION } from "@framework/client.utils";
import "./comments.css";
import AppComments from "@components/icons/obsolete/AppComments";
import { Session } from "next-auth";
import axios from "axios";
import { DatabaseEntry } from "@framework/firebase.utils";
import { CommentsCounter } from "@app/api/counters/model";

const Comments = (props: any) => {
  const [comments, setComments] = useState<number>(0);
  const [session, setSession] = useState<Session>(NULL_SESSION);
  const [prefix] = useState<string>(props.cssPrefix || "default");

  useEffect(() => {
    getCurrentSession().then((data) => {
      setSession(data);
    });
  }, []);

  useEffect(() => {
    if (session.userId) {
      readComments();
    }
  }, [session]);

  const readComments = () => {
    axios
      .get(`/api/comments/count?p=${props.parent}&pId=${props.parentId}`)
      .then((loaded) => {
        const commentCounter = loaded.data as DatabaseEntry<CommentsCounter>;
        console.log("got comments count", commentCounter);
        setComments(commentCounter.data.comments ?? 0);
      });
  };

  return (
    <div className={`__${prefix}-comments-block`}>
      <div>
        <AppComments className={`__${prefix}-comments-icon`} />
      </div>
      <div className={`__${prefix}-comments-icon-text`}>{comments}</div>
    </div>
  );
};

Comments.propTypes = {
  parent: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  cssPrefix: PropTypes.string,
};

export default Comments;
