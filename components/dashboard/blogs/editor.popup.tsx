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
  BLOG_POST_SCHEMA,
  BlogPost,
  BLOGPOST_REFERENCES_COLLECTION,
  BLOGPOSTS_COLLECTION,
  newBlogPost,
} from "@components/dashboard/blogs/model";
import BasicTab from "@components/dashboard/blogs/basic.tab";
import HistoryTab from "@components/dashboard/blogs/history.tab";
import SignaturePictureEditorTab from "@components/dashboard/pictures/singature.picture.editor";
import BlogAuthorTab from "@components/dashboard/blogs/blog.author.tab";

const BlogPostEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<BlogPost>>({
    data: newBlogPost("", ""),
  } as DatabaseEntry<BlogPost>);
  const [saving, setSaving] = useState<boolean>(false);
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [command, setCommand] = useState<Command>(props.command);

  const baseForm = useForm({
    defaultValues: {
      ...model.data,
    },
    resolver: joiResolver(BLOG_POST_SCHEMA),
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
      setModel(command.payload as DatabaseEntry<BlogPost>);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => (
    <>{t(model.id ? "app.blog.singular" : "app.blog.new")}</>
  );

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved?: DatabaseEntry<BlogPost>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "BlogPostEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    let savedBlogPost: DatabaseEntry<BlogPost> = {} as any;
    saveOrCreate<BlogPost>(BLOGPOSTS_COLLECTION, {
      id: model.id,
      data: getValues(),
    })
      .then((saved) => {
        savedBlogPost = saved;
        return saveOrCreate(BLOGPOST_REFERENCES_COLLECTION, {
          id: model.id,
          data: {
            name: saved.data.name,
            title: saved.data.title,
            description: saved.data.description,
            valid: saved.data.valid,
            published: saved.data.published,
            publishedAt: saved.data.publishedAt,
            blogAuthorName: saved.data.blogAuthor.name,
          },
        });
      })
      .then(() => {
        closePopup(savedBlogPost);
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

  const signaturePictureSelected = (urls: string[]) => {
    setValue("coverPicImage", urls[0], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("coverPicPreview", urls[1], {
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
          <Tab>{t("app.blog.coverPicture")}</Tab>
          <Tab>{t("app.blog.authorTab")}</Tab>
          <Tab>{t("app.tabs.history")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <SignaturePictureEditorTab
              imageTag={"blog"}
              onSelected={signaturePictureSelected}
            />
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BlogAuthorTab />
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

BlogPostEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default BlogPostEditorPopup;
