"use client";

import PropTypes from "prop-types";
import {getClientTranslator} from "@framework/i18n.client.utils";
import React, {useState} from "react";
import {MENU_ITEMS} from "@app/components/data/menus";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import LOCAL_MESSAGES from "@app/components/data/common-messages";

const MENU_ITEM = MENU_ITEMS.filter((item) => item.id === "services")[0];

const MainServiceMenu = (props: any) => {
  const tl = translator(flatten(getMessages(props.locale, LOCAL_MESSAGES))); // local translator
  const t = getClientTranslator();
  const [opened, setOpened] = useState<boolean>(false);

  const switchMenu = () => {
    setOpened(!opened);
  };

  return (
    <>
      <div onClick={switchMenu}
           className="text-white text-lg font-normal whitespace-nowrap cursor-pointer">{tl(MENU_ITEM.name)}<sup>({MENU_ITEM.children?.length})</sup>
      </div>
      <div
        className={`${opened ? "" : " hidden"} max-w-[96em] h-30 w-full bg-stone-950 text-white backdrop-blur-2xl z-[100] top-[108px] left-0 py-4 fixed`}>
        <div className="flex flex-col gap-8 items-center">
          <div className="flex gap-16 justify-between">
            {MENU_ITEM.children?.slice(0, 3).map((item: any) => (
              <a href={item.target} key={item.id}
                 className="text-white text-lg font-normal whitespace-nowrap">{tl(item.name)}</a>
            ))}
          </div>
          <div className="flex gap-16 justify-between">
            {MENU_ITEM.children?.slice(3, 9).map((item: any) => (
              <a href={item.target} key={item.id}
                 className="text-white text-lg font-normal whitespace-nowrap">{tl(item.name)}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

MainServiceMenu.propTypes = {
  locale: PropTypes.string.isRequired,
};
export default MainServiceMenu;