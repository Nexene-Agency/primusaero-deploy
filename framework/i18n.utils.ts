import moment from "moment";

export const getMessages = (locale: string, messages: any) => {
  return Reflect.has(messages, locale)
    ? Object.assign(
        { ...messages[process.env.NEXT_PUBLIC_LANGUAGE!] },
        { ...messages[locale] }
      )
    : messages[process.env.NEXT_PUBLIC_LANGUAGE!];
};

export const flatten = (data: object): object => {
  const result: object = {};

  function recurse(current: object, property: string) {
    if (Object(current) !== current) {
      Reflect.set(result, property, current);
    } else if (Array.isArray(current)) {
      for (var i = 0, l = current.length; i < l; i++)
        recurse(current[i], property + "[" + i + "]");
      if (l == 0) Reflect.set(result, property, []);
    } else {
      var isEmpty = true;
      for (var p in current) {
        isEmpty = false;
        recurse(Reflect.get(current, p), property ? property + "." + p : p);
      }
      if (isEmpty && property) Reflect.set(result, property, {});
    }
  }

  recurse(data, "");
  return result;
};

export type Translator = (key: string, params?: object) => string;

export const translator = (messages: any): Translator => {
  return (key: string, params?: object) => {
    let data = Reflect.get(messages, key);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        data = data.replace(`{{${key}}}`, value);
      }
    }
    return data;
  };
};

export const getServerFormattedDate = (
  locale: string,
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
  return theDate.locale(locale).format(format);
};
