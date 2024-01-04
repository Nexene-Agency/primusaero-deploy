import React, {Suspense} from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "../data/common-messages";
import {MENU_ITEMS} from "@app/components/data/menus";
import ArrowRight from "@components/icons/ArrowRight";
import LogoBlackAndWhite from "@components/icons/LogoBlackAndWhite";
import ScrollSensitiveContainer from "@components/webparts/scroll.sensitive.container";
import PrimusAeroIcon from "@components/icons/PrimusAeroIcon";
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

interface HeaderBlockProps {
  locale: string;
  inactive?: boolean;
}

const Header = (props: HeaderBlockProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderMenuItem = (item: any) => (
    <a
      href={item.target}
      key={item.id}
      className="text-white text-lg font-normal whitespace-nowrap"
    >
      {t(item.name)}{" "}
      {item.children && item.children.length > 0 ? (
        <sup>({item.children.length})</sup>
      ) : null}
    </a>
  );

  return (
    <>
      <div className="no-print hidden lg:flex w-screen px-16 bg-stone-950 text-white z-[100] top-0 fixed">
        <div className="__restricted-width flex py-8 justify-start items-center gap-12 backdrop-blur-2xl">
          <Suspense
            fallback={
              <a href="/" className="flex gap-2 items-center">
                <LogoBlackAndWhite/>
              </a>
            }
          >
            <a href="/" className="flex gap-2 items-center">
              <LogoBlackAndWhite/>
              <ScrollSensitiveContainer
                key="textLogo"
                yPosition={200}
                belowPosition="fill-stone-950"
                abovePosition="fill-white"
              >
                <PrimusAeroIcon/>
              </ScrollSensitiveContainer>
            </a>
          </Suspense>
          <div className="flex-grow"/>
          <Suspense
            fallback={MENU_ITEMS.filter((item) => item.id === "services").map(
              (item) => renderMenuItem(item)
            )}
          >
            <ServiceMenuComponent locale={props.locale}/>
          </Suspense>
          {MENU_ITEMS.filter((item) => item.id !== "services").map((item) =>
            renderMenuItem(item)
          )}
          <div className="flex-grow"/>
          <a
            href="/become-our-partner"
            className="pl-6 pr-4 h-11 pt-3.5 pb-3.5 bg-white rounded-3xl justify-start items-center gap-2.5 flex flex-row"
          >
            <div className="text-stone-950 text-lg font-normal">
              {t("menu.becomeOurPartner")}
            </div>
            <div className="fill-stone-950">
              <ArrowRight/>
            </div>
          </a>
        </div>
      </div>

      {/* FIXME */}
      <Suspense fallback={<div></div>}>
        <MobileMenuComponent locale={props.locale} inactive={props.inactive}/>
      </Suspense>
    </>
  );
};

export default Header;
