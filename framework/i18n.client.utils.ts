import moment from "moment/moment";
import { getCookie } from "typescript-cookie";
import { isBrowser } from "framer-motion";
import {
  flatten,
  getMessages,
  Translator,
  translator,
} from "@framework/i18n.utils";

const english = require("./../messages/en.json");
const german = require("./../messages/de.json");

export const getClientTranslator = (): Translator => {
  const allMessages: any = {
    en: english,
    de: german,
  };
  if (!isBrowser) {
    return (key: string, params?: object) => key;
  }
  const currentLocale =
    getCookie("NEXT_LOCALE") ?? process.env.NEXT_PUBLIC_LANGUAGE!;
  // console.log("getClientTranslator.currentMessage", currentLocale);
  return translator(flatten(getMessages(currentLocale, allMessages)));
};

export const getCurrentLocale = (): string => {
  if (!isBrowser) {
    return process.env.NEXT_PUBLIC_LANGUAGE!;
  } else {
    return getCookie("NEXT_LOCALE") ?? process.env.NEXT_PUBLIC_LANGUAGE!;
  }
};

export const getFormattedDate = (
  date?: Date | string,
  format = "L"
): string | undefined => {
  if (!date || date === "") {
    return undefined;
  }
  const theDate = moment(date);
  if (!theDate.isValid()) {
    return "n/a";
  }
  if (!isBrowser) {
    return theDate.format(format);
  }
  const currentLocale =
    getCookie("NEXT_LOCALE") ?? process.env.NEXT_PUBLIC_LANGUAGE!;
  return theDate.locale(currentLocale).format(format);
};

export const getRelativeDate = (
  date?: Date | string,
  withoutSuffix = false
): string | undefined => {
  if (!date || date === "") {
    return undefined;
  }
  const theDate = moment(date);
  if (!theDate.isValid()) {
    return "n/a";
  }
  if (!isBrowser) {
    return theDate.fromNow(withoutSuffix);
  }
  const currentLocale =
    getCookie("NEXT_LOCALE") ?? process.env.NEXT_PUBLIC_LANGUAGE!;
  return theDate.locale(currentLocale).fromNow(withoutSuffix);
};

// function timeAgo (timestamp, locale = 'en') => {
//   let value;
//   const diff = (new Date().getTime() - timestamp.getTime()) / 1000;
//   const minutes = Math.floor(diff / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
//   const months = Math.floor(days / 30);
//   const years = Math.floor(months / 12);
//   const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
//
//   if (years > 0) {
//     value = rtf.format(0 - years, "year");
//   } else if (months > 0) {
//     value = rtf.format(0 - months, "month");
//   } else if (days > 0) {
//     value = rtf.format(0 - days, "day");
//   } else if (hours > 0) {
//     value = rtf.format(0 - hours, "hour");
//   } else if (minutes > 0) {
//     value = rtf.format(0 - minutes, "minute");
//   } else {
//     value = rtf.format(0 - diff, "second");
//   }
//   return value;
// }
