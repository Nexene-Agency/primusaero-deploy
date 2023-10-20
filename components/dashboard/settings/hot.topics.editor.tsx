import { useFormContext, useFormState } from "react-hook-form";
import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { getClientTranslator } from "@framework/i18n.client.utils";
import { doNothing } from "@framework/utils";
import { Selectable } from "@framework/model";
import ChipsComponent from "@framework/components/chips.component";

const HotTopicsEditor = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  const getHotTopics = () => {
    return getValues("hotTopics").map(
      (value: string) => ({ id: value, name: value } as Selectable)
    );
  };

  const hotTopicsChanged = (tags: Selectable[]) => {
    setValue(
      "hotTopics",
      tags.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  return (
    <form onSubmit={doNothing}>
      <FormControl>
        <FormLabel>{t("app.setting.hotTopics")}</FormLabel>
        <ChipsComponent
          values={getHotTopics()}
          onChange={hotTopicsChanged}
          enableNew={true}
          hasError={errors.hotTopics}
        ></ChipsComponent>
      </FormControl>
    </form>
  );
};

export default HotTopicsEditor;
