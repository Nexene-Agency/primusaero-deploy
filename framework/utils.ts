import { FormEvent, ValidationMap } from "react";
import PropTypes from "prop-types";
import Joi from "joi";
import { isBrowser } from "framer-motion";
import { Selectable } from "@framework/model";

export enum SYSTEM_KEYS {
  TOKEN = "_skt",
}

/**
 * Swallows the result of a promise.
 *
 * @param promise The promise
 * @param promiseName The name of the promise
 * @param verbose Whether to log the resolving/rejection or not
 */
export const ignorePromise = (
  promise: Promise<any>,
  promiseName?: string,
  verbose = false
): void => {
  promise
    .then(() => {
      if (verbose) {
        console.log("promise success ignored", promiseName);
      }
    })
    .catch((error) => {
      if (verbose) {
        console.error("promise error ignored", promiseName, error);
      }
    });
};

/**
 * Convenience class to generate classes from class name list.
 *
 * @param classes The classes to use
 * @return string The concatenated class names
 */
export const classNames = (...classes: string[]): string => classes.join(" ");

/**
 * Keys for the local storage.
 */
export const LOCAL_STORE_KEYS = {
  CURRENT_LANG: "-clng",
};

/**
 * The property type schema to use in {@code PropTypes.arrayOf()}.
 */
export const SelectableProperty: ValidationMap<any> = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  target: PropTypes.string,
  icon: PropTypes.node,
  filter: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
};

/**
 * @param first The first array
 * @param second The second array
 * @returns The array of elements which are in both parameters
 */
export function intersection(first?: any[], second?: any[]): any[] {
  return (first || []).filter((value) => (second || []).includes(value));
}

export const DATABASE_ENTRY_SCHEMA = Joi.object({
  id: Joi.string().optional().min(1).max(128), // 1-128
  data: Joi.object().required(),
});

/**
 * Simple delayer which resolves after some specified timeout.
 * @param delayMs The delay in milliseconds
 * @param payload The optional payload
 */
export const delay = (delayMs = 100, payload?: unknown): Promise<unknown> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), delayMs);
  });
};

export const DatabaseEntryProperty: ValidationMap<unknown> = {
  id: PropTypes.string,
  data: PropTypes.object.isRequired,
};

export const indexableDocumentProperty: ValidationMap<unknown> = {
  id: PropTypes.string,
  data: PropTypes.object.isRequired,
};

export const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
});

export const getAuthHeaders = () => {
  const token = localStorage.getItem(SYSTEM_KEYS.TOKEN);
  return Object.assign({}, getDefaultHeaders(), {
    Authorization: `Bearer ${token}`,
  });
};

export const capitalize = (text: string): string => {
  return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
};

export const asSelectable = (
  sample: unknown,
  customization: unknown
): Selectable => {
  return Object.assign({} as Selectable, sample, customization);
};

export const dashedStringToCamelCase = (dashedString: string): string => {
  return dashedString.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

export const deepCopy = <T>(original: T): T => {
  return JSON.parse(JSON.stringify(original));
};

export const doNothingFormEventHandler = (e: FormEvent) => {
  e.preventDefault();
};

export const delayer = <T>(ms: number, payload?: T): Promise<T | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), ms);
  });
};

export const shorten = (text: string, maxLength = 20): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const asFormattedDate = (
  date: string | Date,
  locale?: string,
  options?: Partial<Intl.DateTimeFormatOptions>
): string => {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(
    locale ?? process.env.NEXT_PUBLIC_LOCALE!,
    Object.assign(
      {
        dateStyle: "long",
        timeStyle: "long",
        timeZone: "UTC",
      },
      options
    )
  ).format(value);
};

export const fromLocalStorage = (
  key: string,
  defaultValue: string,
  asObject = false
): string | object => {
  const value = isBrowser
    ? localStorage?.getItem(key) ?? defaultValue
    : defaultValue;
  return asObject ? JSON.parse(value) : value;
};

export const toLocalStorage = (key: string, value: string | object) => {
  if (isBrowser) {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  }
};

export const optionalFunctionWrapper = (
  name: string,
  fn?: Function
): Function =>
  fn
    ? fn
    : () => {
        console.warn(`Function ${name} is not defined!!!`);
      };

export const doNothing = (e: FormEvent) => {
  e.preventDefault();
};

export const getRecaptchaToken = (action: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    grecaptcha.enterprise.ready(() => {
      // @ts-ignore
      grecaptcha.enterprise
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action,
        })
        .then((token: any) => {
          resolve(token);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  });
};
