"use client";
import {Button, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AppCommandType, asError, closePopupCommand, Command, itemEditedCommand,} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import {DatabaseEntry, saveOrCreate} from "@framework/firebase.utils";
import {useSession} from "next-auth/react";
import {ignorePromise, optionalFunctionWrapper} from "@framework/utils";

import {getClientTranslator} from "@framework/i18n.client.utils";
import {FormProvider, useForm, useFormState} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {
  CONTENT_BLOCK_SCHEMA,
  CONTENT_BLOCKS_COLLECTION,
  ContentBlock,
  newContentBlock
} from "@components/dashboard/contents/model";
import BasicTab from "@components/dashboard/contents/blocks/basic.tab";
import TemplateTab from "@components/dashboard/contents/blocks/template.tab";
import KeyValueList from "@framework/components/key.value.list";

const ContentBlockEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const {data} = useSession();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<ContentBlock>>({
    data: newContentBlock(),
  } as DatabaseEntry<ContentBlock>);
  const [saving, setSaving] = useState<boolean>(false);
  const [command, setCommand] = useState<Command>(props.command);
  const [partsEditorKey, setPartsEditorKey] = useState<number>(0);

  const baseForm = useForm({
    defaultValues: {
      ...model.data
    },
    resolver: joiResolver(CONTENT_BLOCK_SCHEMA),
    mode: "onChange",
  });
  const {control, reset, getValues, setValue, trigger, watch} = baseForm;
  const {errors, isDirty, isValid} = useFormState({control});

  const cssPartsChanged = watch("cssParts");

  useEffect(() => {
    setPartsEditorKey((prev) => prev + 1);
  }, [cssPartsChanged]);

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      console.log("setting model", command.payload);
      setModel(command.payload as DatabaseEntry<ContentBlock>);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => (
    <>{t(model.id ? "app.content.block.singular" : "app.content.block.new")}</>
  );

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved?: DatabaseEntry<ContentBlock>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "ContentBlockEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    saveOrCreate<ContentBlock>(CONTENT_BLOCKS_COLLECTION, {
      id: model.id,
      data: getValues() as ContentBlock,
    })
      .then((saved) => {
        closePopup(saved);
      })
      .catch((error) => {
        console.error(error);
        // @ts-ignore
        sendEvent(
          asError(t("errors.item.save"), t(`errors.backend.${error.code}`))
        );
      })
      .finally(() => setSaving(false));
  };

  const unableToSave = () => {
    return saving || !isDirty || !isValid;
  };

  const renderFooter = () => (
    <>
      <Button variant="outline" mr={3} onClick={debug} isDisabled={saving}>
        debug
      </Button>
      <Button
        variant="outline"
        mr={3}
        onClick={() => closePopup()}
        isDisabled={saving}
      >
        {t("app.actions.cancel")}
      </Button>
      <Button
        variant="outline"
        isDisabled={unableToSave()}
        colorScheme="green"
        onClick={saveModel}
      >
        {/* @ts-ignore */}
        {t(model.id ? "app.actions.save" : "app.actions.create")}
      </Button>
    </>
  );

  const defaultCssPartsChanged = (cssParts: Record<string, string>, errors: Record<string, boolean>) => {
    setValue("defaultCssParts", cssParts, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <PopupContainer
      id={`${id}-popup`}
      key={command?.key}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      command={command}
    >
      <Tabs height="460px" maxHeight="460px">
        <TabList>
          <Tab>{t("app.tabs.basic")}</Tab>
          <Tab>{t("app.content.block.cssParts")}</Tab>
          <Tab>{t("app.tabs.template")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab/>
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <KeyValueList key={partsEditorKey} payload={getValues("defaultCssParts")} onChanged={defaultCssPartsChanged}
                          maxLen={512}></KeyValueList>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <TemplateTab/>
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopupContainer>
  );
};

ContentBlockEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default ContentBlockEditorPopup;
