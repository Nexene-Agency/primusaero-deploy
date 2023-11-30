"use client";
import React from "react";
import Link from "next/link";
import {Selectable} from "@framework/model";
import DashboardIcon from "@framework/icons/basic/DashboardIcon";
import BookLogIcon from "@framework/icons/basic/BookLogIcon";
import PictureIcon from "@framework/icons/basic/PictureIcon";
import UsersIcon from "@framework/icons/basic/UsersIcon";
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";

import {getClientTranslator} from "@framework/i18n.client.utils";
import MapIcon from "@framework/icons/basic/MapIcon";
import NewspaperIcon from "@framework/icons/basic/NewspaperIcon";
import SettingsIcon from "@framework/icons/basic/SettingsIcon";
import CommentsIcon from "@framework/icons/basic/CommentsIcon";
import StarIcon from "@framework/icons/basic/StarIcon";
import BuildingIcon from "@framework/icons/basic/BuildingIcon";

const links: Selectable[] = [
  {
    id: "dashboard",
    target: "/dashboard",
    name: "app.dashboard.singular",
    icon: <DashboardIcon/>,
  },
  {
    id: "companies",
    target: "/dashboard/companies",
    name: "app.company.plural",
    icon: <BuildingIcon/>
  },
  {
    id: "locations",
    target: "/dashboard/locations",
    name: "app.location.plural",
    icon: <MapIcon/>
  },
  {
    id: "testimonials",
    target: "/dashboard/testimonials",
    name: "app.testimonial.plural",
    icon: <StarIcon/>,
  },
  {
    id: "articles",
    target: "/dashboard/articles",
    name: "app.article.plural",
    icon: <NewspaperIcon className="__menu-icon"/>,
  },
  {
    id: "blogs",
    target: "/dashboard/blog",
    name: "app.blog.plural",
    icon: <BookLogIcon className="__menu-icon"/>,
  },
  {
    id: "comments",
    target: "/dashboard/comments",
    name: "app.comment.plural",
    icon: <CommentsIcon className="__menu-icon"/>,
  },
  {
    id: "pictures",
    target: "/dashboard/pictures",
    name: "app.picture.plural",
    icon: <PictureIcon className="__menu-icon"/>,
  },
  {
    id: "settings",
    target: "/dashboard/settings",
    name: "app.setting.plural",
    icon: <SettingsIcon className="__menu-icon"/>,
  },
  {
    id: "users",
    target: "/dashboard/users",
    name: "app.user.plural",
    icon: <UsersIcon className="__menu-icon"/>,
  },
  {
    id: "map",
    target: "/dashboard/map",
    name: "app.map.singular",
    icon: <MapIcon/>,
  },
];

const DashboardMenu = (props: any) => {
  const t = getClientTranslator();
  const {data} = useSession();
  const pathName = usePathname();

  return data?.user ? (
    <div className="flex flex-col w-1/3 md:w-1/6 items-start mt-4 ml-4 h-full">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.target!}
          className={`__menu-link ${
            pathName.endsWith(link.target!) ? "__active" : ""
          }`}
        >
          <div className="flex flex-row items-center">
            {link.icon ? link.icon : null}
            <div className="ml-2 pt-1">{t(link.name)}</div>
          </div>
        </Link>
      ))}
      <div>{pathName}</div>
    </div>
  ) : null;
};

export default DashboardMenu;
