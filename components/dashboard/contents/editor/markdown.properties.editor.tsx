import {CONTENT_FILE_BLOCK_SCHEMA, ContentFileBlock} from "@components/dashboard/contents/model";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {useForm, useFormState} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import React, {useState} from "react";
import {Button, FormControl, FormLabel, Input, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {ignorePromise} from "@framework/utils";
import BinIcon from "@framework/icons/basic/BinIcon";
import {useEventContext} from "@framework/context/providers";
import {AppEventType, asEvent} from "@framework/events";
import KeyValueList from "@framework/components/key.value.list";
import MarkdownEditor from "@framework/components/markdown.editor";

export type MarkdownPropertiesEditorProps = {
  block: ContentFileBlock;
}

// NOTE: currently only editing the first markdown block is supported

const MarkdownPropertiesEditor = (props: MarkdownPropertiesEditorProps) => {
  const t = getClientTranslator();
  const [block] = useState<ContentFileBlock>(props.block);
  const {eventBus, sendEvent} = useEventContext();

  const baseForm = useForm({
    defaultValues: {
      ...block
    },
    resolver: joiResolver(CONTENT_FILE_BLOCK_SCHEMA),
    mode: "onChange",
  });
  const {control, reset, getValues, register, setValue, trigger, watch} = baseForm;
  const {errors, isDirty, isValid} = useFormState({control});

  const revert = () => {
    reset(block);
    ignorePromise(trigger());
  };

  const save = () => {
    sendEvent(asEvent(AppEventType.SAVE_BLOCK, getValues() as ContentFileBlock));
  };

  const deleteBlock = () => {
    sendEvent(asEvent(AppEventType.DELETE_BLOCK, block));
  };

  const debug = () => {
    console.log("values", getValues());
    console.log("errors", errors);
    console.log("isValid", isValid);
    console.log("isDirty", isDirty);
  };

  const cssChanged = (cssParts: Record<string, string>) => {
    setValue("cssParts", cssParts, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const markdownContentChanged = (value: string) => {
    setValue("markdown", value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  return (
    <div className="flex flex-col gap-4 py-4 w-full">
      <div className="text-xl font-bold">{t("app.content.block.container")} {getValues("name")}</div>
      <div className="flex flex-row gap-4 items-center">
        <Button size="sm" variant="outline" title={t("app.content.block.delete")} onClick={deleteBlock}>
          <BinIcon className="h-4 w-4"/>
        </Button>
      </div>
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
      <Tabs>
        <TabList>
          <Tab>{t("app.content.block.content")}</Tab>
          <Tab>{t("app.content.block.cssClasses")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MarkdownEditor
              id={`mde-${getValues("id")}`}
              originalText={getValues("markdown")}
              onChange={markdownContentChanged}
            />
          </TabPanel>
          <TabPanel>
            <KeyValueList payload={getValues("cssParts")} onChanged={cssChanged}
                          maxLen={512}></KeyValueList>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="flex flex-row justify-end gap-4">
        <Button variant="outline" colorScheme="black" onClick={debug}>
          debug
        </Button>
        <Button variant="outline" colorScheme="black" onClick={revert}>
          {t("app.actions.revert")}
        </Button>
        <Button variant="outline" colorScheme="green" isDisabled={!isDirty || !isValid} onClick={save}>
          {t("app.actions.apply")}
        </Button>
      </div>
    </div>
  );

};

export default MarkdownPropertiesEditor;