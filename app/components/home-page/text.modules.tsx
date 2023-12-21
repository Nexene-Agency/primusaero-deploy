import React from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "@app/components/home-page/text.modules.messages";
import PrimaryButton from "@app/components/webparts/primary.button";
import ArrowRight from "@components/icons/ArrowRight";

interface TextModulesProps {
  locale: string;
}

const TextModules = (props: TextModulesProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  const renderPart = (index: number) => (
    <div className="flex flex-row items-start justify-between">
      <div className="w-1/4 text-xl text-stone-950 font-normal">{t(`modules.${index}.title`)}</div>
      <div className="w-6/10 text-neutral-500 text-xl font-normal">{t(`modules.${index}.text`)}</div>
    </div>
  );

  return (
    <div className="__restricted-width w-full bg-white hidden lg:flex flex-col px-6 py-72 gap-16">
      {Array.from(Array(3).keys()).map((index) => renderPart(index))}
      <div className="flex flex-row items-start justify-between">
        <div className="w-1/4 text-xl text-stone-950 font-normal">&nbsp;</div>
        <div className="w-6/10 text-neutral-500 text-xl font-normal flex">
          <PrimaryButton asLink={true} target="/contact-us">
            <span>{t("getInTouch")}</span>
            <ArrowRight className="fill-white"/>
          </PrimaryButton>
          <div className="grow"/>
        </div>
      </div>
    </div>
  );
};

export default TextModules;
