import React, {Suspense} from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "../data/common-messages";
import Logo from "@components/icons/Logo";
import {MENU_ITEMS} from "@app/components/data/menus";
import ArrowRight from "@components/icons/ArrowRight";
import BurgerMenu from "@components/icons/BugerMenu";
import MenuBlock from "@components/menu/menu.block";

interface MainPageProps {
  locale: string;
}

const Header = (props: MainPageProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <>
      <div className="hidden lg:flex py-8 px-16 justify-start items-center gap-12 backdrop-blur-2xl">
        <a href="/dashboard"><Logo/></a>
        <div className="flex-grow"/>
        {MENU_ITEMS.map((item) => (
          <a href={item.target} key={item.id} className="text-stone-950 text-lg font-normal whitespace-nowrap">
            {t(item.name)} {item.children && item.children.length > 0 ? <sup>({item.children.length})</sup> : null}
          </a>
        ))}
        <div className="flex-grow"/>
        <a href="#"
           className="pl-6 pr-4 pt-3.5 pb-3.5 bg-stone-950 rounded-3xl justify-start items-center gap-2.5 flex flex-row">
          <div className="text-white text-lg font-normal">{t("menu.becomeOurPartner")}</div>
          <div className="fill-white"><ArrowRight/></div>
        </a>
      </div>

      {/* FIXME */}
      <div className="flex w-full lg:hidden items-center pt-[80px] px-6 justify-between">
        <Logo/>
        <Suspense fallback={<BurgerMenu/>}>
          <MenuBlock locale={props.locale}/>
        </Suspense>
      </div>
    </>
  );
};

export default Header;
