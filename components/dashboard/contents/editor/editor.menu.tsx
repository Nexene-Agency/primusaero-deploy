"use client";
import PropTypes from "prop-types";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import MenuIcon from "@framework/icons/basic/MenuIcon";
import {Selectable} from "@framework/model";
import PlusIcon from "@framework/icons/basic/PlusIcon";
import {getClientTranslator} from "@framework/i18n.client.utils";
import SaveIcon from "@framework/icons/basic/SaveIcon";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import React, {useEffect, useState} from "react";
import {BLOCK_ACTIONS, ContentFileBlock} from "@components/dashboard/contents/model";
import SquareEditIcon from "@framework/icons/basic/SquareEditIcon";
import BlockSelectorMenu from "@components/dashboard/contents/editor/block.selector.menu";
import ContainerPropertiesEditor from "@components/dashboard/contents/editor/container.properties.editor";
import {useEventContext} from "@framework/context/providers";
import {AppEvent, AppEventType} from "@framework/events";
import HtmlBlockPropertiesEditor from "@components/dashboard/contents/editor/html.block.properties.editor";
import MarkdownPropertiesEditor from "@components/dashboard/contents/editor/markdown.properties.editor";

const menuItems: Selectable[] = [
  {
    id: BLOCK_ACTIONS.ADD,
    name: "app.content.block.add",
    icon: <PlusIcon/>,
  } as Selectable,
  {
    id: BLOCK_ACTIONS.SAVE_FILE,
    name: "app.content.save",
    icon: <SaveIcon/>,
  } as Selectable,
  {
    id: BLOCK_ACTIONS.LEAVE_EDITOR,
    name: "app.content.exitEditor",
    icon: <MenuCloseIcon/>,
  } as Selectable,
];

const EditorMenu = (props: any) => {
  const t = getClientTranslator();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [blocks] = useState<ContentFileBlock[]>(props.blocks);
  const [selectedBlock, setSelectedBlock] = useState<ContentFileBlock | undefined>();
  const {eventBus, sendEvent} = useEventContext();

  useEffect(() => {
    const subscription = eventBus.subscribe(handleEvent);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleEvent = (event: AppEvent) => {
    if (event.type === AppEventType.BLOCK_SELECTED) {
      setSelectedBlock(event.payload as ContentFileBlock);
    }
  };

  const renderProperties = () => {
    const buildingBlock = props.buildingBlocks.find((b: any) => b.data.code === selectedBlock!.code);
    switch (buildingBlock?.data.renderAs) {
      case "md":
        return <MarkdownPropertiesEditor key={selectedBlock!.id} block={selectedBlock!}/>;
      case "html":
        return <HtmlBlockPropertiesEditor key={selectedBlock!.id} block={selectedBlock!}/>;
      default:
        return <ContainerPropertiesEditor key={selectedBlock!.id} block={selectedBlock!}/>;
    }
  };

  const switchOpen = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div className={`absolute w-full z-[10000] top-0 left-0 `} id="editor-menu">
      <div className="flex p-2 justify-between">
        <Menu>
          <MenuButton as={Button}>
            <MenuIcon/>
          </MenuButton>
          <MenuList>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                onClick={() => props.onAction(item.id)}>
                {t(item.name)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <div className="text-white text-xl">{props.name}</div>
        <Button onClick={switchOpen}>
          <SquareEditIcon/>
        </Button>
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerContent>
          <DrawerHeader>
            {t("app.content.block.editor", {title: selectedBlock?.name ?? "n/a"})}
          </DrawerHeader>

          <DrawerBody className="__blog-editor-drawer">
            <BlockSelectorMenu/>
            {selectedBlock ? renderProperties() : <div>{t("app.container.block.notSelected")}</div>}
          </DrawerBody>

          <DrawerFooter>
            {/*<Button variant="outline" mr={3} onClick={onClose}>*/}
            {/*  {t("app.actions.cancel")}*/}
            {/*</Button>*/}
            {/*<Button colorScheme="blue" onClick={save} isDisabled={!canSave}>*/}
            {/*  {t("app.actions.save")}*/}
            {/*</Button>*/}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

EditorMenu.propTypes = {
  onAction: PropTypes.func.isRequired,
  buildingBlocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
};
export default EditorMenu;
