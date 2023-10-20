"use client";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  AppCommandType,
  asError,
  closePopupCommand,
  Command,
  itemEditedCommand,
} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import { DatabaseEntry, saveOrCreate } from "@framework/firebase.utils";
import {
  Location,
  LOCATION_SCHEMA,
  LOCATIONS_COLLECTION,
  newLocation,
} from "@components/dashboard/locations/model";
import { useEventContext } from "@framework/context/providers";
import { useSession } from "next-auth/react";
import { ignorePromise, optionalFunctionWrapper } from "@framework/utils";

import { getClientTranslator } from "@framework/i18n.client.utils";
import BasicTab from "@components/dashboard/locations/basic.tab";
import LocationTab from "@components/dashboard/locations/location.tab";
import TextEditorTab from "@framework/components/text.editor.tab";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import SignaturePictureEditorTab from "@components/dashboard/pictures/singature.picture.editor";

const LocationEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<Location>>({
    data: newLocation(),
  } as DatabaseEntry<Location>);
  const [saving, setSaving] = useState<boolean>(false);
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [command, setCommand] = useState<Command>(props.command);

  const baseForm = useForm({
    defaultValues: {
      name: model?.data.name,
      description: model?.data.description,
      text: model?.data.text,
      signaturePicture: model?.data.signaturePicture,
      signaturePreview: model?.data.signaturePreview,
      imageTag: model?.data.imageTag,
      address: model?.data.address,
      valid: model?.data.valid,
      expires: model?.data.expires,
      type: model?.data.type,
    },
    resolver: joiResolver(LOCATION_SCHEMA),
    mode: "onChange",
  });

  const { control, reset, getValues, setValue, trigger } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      console.log("setting model", command.payload);
      setModel(command.payload as DatabaseEntry<Location>);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => (
    <>{t(model.id ? "app.location.singular" : "app.location.new")}</>
  );

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved?: DatabaseEntry<Location>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "locationEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    saveOrCreate<Location>(LOCATIONS_COLLECTION, {
      id: model.id,
      data: getValues(),
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
        {t(model.id ? "app.actions.save" : "app.actions.upload")}
      </Button>
    </>
  );

  const textChanged = (text: string) => {
    setValue("text", text, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
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
          <Tab>{t("app.location.signaturePicture")}</Tab>
          <Tab>{t("app.tabs.text")}</Tab>
          <Tab>{t("app.location.singular")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <SignaturePictureEditorTab
              imageTag={getValues("imageTag")}
              onSelected={signaturePictureSelected}
            />
          </TabPanel>
          <TabPanel>
            <TextEditorTab
              id="lte"
              text={getValues("text")}
              onChange={textChanged}
            />
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <LocationTab />
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopupContainer>
  );
};

LocationEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default LocationEditorPopup;
