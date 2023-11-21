import {useFormContext, useFormState} from "react-hook-form";
import React from "react";
import {FormControl, FormLabel, Input, Switch, Text, Textarea} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing} from "@framework/utils";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});

  return (
    <form onSubmit={doNothing}>
      <FormControl>
        <FormLabel>{t("app.fields.author")}</FormLabel>
        <Input
          id="name"
          placeholder={t("app.fields.author")!}
          {...register("author")}
          bg="white"
          autoFocus={true}
          borderColor={errors.author ? "red" : "inherit"}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("app.fields.text")}</FormLabel>
        <Textarea
          id="text"
          placeholder={t("app.fields.text")}
          {...register("text")}
          bg="white"
          borderColor={errors.text ? "red !important" : "inherit"}
        />
      </FormControl>

      <FormControl>
        <Switch id="valid" {...register("valid")} />
        <Text>{t("app.fields.valid")}</Text>
      </FormControl>
    </form>
  );
};

export default BasicTab;
