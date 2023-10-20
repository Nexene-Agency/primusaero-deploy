"use client";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  AppCommandType,
  asError,
  asSuccess,
  closePopupCommand,
  Command,
  itemEditedCommand,
  listReloadCommand,
  showToast,
} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import { DatabaseEntry } from "@framework/firebase.utils";
import { useSession } from "next-auth/react";
import { ignorePromise, optionalFunctionWrapper } from "@framework/utils";

import { getClientTranslator } from "@framework/i18n.client.utils";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import BasicTab from "./basic.tab";
import HistoryTab from "./history.tab";
import {
  Comment,
  COMMENT_SCHEMA,
  newComment,
} from "@components/comments/model";
import {
  createYesNoDialog,
  DialogData,
  DialogResponse,
  DialogResult,
} from "@framework/interaction/dialog";
import DialogComponent from "@framework/interaction/dialog.component";
import { hexHash } from "next/dist/shared/lib/hash";
import axios from "axios";

const CommentEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const toast = useToast();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<Comment>>({
    data: newComment("", "", "", "", "", ""),
  } as DatabaseEntry<Comment>);
  const [saving, setSaving] = useState<boolean>(false);
  const [command, setCommand] = useState<Command>(props.command);
  const [question, setQuestion] = useState<DialogData | undefined>();

  const baseForm = useForm({
    defaultValues: {
      ...model.data,
    },
    resolver: joiResolver(COMMENT_SCHEMA),
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
      setModel(command.payload as DatabaseEntry<Comment>);
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

  const closePopup = (saved?: DatabaseEntry<Comment>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "CommentEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const closeAndReload = () => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "CommentEditorPopup.onAction",
      props.onAction
    )(listReloadCommand());
  };

  const askDelete = () => {
    setQuestion(
      createYesNoDialog(
        t("app.comment.delete"),
        t("app.comment.deleteQuestion"),
        { id: model.id, op: "delete" }
      )
    );
  };

  const askApprove = () => {
    setQuestion(
      createYesNoDialog(
        t("app.comment.approve"),
        t("app.comment.approveQuestion"),
        { id: model.id, op: "approve" }
      )
    );
  };

  const askBlock = () => {
    setQuestion(
      createYesNoDialog(
        t("app.comment.block"),
        t("app.comment.blockQuestion"),
        { id: model.id, op: "block" }
      )
    );
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
        colorScheme="red"
        onClick={askDelete}
        isDisabled={saving || model.data.approved}
      >
        {/* @ts-ignore */}
        {t("app.comment.delete")}
      </Button>
      <Button
        variant="outline"
        colorScheme="red"
        onClick={askBlock}
        isDisabled={saving || !model.data.approved}
      >
        {/* @ts-ignore */}
        {t("app.comment.block")}
      </Button>
      <Button
        variant="outline"
        colorScheme="green"
        onClick={askApprove}
        isDisabled={saving || model.data.approved}
      >
        {/* @ts-ignore */}
        {t("app.comment.approve")}
      </Button>
    </>
  );

  const dialogProcess = (result: DialogResponse) => {
    if (result.result !== DialogResult.YES) {
      return;
    }

    const { id, op } = result.data as { id: string; op: string };
    if (op === "delete") {
      axios
        .delete(
          `/api/comments/${id}?p=${model.data.parent}&pId=${model.data.parentId}`
        )
        .then((response) => {
          showToast(toast, asSuccess("app.comment.deleted", ""));
        })
        .catch((error) => {
          console.log(error);
          showToast(
            toast,
            asError("errors.item.delete", t(`errors.backend.${error.code}`))
          );
        })
        .finally(() => {
          setTimeout(() => {
            closeAndReload();
          }, 1500);
        });
    } else {
      axios
        .put(`/api/comments/${id}`, {
          parent: model.data.parent,
          parentId: model.data.parentId,
          revoke: op === "block",
        })
        .then((response) => {
          showToast(
            toast,
            asSuccess(
              op === "approve"
                ? "app.comment.wasApproved"
                : "app.comment.blocked",
              ""
            )
          );
        })
        .catch((error) => {
          console.log(error);
          showToast(
            toast,
            asError(
              op === "approve"
                ? "app.comment.cannotApprove"
                : "app.comment.cannotBlock",
              t(`errors.backend.${error.code}`)
            )
          );
        })
        .finally(() => {
          setTimeout(() => {
            closeAndReload();
          }, 1500);
        });
    }
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
          <Tab>{t("app.comment.content")}</Tab>
          <Tab>{t("app.tabs.history")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <BasicTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <HistoryTab />
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <DialogComponent
        key={hexHash(question?.id || "aa")}
        data={question}
        onAction={dialogProcess}
      />
    </PopupContainer>
  );
};

CommentEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default CommentEditorPopup;
