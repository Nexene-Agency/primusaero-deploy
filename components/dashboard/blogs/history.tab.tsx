import {
  getClientTranslator,
  getFormattedDate,
} from "@framework/i18n.client.utils";
import { useFormContext } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import React from "react";

const HistoryTab = (props: any) => {
  const t = getClientTranslator();
  const { getValues } = useFormContext();

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <FormControl className="w-full">
          <FormLabel>{t("app.blog.published")}</FormLabel>
          <Text>
            {getValues("published") ? t("app.text.yes") : t("app.text.no")}
          </Text>
        </FormControl>
        <FormControl className="w-full">
          <FormLabel>{t("app.blog.publishedAt")}</FormLabel>
          <Text>
            {getValues("publishedBy")} @{" "}
            {getFormattedDate(getValues("publishedAt"), "LLLL")}
          </Text>
        </FormControl>
        <FormControl className="w-full">
          <FormLabel>{t("app.fields.author")}</FormLabel>
          <Text>{getValues("author")}</Text>
        </FormControl>
        <FormControl className="w-full">
          <FormLabel>{t("app.fields.lastModifiedAt")}</FormLabel>
          <Text>{getFormattedDate(getValues("lastModified"), "LLLL")}</Text>
        </FormControl>
      </form>
    </div>
  );
};

export default HistoryTab;
