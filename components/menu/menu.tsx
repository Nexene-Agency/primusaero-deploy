"use client";
import {
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { theme } from "@components/chakra/theme";
import "./../../app/styles/utilities.css";
import "./menu.css";
import MenuCloseIcon from "@framework/icons/basic/MenuCloseIcon";
import { getClientTranslator } from "@framework/i18n.client.utils";
import MainMenu from "@app/components/webparts/main.menu";

interface MenuProps {
  locale: string;
}

const MenuBlock = (props: MenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const t = getClientTranslator();

  return (
    <ChakraProvider theme={theme}>
      <div style={{ cursor: "pointer" }} onClick={onOpen}>
        <img src="/images/menu.svg" alt="menu" className="__flex" />
      </div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          style={{ backgroundColor: theme.colors.brand.base.white }}
        >
          <DrawerHeader
            style={{
              marginLeft: "62px",
              marginTop: "22px",
              padding: 0,
              marginBottom: "90px",
            }}
          >
            <HStack style={{ gap: "6px", cursor: "pointer" }} onClick={onClose}>
              <MenuCloseIcon className="__menu-icon" fill="red" />
              <Text fontSize="16px">{t("app.actions.close")}</Text>
            </HStack>
          </DrawerHeader>

          <DrawerBody style={{ marginLeft: "62px", padding: 0 }}>
            <MainMenu locale={props.locale} classes="" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};

export default MenuBlock;
