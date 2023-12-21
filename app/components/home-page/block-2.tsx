import {SERVICE_MENU_ITEMS} from "@app/components/data/menus";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import React from "react";
import ArrowButtonRightInverted from "@components/icons/ArrowButtonRightInverted";

interface BlockProperties {
  locale: string;
}

const BlockTwo = (props: BlockProperties) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderServicesForDesktop = () => (
    <div className="hidden lg:flex flex-col items-center __restricted-width overflow-x-hidden">
      <div className="flex self-stretch border-t border-neutral-500 justify-center items-center gap-8 pt-2">
        {SERVICE_MENU_ITEMS.map((item) => (
          <a
            className="text-zinc-500 text-lg font-normal font-nimbus whitespace-nowrap"
            key={item.id}
            href={item.target}
          >
            {t(item.name)}
          </a>
        ))}
      </div>
      <div
        className="w-full mt-72 mb-96 z-[-10] px-6 text-center text-stone-950 text-9xl font-bold font-muller uppercase">
        {t("menu.services")}
      </div>

      <div className="flex flex-row items-center mt-48 absolute __restricted-width overflow-x-clip">
        {SERVICE_MENU_ITEMS.map((item, index: number) => (
          <div
            key={item.id}
            className={`w-96 h-96 flex shrink-0 flex-col justify-center items-center`}
          >
            <img className="" src={item.context} alt={item.name}/>
            <a className="font-normal flex gap-2 text-xl items-center text-stone-950" href={item.target}>
              <span>{t(item.name)}</span>
              <ArrowButtonRightInverted/>
            </a>
          </div>
        ))}
      </div>
    </div>);

  const renderServicesForMobile = () => (
    <div className="w-full flex lg:hidden flex-col px-6">
      <div className="text-5xl font-bold text-stone-950 uppercase font-muller">{t("menu.services")}</div>
      {SERVICE_MENU_ITEMS.map((item, index: number) => (
        <div
          key={item.id}
          className={`flex-col justify-center items-center overflow-x-hidden`}
        >
          <img className="" src={item.context} alt={item.name}/>
          <a className="flex text-stone-950 text-xl items-center font-normal gap-4" href={item.target}>
            <span>{t(item.name)}</span>
            <ArrowButtonRightInverted/>
          </a>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {renderServicesForDesktop()}
      {renderServicesForMobile()}
    </>
  );
};

export default BlockTwo;
