/* eslint-disable react/no-children-prop */
"use client";
import PropTypes from "prop-types";
import React, { createRef, KeyboardEvent, MouseEvent, useState } from "react";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import { Button } from "@chakra-ui/react";
import {
  asDialogResponse,
  DialogData,
  DialogResult,
} from "@framework/interaction/dialog";
import { getClientTranslator } from "@framework/i18n.client.utils";

const DialogComponent = (props: any) => {
  const t = getClientTranslator();
  const [data, setData] = useState<DialogData | undefined>(props.data);
  const popupRef = createRef<HTMLDivElement>();

  // useEffect(() => {
  //   if (visible > 0) {
  //     popupRef.current?.focus();
  //   }
  // }, [visible]);

  const closeDialog = (event: MouseEvent<HTMLElement>) => {
    const id = Reflect.get(event.target, "id");
    if (["backdrop", "menu-close", "close"].includes(id)) {
      event.preventDefault();
      event.stopPropagation();
      setData(undefined);
      props.onAction(asDialogResponse(DialogResult.CLOSED));
    }
  };

  const keyDown = (event: KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.code === "Escape") {
      setData(undefined);
      props.onAction(asDialogResponse(DialogResult.CLOSED));
    }
  };

  const closeAs = (result: DialogResult) => {
    setData(undefined);
    props.onAction(asDialogResponse(result, data?.data));
  };

  const cancelled = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    closeAs(DialogResult.CANCEL);
  };

  const yesAnswered = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    closeAs(DialogResult.YES);
  };

  const noAnswered = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    closeAs(DialogResult.NO);
  };

  const renderCancelButton = () => {
    return data!.cancelCaption ? (
      <Button
        variant="outline"
        colorScheme="red"
        className="w-32"
        onClick={cancelled}
      >
        {t(data!.cancelCaption)}
      </Button>
    ) : null;
  };

  const renderNoButton = () => {
    return data!.noCaption ? (
      <Button variant="outline" className="w-32" onClick={noAnswered}>
        {t(data!.noCaption)}
      </Button>
    ) : null;
  };

  const renderYesButton = () => {
    return data!.yesCaption ? (
      <Button colorScheme="primary" className="w-32" onClick={yesAnswered}>
        {t(data!.yesCaption)}
      </Button>
    ) : null;
  };

  const renderPopup = () => (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 outline-0"
      style={{ zIndex: data!.zIndex }}
      id="backdrop"
      onClick={closeDialog}
    >
      <div
        tabIndex={0}
        autoFocus={true}
        className="max-w-3xl flex flex-col mx-auto mt-40 bg-white rounded-lg outline-0"
        onKeyDown={keyDown}
        ref={popupRef}
      >
        <div className="flex flex-col p-6 gap-6">
          <div className="flex justify-between">
            <div className="font-bold uppercase">{data!.title}</div>
            <MenuCloseIcon
              id="close"
              className="__menu-icon cursor-pointer"
              onClick={closeDialog}
              tabIndex={0}
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: data!.message }}></div>
          <div className="flex justify-end gap-6">
            {renderCancelButton()}
            {renderNoButton()}
            {renderYesButton()}
          </div>
        </div>
      </div>
    </div>
  );

  return data ? renderPopup() : null;
};

DialogComponent.propTypes = {
  data: PropTypes.any,
  onAction: PropTypes.func.isRequired,
};

export default DialogComponent;
