import {useFormContext, useFormState} from "react-hook-form";
import React from "react";
import {FormControl, FormLabel, Input, Switch, Text, Textarea,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing} from "@framework/utils";
import {Selectable} from "@framework/model";
import ChipsComponent from "@framework/components/chips.component";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});

  const getTopicsParts = () => {
    return (getValues("topics") ?? []).map(
      (value: string) => ({id: value, name: value} as Selectable)
    );
  };

  const topicsPartsChanged = (topicParts: Selectable[]) => {
    setValue(
      "topics",
      topicParts.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const getSimilarsParts = () => {
    return (getValues("similars") ?? []).map(
      (value: string) => ({id: value, name: value} as Selectable)
    );
  };

  const similarsPartsChanged = (topicParts: Selectable[]) => {
    setValue(
      "similars",
      topicParts.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  return (
    <form onSubmit={doNothing}>
      <div className="flex gap-4">
        <FormControl>
          <FormLabel>{t("app.fields.name")}</FormLabel>
          <Input
            id="name"
            placeholder={t("app.fields.name")!}
            bg="white"
            {...register("name")}
            autoFocus={true}
            borderColor={errors.name ? "red" : "inherit"}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t("app.fields.code")}</FormLabel>
          <Input
            id="code"
            placeholder={t("app.fields.code")!}
            bg="white"
            {...register("code")}
            borderColor={errors.code ? "red" : "inherit"}
          />
        </FormControl>
      </div>

      <FormControl className="mt-2">
        <FormLabel>{t("app.fields.description")}</FormLabel>
        <Textarea
          id="description"
          placeholder={t("app.fields.description")!}
          {...register("description")}
          bg="white"
          borderColor={errors.description ? "red" : "inherit"}
        />
      </FormControl>

      <div className="flex gap-4 mt-2">
        <FormControl>
          <FormLabel>{t("app.fields.topics")}</FormLabel>
          <ChipsComponent
            values={getTopicsParts()}
            onChange={topicsPartsChanged}
            enableNew={true}
          ></ChipsComponent>
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.similars")}</FormLabel>
          <ChipsComponent
            values={getSimilarsParts()}
            onChange={similarsPartsChanged}
            enableNew={true}
          ></ChipsComponent>
        </FormControl>
      </div>

      <div className="flex gap-4 mt-2">
        <FormControl>
          <div className="flex items-center gap-4">
            <Switch id="valid" {...register("valid")} />
            <Text>{t("app.fields.valid")}</Text>
          </div>
        </FormControl>

        <FormControl>
          <div className="flex items-center gap-4">
            <Switch id="standardHeader" {...register("standardHeader")} />
            <Text>{t("app.content.file.standardHeader")}</Text>
          </div>
        </FormControl>

        <FormControl>
          <div className="flex items-center gap-4">
            <Switch id="standardFooter" {...register("standardFooter")} />
            <Text>{t("app.content.file.standardFooter")}</Text>
          </div>
        </FormControl>

      </div>

    </form>
  );
};

export default BasicTab;
