import {Text} from "@chakra-ui/react";
import {ColumnGetterFunction, ListColumnDefinition,} from "@framework/list/list.definition";
import CircleCheckIcon from "@framework/icons/basic/CircleCheckIcon";
import "moment/locale/de";
import {getFormattedDate} from "@framework/i18n.client.utils";

export const loading = (t: Function) => {
  return <Text>{t("messages.loading")}</Text>;
};

export const notAuthenticated = (t: Function) => {
  return (
    <a
      className="__button __primary"
      // href="/protector"
      href="/api/auth/signin"
      // onClick={(e) => {
      //   e.preventDefault();
      //   signIn()
      //     .then(() => {
      //       console.log("signed in");
      //     })
      //     .catch((error) => {
      //       console.error("error signing in", error);
      //     });
      // }}
    >
      {t("actions.login")}
    </a>
  );
};

export const comingSoon = (t: Function) => {
  return <Text fontSize="2xl">{t("messages.coming_soon")}</Text>;
};

export const checkMarkColumnGetter = (
  fieldName: string
): ColumnGetterFunction<any> => {
  // eslint-disable-next-line react/display-name
  return (column: ListColumnDefinition<any>, row: any) => {
    return Reflect.has(row.data, fieldName) &&
    Reflect.get(row.data, fieldName) ? (
      <CircleCheckIcon className="__menu-icon"/>
    ) : null;
  };
};

export const preColumnGetter = (
  fieldName: string
): ColumnGetterFunction<any> => {
  // eslint-disable-next-line react/display-name
  return (column: ListColumnDefinition<any>, row: any) => {
    return Reflect.has(row.data, fieldName) &&
    Reflect.get(row.data, fieldName) ? (
      <pre>{Reflect.get(row.data, fieldName)}</pre>
    ) : null;
  };
};

export const dateGetter = (
  fieldName: string,
  format = "L"
): ColumnGetterFunction<any> => {
  // eslint-disable-next-line react/display-name
  return (column: ListColumnDefinition<any>, row: any) => {
    return Reflect.has(row.data, fieldName) && Reflect.get(row.data, fieldName)
      ? getFormattedDate(Reflect.get(row.data, fieldName), format)
      : null;
  };
};
