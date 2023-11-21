"use client";
import {Button, Tab, TabList, TabPanel, TabPanels, Tabs, useToast,} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AppCommandType, asError, closePopupCommand, Command, itemEditedCommand, showToast,} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import {DatabaseEntry, saveOrCreate} from "@framework/firebase.utils";
import {useSession} from "next-auth/react";
import {ignorePromise, optionalFunctionWrapper} from "@framework/utils";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {FormProvider, useForm, useFormState} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import BasicTab from "@components/dashboard/testimonials/basic.tab";
import {
  newTestimonial,
  Testimonial,
  TESTIMONIAL_SCHEMA,
  TESTIMONIALS_COLLECTION
} from "@components/dashboard/testimonials/model";

const TestimonialPopup = (props: any) => {
  const t = getClientTranslator();
  const {data} = useSession();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<Testimonial>>({
    data: newTestimonial(""),
  } as DatabaseEntry<Testimonial>);
  const [saving, setSaving] = useState<boolean>(false);
  const [command, setCommand] = useState<Command>(props.command);
  const toast = useToast();

  const baseForm = useForm({
    defaultValues: {
      ...model.data,
    },
    resolver: joiResolver(TESTIMONIAL_SCHEMA),
    mode: "onChange",
  });

  const {control, reset, getValues, setValue, trigger} = baseForm;
  const {errors, isDirty, isValid} = useFormState({control});

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      console.log("setting model", command.payload);
      setModel(command.payload as DatabaseEntry<Testimonial>);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => (
    <>{t(model.id ? "app.testimonial.singular" : "app.testimonial.new")}</>
  );

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved?: DatabaseEntry<Testimonial>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "TestimonialEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    saveOrCreate<Testimonial>(TESTIMONIALS_COLLECTION, {
      id: model.id,
      data: getValues() as Testimonial,
    })
      .then((saved) => {
        closePopup(saved);
      })
      .catch((error) => {
        console.error(error);
        showToast(
          toast,
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
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab/>
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopupContainer>
  );
};

TestimonialPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default TestimonialPopup;
