"use client";
import {Button, Tab, TabList, TabPanel, TabPanels, Tabs, useToast,} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AppCommandType, asError, closePopupCommand, Command, itemEditedCommand, showToast,} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import {DatabaseEntry, saveOrCreate} from "@framework/firebase.utils";
import {useSession} from "next-auth/react";
import {ignorePromise, optionalFunctionWrapper, SelectableProperty} from "@framework/utils";

import {getClientTranslator} from "@framework/i18n.client.utils";
import BasicTab from "@components/dashboard/companies/basic.tab";
import {FormProvider, useForm, useFormState} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import SignaturePictureEditorTab from "@components/dashboard/pictures/singature.picture.editor";
import {COMPANIES_COLLECTION, Company, COMPANY_SCHEMA, newCompany} from "@components/dashboard/companies/model";
import SocialMediaTab from "@components/dashboard/socials/social.media";
import {Selectable} from "@framework/model";

const isDevelopment = process.env.NEXT_PUBLIC_DEVELOPMENT === "true";

const CompaniesEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const {data} = useSession();
  const [id] = useState<string>(props.id);
  const toast = useToast();
  const [model, setModel] = useState<DatabaseEntry<Company>>({
    data: newCompany(),
  } as DatabaseEntry<Company>);
  const [saving, setSaving] = useState<boolean>(false);
  const [command, setCommand] = useState<Command>(props.command);
  const [locations] = useState<Selectable[]>(props.locations);

  const baseForm = useForm({
    defaultValues: {
      ...model.data
    },
    resolver: joiResolver(COMPANY_SCHEMA),
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
      setModel(command.payload as DatabaseEntry<Company>);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => (
    <>{t(model.id ? "app.company.singular" : "app.company.new")}</>
  );

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved?: DatabaseEntry<Company>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "companyEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    saveOrCreate<Company>(COMPANIES_COLLECTION, {
      id: model.id,
      data: getValues() as Company,
    })
      .then((saved) => {
        closePopup(saved);
      })
      .catch((error) => {
        console.error(error);
        // @ts-ignore
        showToast(toast, asError(t("errors.item.save"), t(`errors.backend.${error.code}`)));
      })
      .finally(() => setSaving(false));
  };

  const unableToSave = () => {
    return saving || !isDirty || !isValid;
  };

  const renderFooter = () => (
    <>
      {isDevelopment ? <Button variant="outline" mr={3} onClick={debug} isDisabled={saving}>
        debug
      </Button> : null}
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
      <Tabs height="560px" maxHeight="560px">
        <TabList>
          <Tab>{t("app.tabs.basic")}</Tab>
          <Tab>{t("app.tabs.signaturePicture")}</Tab>
          <Tab>{t("app.tabs.socialMedia")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab locations={locations}/>
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
              <SocialMediaTab/>
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopupContainer>
  );
};

CompaniesEditorPopup.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)).isRequired,
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default CompaniesEditorPopup;
