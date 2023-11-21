import {getCookie, setCookie} from "typescript-cookie";
import {isBrowser} from "framer-motion";
import {uuidv4} from "@firebase/util";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";

export const NULL_SESSION = {
  user: {
    name: "",
    email: "",
    image: "",
  },
  expires: "",
  userId: undefined,
} as Session;

export const getCurrentSession = (): Promise<Session> => {
  if (!isBrowser) {
    return Promise.resolve(NULL_SESSION);
  } else {
    return new Promise((resolve) => {
      getSession().then((session) => {
        if (session) {
          resolve(session);
        } else {
          const value = getCookie("NEXT_UID") ?? uuidv4().toString();
          setCookie("NEXT_UID", value);
          resolve({...NULL_SESSION, userId: value});
        }
      });
    });
  }
};


export const getCumulativeOffset = (element: HTMLElement): { x: number, y: number } => {
  let left = 0;
  let top = 0;
  left = top = 0;
  while (true) {
    left += element.offsetLeft;
    top += element.offsetTop;
    if (!element.offsetParent) {
      break;
    }
    element = element.offsetParent as HTMLElement;
  }
  return {
    x: left,
    y: top
  };
};