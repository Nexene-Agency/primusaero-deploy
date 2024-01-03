import {useFormContext, useFormState} from "react-hook-form";
import React from "react";
import {FormControl, FormLabel, Input, Select, Switch, Text, Textarea,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing} from "@framework/utils";
import ChipsComponent from "@framework/components/chips.component";
import {Selectable} from "@framework/model";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});

  const getContentParts = () => {
    return getValues("contentParts").map(
      (value: string) => ({id: value, name: value} as Selectable)
    );
  };

  const contentPartsChanged = (contentParts: Selectable[]) => {
    setValue(
      "contentParts",
      contentParts.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const getCssParts = () => {
    return getValues("cssParts").map(
      (value: string) => ({id: value, name: value} as Selectable)
    );
  };

  const cssPartsChanged = (cssParts: Selectable[]) => {
    const parts = cssParts.map((value: Selectable) => value.id);
    setValue(
      "cssParts",
      parts,
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
    const newObject: Record<string, string> = {};
    const oldObject = getValues("defaultCssParts");
    parts.forEach((key: string) => {
      newObject[key] = oldObject[key] ?? "";
    });
    setValue("defaultCssParts", newObject, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
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

      <div className="flex gap-4">
        <FormControl>
          <FormLabel>{t("app.content.contentParts")}</FormLabel>
          <ChipsComponent
            values={getContentParts()}
            onChange={contentPartsChanged}
            enableNew={true}
          ></ChipsComponent>
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.content.cssParts")}</FormLabel>
          <ChipsComponent
            values={getCssParts()}
            onChange={cssPartsChanged}
            enableNew={true}
          ></ChipsComponent>
        </FormControl>
      </div>

      <div className="flex gap-4">
        <FormControl>
          <div className="flex items-center gap-4">
            <FormLabel className=" flex whitespace-nowrap">{t("app.content.renderAs.caption")}</FormLabel>
            <Select id={"renderAs"} {...register("renderAs")}>
              <option key="builtIn" value="builtIn">
                {t("app.content.renderAs.builtIn")}
              </option>
              <option key="html" value="html">
                {t("app.content.renderAs.html")}
              </option>
              <option key="md" value="md">
                {t("app.content.renderAs.md")}
              </option>
            </Select>
          </div>
        </FormControl>

        <FormControl>
          <div className="flex items-center gap-4">
            <Switch id="valid" {...register("valid")} />
            <Text>{t("app.fields.valid")}</Text>
          </div>
        </FormControl>

        <FormControl>
          <div className="flex items-center gap-4">
            <Switch id="valid" {...register("allowChildren")} />
            <Text>{t("app.content.block.allowChildren")}</Text>
          </div>
        </FormControl>
      </div>

    </form>
  );
};

export default BasicTab;
