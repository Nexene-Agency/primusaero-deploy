import {SERVICE_MENU_ITEMS} from "@app/components/data/menus";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import React from "react";

interface BlockProperties {
  locale: string;
}

const BlockTwo = (props: BlockProperties) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <div className="flex flex-col items-center">
      <div className="hidden lg:block w-full mb-6 h-px opacity-40 bg-neutral-400"/>
      <div className="hidden lg:flex self-stretch justify-start items-center gap-16">
        {SERVICE_MENU_ITEMS.map((item) => (
          <a className="text-zinc-500 text-lg font-normal font-nimbus whitespace-nowrap" key={item.id}
             href={item.target}>{t(item.name)}</a>
        ))}
      </div>
      <div
        className="w-full lg:mt-[300px] lg:mb-[520px] z-[-10] pl-6 lg:pl-0 mb-12 lg:mb-0 lg:text-center text-stone-950 text-5xl lg:text-9xl font-bold font-muller uppercase">{t("menu.services")}
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:mt-72 lg:absolute">
        {SERVICE_MENU_ITEMS.map((item, index: number) => (
          <div key={item.id}
               className={`flex-col justify-center items-center overflow-x-hidden ${index > 1 ? "hidden lg:flex" : ""}`}>
            <img className="" src={item.context} alt={item.name}/>
            <a href={item.target}>{t(item.name)}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockTwo;