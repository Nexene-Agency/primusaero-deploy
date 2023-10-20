"use client";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import {
  AppCommandType,
  asError,
  closePopupCommand,
  Command,
  itemEditedCommand,
} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { DatabaseEntry } from "@framework/firebase.utils";
import {
  Picture,
  PICTURE_SCHEMA,
  savePicture,
} from "@components/dashboard/pictures/model";
import { useEventContext } from "@framework/context/providers";
import { ignorePromise, optionalFunctionWrapper } from "@framework/utils";
import PictureEditorTab from "@components/dashboard/pictures/picture.editor.tab";
import { getClientTranslator } from "@framework/i18n.client.utils";

const PictureEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<Picture>>({
    data: {},
  } as DatabaseEntry<Picture>);
  const [saving, setSaving] = useState<boolean>(false);
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [command, setCommand] = useState<Command>(props.command);

  const baseForm = useForm({
    defaultValues: {
      name: model?.data.name,
      description: model?.data.description,
      previewURL: model?.data.previewURL,
      imageURL: model?.data.imageURL,
      fileName: model?.data.fileName,
      tags: model?.data.tags,
    },
    resolver: joiResolver(PICTURE_SCHEMA),
    mode: "onChange",
  });

  const { control, getValues, setValue } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });

  useEffect(() => {
    if (model) {
      console.log("setting form values", model.data);
      baseForm.reset(model.data, { keepValues: false, keepDirty: false });
      ignorePromise(baseForm.trigger());
    }
  }, [model]);

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      setModel(command.payload as DatabaseEntry<Picture>);
    }
  }, [command]);

  const renderHeader = () => (
    <>{t(model.id ? "app.picture.singular" : "app.picture.new")}</>
  );

  const debug = () => {
    console.log("values", getValues());
    console.log("saving", saving);
    console.log("dirty", isDirty);
    console.log("valid", isValid);
    console.log("errors", errors);
  };

  const closePopup = (saved?: DatabaseEntry<Picture>) => {
    console.log("setting command to close popup");
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "pictureEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    const picture = baseForm.getValues() as Picture;
    console.log("values to save", model.id, picture);
    Reflect.ownKeys(picture)
      .filter((key) => key !== "tags")
      .forEach((key) => {
        formData.append(key as string, Reflect.get(picture, key));
      });
    formData.append("tags", JSON.stringify(picture.tags));
    savePicture(picture, formData, model.id)
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

  const entryChanged = (
    valid: boolean,
    dirty: boolean,
    file?: File,
    formData?: FormData
  ) => {
    setFormData(formData!);
  };

  const unableToSave = () => {
    return saving || !isValid || !isDirty;
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
        {t(model.id ? "app.actions.save" : "app.actions.upload")}
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
      <FormProvider {...baseForm}>
        <PictureEditorTab
          key={model.id ?? "-1"}
          onChange={entryChanged}
          editing={!!model.id}
        />
      </FormProvider>
    </PopupContainer>
  );
};

PictureEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default PictureEditorPopup;
