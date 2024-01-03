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
  CONTENT_FILE_SCHEMA,
  CONTENT_FILES_COLLECTION,
  ContentFile,
  newContentFile
} from "@components/dashboard/contents/model";
import BasicTab from "@components/dashboard/contents/files/basic.tab";
import HistoryTab from "@components/dashboard/contents/files/history.tab";
import SignaturePictureEditorTab from "@components/dashboard/pictures/singature.picture.editor";

const ContentFileEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const {data} = useSession();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<ContentFile>>({
    data: newContentFile(),
  } as DatabaseEntry<ContentFile>);
  const [saving, setSaving] = useState<boolean>(false);
  const [command, setCommand] = useState<Command>(props.command);

  const baseForm = useForm({
    defaultValues: {
      ...model.data
    },
    resolver: joiResolver(CONTENT_FILE_SCHEMA),
    mode: "onChange",
  });
  const {control, reset, getValues, setValue, trigger, register} = baseForm;
  const {errors, isDirty, isValid} = useFormState({control});

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      console.log("setting model", command.payload);
      setModel(command.payload as DatabaseEntry<ContentFile>);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => (
    <>{t(model.id ? "app.content.file.singular" : "app.content.file.new")}</>
  );

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved?: DatabaseEntry<ContentFile>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "ContentFileEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    saveOrCreate<ContentFile>(CONTENT_FILES_COLLECTION, {
      id: model.id,
      data: getValues() as ContentFile,
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

  const signaturePictureSelected = (urls: string[]) => {
    setValue("signaturePicture", urls[0], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("signaturePreview", urls[1], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
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
          <Tab>{t("app.tabs.signaturePicture")}</Tab>
          <Tab>{t("app.tabs.history")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab/>
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <SignaturePictureEditorTab
              imageTag={""}
              onSelected={signaturePictureSelected}
            />
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <HistoryTab/>
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopupContainer>
  );
};

ContentFileEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default ContentFileEditorPopup;
