import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import {
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import ChipsComponent from "@framework/components/chips.component";
import { Selectable } from "@framework/model";

const BasicTab = (params: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  const getTags = () => {
    return getValues("tags").map(
      (value: string) => ({ id: value, name: value } as Selectable)
    );
  };

  const tagsChanged = (tags: Selectable[]) => {
    setValue(
      "tags",
      tags.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <FormControl className="w-full">
          <FormLabel>{t("app.fields.name")}</FormLabel>
          <Input
            id="name"
            className="__nice-input"
            placeholder={t("app.fields.name")!}
            {...register("name")}
            bg="white"
            autoFocus={true}
            borderColor={errors.name ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>{t("app.fields.title")}</FormLabel>
          <Input
            id="title"
            className="__nice-input"
            placeholder={t("app.fields.title")!}
            {...register("title")}
            bg="white"
            borderColor={errors.title ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.description")}</FormLabel>
          <Textarea
            id="description"
            placeholder={t("app.fields.description")!}
            {...register("description")}
            bg="white"
            borderColor={errors.description ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>{t("app.fields.topic")}</FormLabel>
          <Input
            id="topic"
            className="__nice-input"
            placeholder={t("app.fields.topic")!}
            {...register("topic")}
            bg="white"
            borderColor={errors.topic ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.tags")}</FormLabel>
          <ChipsComponent
            values={getTags()}
            onChange={tagsChanged}
            enableNew={true}
          ></ChipsComponent>
        </FormControl>

        <FormControl>
          <div className="__hstack __gap-16px">
            <Switch id="valid" {...register("valid")} />
            <Text>{t("app.fields.valid")}</Text>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default BasicTab;
