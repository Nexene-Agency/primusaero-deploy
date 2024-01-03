import {useFormContext} from "react-hook-form";
import React from "react";
import {FormControl, FormLabel, Input,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";

const HistoryTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control} = useFormContext();

  return (
    <>
      <FormControl>
        <FormLabel>{t("app.fields.publishedAt")}</FormLabel>
        <Input
          id="publishedAt"
          {...register("publishedAt")}
          disabled={true}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{t("app.fields.publishedBy")}</FormLabel>
        <Input
          id="publishedBy"
          {...register("publishedBy")}
          disabled={true}
        />
      </FormControl>
    </>
  );
};

export default HistoryTab;
