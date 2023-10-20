"use client";
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppCommandType, closePopupCommand, Command } from "@framework/events";
import PopupContainer from "@framework/popup.container";
import { DatabaseEntry } from "@framework/firebase.utils";
import { useEventContext } from "@framework/context/providers";
import {
  doNothing,
  ignorePromise,
  optionalFunctionWrapper,
} from "@framework/utils";

import { getClientTranslator } from "@framework/i18n.client.utils";
import { useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { Comment, COMMENT_SCHEMA } from "@components/comments/model";
import axios from "axios";

const CommentingPopup = (props: any) => {
  const t = getClientTranslator();
  const [id] = useState<string>(props.id);
  const [model, setModel] = useState<DatabaseEntry<Comment>>({
    data: {
      parent: "",
      parentId: "",
      when: "",
      user: "",
      userName: "",
      userImage: "",
      text: "",
      approved: false,
    } as any,
  } as DatabaseEntry<Comment>);
  const [needUserName, setNeedUserName] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [command, setCommand] = useState<Command>(props.command);
  const toast = useToast();

  const baseForm = useForm({
    defaultValues: {
      ...model.data,
    },
    resolver: joiResolver(COMMENT_SCHEMA),
    mode: "onChange",
  });

  const { control, reset, register, getValues, setValue, trigger } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      console.log("setting model", command.payload);
      const incoming = command.payload as DatabaseEntry<Comment>;
      setNeedUserName(!incoming.data.userName);
      setModel(incoming);
    }
  }, [command]);

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  const renderHeader = () => <>{t("app.comment.add")}</>;

  const debug = () => {
    console.log("saving", saving);
    console.log("errors", errors);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("values", getValues());
  };

  const closePopup = (saved: boolean) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper("CommentingPopup.onAction", props.onAction)(saved);
  };

  const saveModel = () => {
    setSaving(true);
    console.log("sending", getValues());
    axios
      .post("/api/comments", { ...getValues() })
      .then((response) => {
        console.log("response", response);
        closePopup(true);
        toast({
          title: t("app.comment.saved"),
          description: t("app.comment.moderation"),
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: t("app.comment.cannotSave"),
          description: t("app.comment.tryAgain"),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        onClick={() => closePopup(false)}
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
        {t("app.comment.send")}
      </Button>
    </>
  );

  const renderUserNameBlock = () => {
    if (!needUserName) {
      return (
        <FormControl className="w-full mb-4">
          <div className="flex items-center">
            <img
              src={getValues("userImage")}
              className={`__${props.prefix}-commenting-avatar`}
            />
            <div className={`__${props.prefix}-commenting-avatar-name`}>
              {getValues("userName")}
            </div>
          </div>
        </FormControl>
      );
    }
    return (
      <FormControl className="w-full">
        <div className="flex items-center">
          <Avatar src="http://localhost/broken-link" className="mr-4" />
          <Input
            id="userName"
            placeholder={t("app.comment.yourName")!}
            {...register("userName")}
            bg="white"
            autoFocus={true}
            borderColor={errors.userName ? "red !important" : "inherit"}
          />
        </div>
      </FormControl>
    );
  };

  return (
    <PopupContainer
      id={`${id}-popup`}
      key={command?.key}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      command={command}
    >
      <form onSubmit={doNothing}>
        {renderUserNameBlock()}
        <FormControl className="w-full">
          <FormLabel>{t("app.comment.message")}</FormLabel>
          <Textarea
            id="text"
            placeholder={t("app.comment.messagePlaceholder")!}
            {...register("text")}
            bg="white"
            autoFocus={!needUserName}
            borderColor={errors.text ? "red !important" : "inherit"}
          />
        </FormControl>
      </form>
    </PopupContainer>
  );
};

CommentingPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
  prefix: PropTypes.string.isRequired,
};

export default CommentingPopup;
