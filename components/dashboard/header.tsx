"use client";
import React from "react";
import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import WorldWestIcon from "@framework/icons/basic/WorldWestIcon";
import UserIcon from "@framework/icons/basic/UserIcon";
import LogOutIcon from "@framework/icons/basic/LogOutIcon";
import { Selectable } from "@framework/model";
import { loading, notAuthenticated } from "@components/fragments";
import { getClientTranslator } from "@framework/i18n.client.utils";

const DashboardHeader = (props: any) => {
  const { data, status } = useSession();
  const t = getClientTranslator();

  const languages: Selectable[] = [
    { id: "en", name: "languages.en" },
    { id: "de", name: "languages.de" },
  ];
  const languageChanger = () => (
    <Menu>
      <MenuButton>
        <WorldWestIcon width="38px" />
      </MenuButton>
      <MenuList>
        {languages.map((language) => (
          <MenuItem key={language.id} value={language.id}>
            {t(language.name)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  const doLogout = () => {
    console.log("should logout");
    signOut()
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log("error logging out", error);
      });
  };

  const displayAvatar = () => (
    <Menu>
      <MenuButton>
        <Avatar name={data!.user!.name!} src={data!.user!.image!} />
      </MenuButton>
      <MenuList>
        <MenuGroup title={data!.user!.name!}>
          <MenuItem>
            <Icon as={UserIcon} mr={2} />
            Profile
          </MenuItem>
          <MenuItem onClick={doLogout}>
            <Icon as={LogOutIcon} mr={2} />
            {t("actions.logout")}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );

  const authenticated = () => <>{displayAvatar()}</>;

  return (
    <div className="__hstack __padding-5 __gap-16px __w-full">
      <a href="/">
        <img
          src="/images/logo.svg"
          alt="VanLifezone Logo"
          className="__header-image"
        />
      </a>
      <Text fontSize="2xl" fontWeight="bold" ml={8}>
        {t("app.name")}
      </Text>
      <div className="__spacer" />
      {status === "loading" && loading(t)}
      {status === "authenticated" && authenticated()}
      {status === "unauthenticated" && notAuthenticated(t)}
    </div>
  );
};

export default DashboardHeader;
