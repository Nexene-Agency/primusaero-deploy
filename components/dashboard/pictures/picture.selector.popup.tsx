"use client";
import { Button, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppCommandType, closePopupCommand, Command } from "@framework/events";
import PopupContainer from "@framework/popup.container";
import { useSession } from "next-auth/react";
import { optionalFunctionWrapper } from "@framework/utils";

import { getClientTranslator } from "@framework/i18n.client.utils";
import axios from "axios";
import {
  Picture,
  PICTURES_COLLECTION,
} from "@components/dashboard/pictures/model";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import "./picture.selector.popup.css";
import CircleEmptyRemoveIcon from "@framework/icons/basic/CircleEmptyRemoveIcon";
import { ListContent } from "@framework/list/list.definition";
import { queryBuilder } from "@framework/query.builder";

const PictureSelectorPopup = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const [id] = useState<string>(props.id);
  const [command, setCommand] = useState<Command>(props.command);
  const [selectedImages, setSelectedImages] = useState<
    DatabaseEntry<Picture>[]
  >([]);
  const [searchText, setSearchText] = useState<string>(props.imageTag);
  const [hits, setHits] = useState<ListContent<Picture>>({
    data: [],
    pageSize: 32,
  });

  const doSearch = () => {
    console.log(searchText);
    const query = queryBuilder()
      .filterBy("name", ">=", searchText)
      .filterBy("name", "<=", searchText + "\uf8ff")
      .limit(32)
      .build();
    axios.post(dbUrl(PICTURES_COLLECTION), query).then((response) => {
      setHits(response.data);
    });
  };

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      console.log("opening picture selector popup");
    }
  }, [command]);

  const renderHeader = () => <>{t("app.picture.selectMultiple")}</>;

  const closePopup = (data?: DatabaseEntry<Picture>[]) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "pictureSelectorPopup.onAction",
      props.onAction
    )(data);
  };

  const cancel = () => {
    closePopup();
  };

  const select = () => {
    closePopup(selectedImages);
  };

  const unableToSave = () => {
    return selectedImages.length < 1;
  };

  const renderFooter = () => (
    <>
      <Button variant="outline" mr={3} onClick={cancel}>
        {t("app.actions.cancel")}
      </Button>
      <Button
        variant="outline"
        isDisabled={unableToSave()}
        colorScheme="green"
        onClick={select}
      >
        {t("app.picture.selectCount", { count: selectedImages.length })}
      </Button>
    </>
  );

  const searchTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const imageSelected = (item: DatabaseEntry<Picture>) => {
    const found = selectedImages.find((current) => current.id === item.id);
    if (!found) {
      setSelectedImages((current) => [...current, item]);
    }
  };

  const remove = (toRemove: DatabaseEntry<Picture>) => {
    setSelectedImages((current) =>
      current.filter((item) => item.id !== toRemove.id)
    );
  };

  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "NumpadEnter"].includes(event.code)) {
      doSearch();
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
      <div className="flex flex-col w-full gap-2">
        <div className="flex gap-2">
          <Input
            id="searchText"
            defaultValue={searchText}
            onChange={searchTextChanged}
            autoFocus={true}
            onKeyDown={keyDown}
          />
          <Button onClick={doSearch}>{t("actions.search")}</Button>
        </div>
        <Text>{t("app.picture.found")}</Text>
        <div className="flex gap-2 flex-wrap __preview-pictures">
          {hits.data.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col __preview-picture`}
              onClick={() => imageSelected(item)}
            >
              <img src={item.data.previewURL} />
              <div>{item.data.name}</div>
            </div>
          ))}
        </div>
        <Text>{t("app.picture.selected")}</Text>
        <div className="w-full __preview-list gap-2">
          {selectedImages.map((item) => (
            <div key={item.id} className="relative __selected-preview-picture">
              <div onClick={() => remove(item)}>
                <CircleEmptyRemoveIcon className="__preview-close-icon" />
              </div>
              <img src={item.data.previewURL} />
            </div>
          ))}
        </div>
      </div>
    </PopupContainer>
  );
};

PictureSelectorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default PictureSelectorPopup;
