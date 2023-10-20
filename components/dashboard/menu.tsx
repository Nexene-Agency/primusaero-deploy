"use client";
import React from "react";
import Link from "next/link";
import { HStack, VStack } from "@chakra-ui/react";
import { Selectable } from "@framework/model";
import DashboardIcon from "@framework/icons/basic/DashboardIcon";
import BookLogIcon from "@framework/icons/basic/BookLogIcon";
import PictureIcon from "@framework/icons/basic/PictureIcon";
import UsersIcon from "@framework/icons/basic/UsersIcon";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { getClientTranslator } from "@framework/i18n.client.utils";
import MapIcon from "@framework/icons/basic/MapIcon";
import UserGroupIcon from "@framework/icons/basic/UserGroupIcon";
import NewspaperIcon from "@framework/icons/basic/NewspaperIcon";
import SettingsIcon from "@framework/icons/basic/SettingsIcon";
import CommentsIcon from "@framework/icons/basic/CommentsIcon";

const links: Selectable[] = [
  {
    id: "dashboard",
    target: "/dashboard",
    name: "app.dashboard.singular",
    icon: <DashboardIcon className="__menu-icon" />,
  },
  {
    id: "teamMembers",
    target: "/dashboard/teamMembers",
    name: "app.teamMember.plural",
    icon: <UserGroupIcon className="__menu-icon" />,
  },
  {
    id: "articles",
    target: "/dashboard/articles",
    name: "app.article.plural",
    icon: <NewspaperIcon className="__menu-icon" />,
  },
  {
    id: "locations",
    target: "/dashboard/locations",
    name: "app.location.plural",
    icon: <MapIcon className="__menu-icon" />,
  },
  {
    id: "blogs",
    target: "/dashboard/blog",
    name: "app.blog.plural",
    icon: <BookLogIcon className="__menu-icon" />,
  },
  {
    id: "comments",
    target: "/dashboard/comments",
    name: "app.comment.plural",
    icon: <CommentsIcon className="__menu-icon" />,
  },
  {
    id: "pictures",
    target: "/dashboard/pictures",
    name: "app.picture.plural",
    icon: <PictureIcon className="__menu-icon" />,
  },
  {
    id: "settings",
    target: "/dashboard/settings",
    name: "app.setting.plural",
    icon: <SettingsIcon className="__menu-icon" />,
  },
  {
    id: "users",
    target: "/dashboard/users",
    name: "app.user.plural",
    icon: <UsersIcon className="__menu-icon" />,
  },
];

const DashboardMenu = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const pathName = usePathname();

  return data?.user ? (
    <VStack
      width={{ base: "30%", md: "15%" }}
      alignItems="start"
      mt={4}
      height={"100vh"}
    >
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.target!}
          className={`__menu-link ${
            pathName.endsWith(link.target!) ? "__active" : ""
          }`}
        >
          <HStack>
            <div>{link.icon ? link.icon : null}</div>
            <div>{t(link.name)}</div>
          </HStack>
        </Link>
      ))}
      <div>{pathName}</div>
    </VStack>
  ) : null;
};

export default DashboardMenu;
