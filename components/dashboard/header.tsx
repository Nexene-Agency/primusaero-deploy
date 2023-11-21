"use client";
import React from "react";
import {Avatar, Menu, MenuButton, MenuGroup, MenuItem, MenuList,} from "@chakra-ui/react";
import {signOut, useSession} from "next-auth/react";
import WorldWestIcon from "@framework/icons/basic/WorldWestIcon";
import UserIcon from "@framework/icons/basic/UserIcon";
import LogOutIcon from "@framework/icons/basic/LogOutIcon";
import {Selectable} from "@framework/model";
import {loading, notAuthenticated} from "@components/fragments";
import {getClientTranslator} from "@framework/i18n.client.utils";
import PrimusAero from "@components/icons/PrimusAero";
import Logo from "@components/icons/Logo";

const DashboardHeader = (props: any) => {
  const {data, status} = useSession();
  const t = getClientTranslator();

  const languages: Selectable[] = [
    {id: "en", name: "languages.en"},
    {id: "de", name: "languages.de"},
  ];
  const languageChanger = () => (
    <Menu>
      <MenuButton>
        <WorldWestIcon width="38px"/>
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
      <MenuButton title={data!.user!.email!}>
        <Avatar name={data!.user!.name!} src={data!.user!.image!}/>
      </MenuButton>
      <MenuList>
        <MenuGroup title={data!.user!.name!}>
          <MenuItem>
            <UserIcon className="mr-2"/>
            Profile
          </MenuItem>
          <MenuItem onClick={doLogout}>
            <LogOutIcon className="mr-2"/>
            {t("actions.logout")}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );

  const authenticated = () => <>{displayAvatar()}</>;

  return (
    <div className="flex flex-row p-4 gap-8 w-full">
      <a href="/" className="flex flex-row gap-2 items-center">
        <Logo/>
        <PrimusAero/>
      </a>
      <div className="flex-grow"/>
      {status === "loading" && loading(t)}
      {status === "authenticated" && authenticated()}
      {status === "unauthenticated" && notAuthenticated(t)}
    </div>
  );
};

export default DashboardHeader;
