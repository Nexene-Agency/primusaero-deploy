import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const PropertiesTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <FormControl className="w-full">
          <FormLabel>
            {t("app.fields.title")}
            <sup>*</sup>
          </FormLabel>
          <Input
            id="title"
            placeholder={t("app.fields.title")!}
            {...register("title")}
            bg="white"
            autoFocus={true}
            borderColor={errors.title ? "red !important" : "inherit"}
          />
        </FormControl>
      </form>
    </div>
  );
};

export default PropertiesTab;
