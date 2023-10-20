import {
  getClientTranslator,
  getFormattedDate,
} from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, FormLabel, Text } from "@chakra-ui/react";
import React from "react";

const HistoryTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <FormControl className="w-full">
          <FormLabel>{t("app.article.submitted")}</FormLabel>
          <Text>{getFormattedDate(getValues("submitted"))}</Text>
        </FormControl>
        <FormControl className="w-full">
          <FormLabel>{t("app.article.processed")}</FormLabel>
          <Text>{getFormattedDate(getValues("processed"))}</Text>
        </FormControl>
        <FormControl className="w-full">
          <FormLabel>{t("app.article.processedBy")}</FormLabel>
          <Text>{getValues("processedBy") || "n/a"}</Text>
        </FormControl>
      </form>
    </div>
  );
};

export default HistoryTab;
