import {useFormContext, useFormState} from "react-hook-form";
import React from "react";
import {FormControl, FormLabel, Textarea,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";

const TemplateTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});

  return (
    <>
      <FormControl>
        <FormLabel>{t("app.fields.template")}</FormLabel>
        <Textarea
          id="description"
          placeholder={t("app.fields.template")!}
          {...register("template")}
          bg="white"
          rows={15}
          borderColor={errors.template ? "red" : "inherit"}
        />
      </FormControl>
    </>
  );
};

export default TemplateTab;
