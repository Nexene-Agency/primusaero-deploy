import {ContentFileBlock, ContentFileVersion, flatten, FlattenedBlock} from "@components/dashboard/contents/model";
import {Box, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import React, {MouseEvent, useEffect, useState} from "react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import ChevronDownIcon from "@framework/icons/basic/ChevronDownIcon";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import {useEventContext} from "@framework/context/providers";
import {AppEvent, AppEventType, asEvent} from "@framework/events";

const BlockSelectorMenu = (props: any) => {
  const t = getClientTranslator();
  const [blocks, setBlocks] = useState<ContentFileBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<ContentFileBlock | undefined>();
  const {eventBus, sendEvent} = useEventContext();

  useEffect(() => {
    const subscription = eventBus.subscribe(handleEvent);
    setTimeout(() => sendEvent(asEvent(AppEventType.REQUEST_CONTENT_FILE_CHANGED, selectedBlock)), 500);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleEvent = (event: AppEvent) => {
    if (event.type === AppEventType.CONTENT_FILE_CHANGED) {
      setBlocks((event.payload as ContentFileVersion).blocks);
    }
    if (event.type === AppEventType.BLOCK_SELECTED) {
      setSelectedBlock(event.payload as ContentFileBlock);
    }
  };

  // useEffect(() => {
  //   console.log("blocks changed in selector menu", blocks);
  // }, [blocks]);

  const renderMenuItems = (blocks: FlattenedBlock[]) => (<>
      {blocks.map((block) => (
        <MenuItem
          key={block.block.id}
          onClick={() => sendEvent(asEvent(AppEventType.BLOCK_SELECTED, block.block))}>
          {"\u00a0".repeat(block.level * 2)}{block.block.name}
        </MenuItem>
      ))}
    </>
  );

  const clear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("clearing");
    sendEvent(asEvent(AppEventType.BLOCK_SELECTION_CLEARED));
  };

  return (
    <Menu>
      <MenuButton as={Box}>
        <div className="flex flex-row border p-2 items-center border-gray-300 rounded w-full justify-between">
          <div>{selectedBlock ? selectedBlock.name : t("app.content.block.selectOne")}</div>
          <ChevronDownIcon className="h-6"/>
        </div>
      </MenuButton>
      <MenuList zIndex={10000}>
        <MenuItem onClick={clear}>
          <div className="flex gap-4 p-2">
            <MenuCloseIcon className="h-6"/>
            <div>{t("app.content.block.clearSelection")}</div>
          </div>
        </MenuItem>
        {blocks ? renderMenuItems(flatten(blocks)) : null}
      </MenuList>
    </Menu>
  );
};

export default BlockSelectorMenu;