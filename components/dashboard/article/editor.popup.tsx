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
import { useEventContext } from "@framework/context/providers";
import { useSession } from "next-auth/react";
import { ignorePromise, optionalFunctionWrapper } from "@framework/utils";

import { getClientTranslator } from "@framework/i18n.client.utils";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import {
  Article,
  ARTICLE_SCHEMA,
  ARTICLES_COLLECTION,
  newArticle,
} from "@components/dashboard/article/model";
import ArticleTab from "@components/dashboard/article/article.tab";
import BasicTab from "@components/dashboard/article/basic.tab";
import VehicleTab from "@components/dashboard/article/vehicle.tab";
import HistoryTab from "@components/dashboard/article/history.tab";

const ArticleEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<Article>>({
    data: newArticle(),
  } as DatabaseEntry<Article>);
  const [saving, setSaving] = useState<boolean>(false);
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [command, setCommand] = useState<Command>(props.command);

  const baseForm = useForm({
    defaultValues: {
      ...model.data,
    },
    resolver: joiResolver(ARTICLE_SCHEMA),
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
      setModel(command.payload as DatabaseEntry<Article>);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => (
    <>{t(model.id ? "app.article.singular" : "app.article.new")}</>
  );

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved?: DatabaseEntry<Article>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "TeamMemberEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    saveOrCreate<Article>(ARTICLES_COLLECTION, {
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
          <Tab>{t("app.article.singular")}</Tab>
          <Tab>{t("app.article.basic")}</Tab>
          <Tab>{t("app.article.vehicle")}</Tab>
          <Tab>{t("app.tabs.history")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <ArticleTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <VehicleTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <HistoryTab />
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopupContainer>
  );
};

ArticleEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default ArticleEditorPopup;
