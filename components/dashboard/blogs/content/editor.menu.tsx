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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import MenuIcon from "@framework/icons/basic/MenuIcon";
import { Selectable } from "@framework/model";
import PlusIcon from "@framework/icons/basic/PlusIcon";
import { getClientTranslator } from "@framework/i18n.client.utils";
import SaveIcon from "@framework/icons/basic/SaveIcon";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import { asValidBlock, BlockData, BlogBlock } from "../model";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import MarkdownEditorPages from "@components/dashboard/blogs/content/markdown.editor.pages";
import SourceCodeEditorPages from "@components/dashboard/blogs/content/sourceode.editor.pages";
import ImagesEditorPages from "@components/dashboard/blogs/content/images.editor.pages";

const menuItems: Selectable[] = [
  {
    id: "add-block",
    name: "app.blog.addBlock",
    icon: <PlusIcon className="__menu-icon" />,
  } as Selectable,
  {
    id: "save-blogpost",
    name: "app.blog.savePost",
    icon: <SaveIcon className="__menu-icon" />,
  } as Selectable,
  {
    id: "exit-blogpost",
    name: "app.blog.exit",
    icon: <MenuCloseIcon className="__menu-icon" />,
  } as Selectable,
];

const EditorMenu = (props: any) => {
  const t = getClientTranslator();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBlock, setSelectedBlock] = useState<BlogBlock | undefined>(
    props.selectedBlock
  );
  const [blockType, setBlockType] = useState<string | undefined>(
    props.selectedBlock?.type
  );

  const blockData = useRef<BlockData>();
  const [canSave, setCanSave] = useState<boolean>(false);

  const [pageRenderKey, setPageRenderKey] = useState<number>(0);

  useEffect(() => {
    console.log("selected block in menu", selectedBlock);
    if (selectedBlock) {
      onOpen();
    } else {
      onClose();
    }
  }, [selectedBlock]);

  const typeChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("type changed", event.target.value);
    setBlockType(event.target.value);
    setCanSave(blockIsValid());
  };

  const renderTypeSelector = () => (
    <Select defaultValue={blockType} onChange={typeChanged} rounded="md">
      <option value="markdown">text</option>
      <option value="code">source code</option>
      <option value="images">images</option>
    </Select>
  );

  const renderMenu = () => <div className="flex">{renderTypeSelector()}</div>;

  const renderPages = () => {
    if (selectedBlock) {
      switch (blockType) {
        case "markdown":
          return (
            <MarkdownEditorPages
              key={pageRenderKey}
              block={asValidBlock(selectedBlock, blockType)}
              onChange={changed}
            />
          );
        case "code":
          return (
            <SourceCodeEditorPages
              key={pageRenderKey}
              block={asValidBlock(selectedBlock, blockType)}
              onChange={changed}
            />
          );
        case "images":
          return (
            <ImagesEditorPages
              key={pageRenderKey}
              block={asValidBlock(selectedBlock, blockType)}
              onChange={changed}
            />
          );
        default:
          return <div>this blocktype is not yet implemented</div>;
      }
    } else {
      return <div>no block selected</div>;
    }
  };

  const changed = (block: BlockData) => {
    console.log("changed", block);
    blockData.current = block;
    setCanSave(blockIsValid());
  };

  const renderData = () => (
    <div className="flex flex-col">
      {renderMenu()}
      <div key={pageRenderKey}>{renderPages()}</div>
    </div>
  );

  const save = () => {
    if (blockIsValid()) {
      props.onBlockSave(blockData.current!.fields);
      setSelectedBlock(undefined);
    }
  };

  const blockIsValid = (): boolean => {
    return (
      !!blockData.current &&
      blockData.current!.isValid &&
      (blockData.current!.isDirty || blockType !== selectedBlock?.type)
    );
  };

  return (
    <div className={`w-full blog-editor-menu`} id="editor-menu">
      <div className="flex p-2 bg-gray-100">
        <Menu>
          <MenuButton as={Button}>
            <MenuIcon className="__menu-icon" />
          </MenuButton>
          <MenuList>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                onClick={() => props.onAction(item.id)}
              >
                {t(item.name)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerContent>
          <DrawerHeader>
            {t("app.blog.blockEditor", { title: selectedBlock?.title })}
          </DrawerHeader>

          <DrawerBody className="__blog-editor-drawer">
            {selectedBlock ? renderData() : <div>no block selected</div>}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              {t("app.actions.cancel")}
            </Button>
            <Button colorScheme="blue" onClick={save} isDisabled={!canSave}>
              {t("app.actions.save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

EditorMenu.propTypes = {
  onAction: PropTypes.func.isRequired,
  selectedBlock: PropTypes.object,
  onBlockSave: PropTypes.func.isRequired,
};
export default EditorMenu;
