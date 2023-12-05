import React, {Suspense} from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "../data/common-messages";
import {MENU_ITEMS} from "@app/components/data/menus";
import ArrowRight from "@components/icons/ArrowRight";
import LogoBlackAndWhite from "@components/icons/LogoBlackAndWhite";
import ScrollSensitiveContainer from "@components/webparts/scroll.sensitive.container";
import PrimusAero from "@components/icons/PrimusAero";
import dynamic from "next/dynamic";

const MobileMenuComponent = dynamic(
  () => import("@components/menu/menu.block"),
  {
    ssr: false,
  }
);

const ServiceMenuComponent = dynamic(
  () => import("@components/menu/main.service.menu"),
  {
    ssr: false,
  }
);

interface MainPageProps {
  locale: string;
}

const Header = (props: MainPageProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderMenuItem = (item: any) => (
    <a href={item.target} key={item.id} className="text-white text-lg font-normal whitespace-nowrap">
      {t(item.name)} {item.children && item.children.length > 0 ? <sup>({item.children.length})</sup> : null}
    </a>
  );

  return (
    <>
      <div
        className="hidden lg:flex max-w-[96em] w-full bg-stone-950 text-white z-[100] top-0 py-8 px-16 justify-start items-center gap-12 backdrop-blur-2xl fixed">
        <Suspense fallback={
          <div className="flex gap-2 items-center">
            <a><LogoBlackAndWhite/></a>
          </div>
        }>
          <div className="flex gap-2 items-center">
            <a><LogoBlackAndWhite/></a>
            <ScrollSensitiveContainer key="textLogo" yPosition={200} belowPosition="fill-stone-950"
                                      abovePosition="fill-white">
              <PrimusAero/>
            </ScrollSensitiveContainer>
          </div>
        </Suspense>
        <div className="flex-grow"/>
        <Suspense fallback={MENU_ITEMS.filter((item) => item.id === "services").map((item) => renderMenuItem(item))}>
          <ServiceMenuComponent locale={props.locale}/>
        </Suspense>
        {MENU_ITEMS.filter((item) => item.id !== "services").map((item) => renderMenuItem(item))}
        <div className="flex-grow"/>
        <a href="#"
           className="pl-6 pr-4 h-11 pt-3.5 pb-3.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex flex-row">
          <div className="text-stone-950 text-lg font-normal">{t("menu.becomeOurPartner")}</div>
          <div className="fill-stone-950"><ArrowRight/></div>
        </a>
      </div>

      {/* FIXME */}
      <Suspense fallback={<div></div>}>
        <MobileMenuComponent locale={props.locale}/>
      </Suspense>
    </>
  );
};

export default Header;
