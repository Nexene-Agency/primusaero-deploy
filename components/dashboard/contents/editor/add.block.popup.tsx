"use client";
import {Button} from "@chakra-ui/react";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {closePopupCommand, Command,} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import {optionalFunctionWrapper} from "@framework/utils";

import {getClientTranslator} from "@framework/i18n.client.utils";
import {ContentBlock} from "@components/dashboard/contents/model";
import {DatabaseEntry} from "@framework/firebase.utils";

const AddBlockPopup = (props: any) => {
  const t = getClientTranslator();
  const [saving, setSaving] = useState<boolean>(false);
  const [command, setCommand] = useState<Command>(props.command);
  const [buildingBlocks] = useState<DatabaseEntry<ContentBlock>[]>(props.buildingBlocks ?? []);
  const [selectedBlock, setSelectedBlock] = useState<DatabaseEntry<ContentBlock> | undefined>();

  const renderHeader = () => (
    <>{t("app.content.block.add")}</>
  );

  const closePopup = (selected?: DatabaseEntry<ContentBlock>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "AddBlockPopup.onAction",
      props.onAction
    )(selected);
  };

  const unableToSave = () => {
    return saving || !selectedBlock;
  };

  const renderFooter = () => (
    <>
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
        onClick={() => closePopup(selectedBlock)}
      >
        {/* @ts-ignore */}
        {t("app.content.block.select")}
      </Button>
    </>
  );

  return (
    <PopupContainer
      id="add-block-popup"
      key={command?.key}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      command={command}
    >
      <div className="border border-gray-300 rounded p-2 w-full h-64">
        <ul className="w-full">
          {buildingBlocks.map((block) => (
            <li key={block.id} className="w-full flex flex-row gap-4 p-1 hover:bg-gray-300 cursor-pointer"
                onClick={() => setSelectedBlock(block)} onDoubleClick={() => {
              closePopup(block);
            }}>
              <div className="w-3/10">{block.data.code}</div>
              <div className="">{block.data.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </PopupContainer>
  );
};

AddBlockPopup.propTypes = {
  buildingBlocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default AddBlockPopup;
