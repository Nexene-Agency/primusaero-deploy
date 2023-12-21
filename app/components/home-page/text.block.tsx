import MESSAGES from "@app/components/home-page/text.modules.messages";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import PrimaryButton from "@app/components/webparts/primary.button";
import ArrowRight from "@components/icons/ArrowRight";
import React from "react";

interface TextBlockProps {
  locale: string;
}

const TextBlock = (props: TextBlockProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <div className="flex lg:hidden flex-col px-6 py-36 w-full">
      <div className="text-stone-950 text-lg font-normal pb-6">
        {t("whatWeDo.1")}
      </div>
      <div className="text-stone-950 text-lg font-normal pb-6">
        {t("whatWeDo.2")}
      </div>
      <div className="text-neutral-500 text-xl font-normal pb-12">
        {t("whatWeDo.3")}
      </div>
      <div className="font-normal flex">
        <PrimaryButton asLink={true} target="/contact-us">
          <span>{t("getInTouch")}</span>
          <ArrowRight className="fill-white"/>
        </PrimaryButton>
        <div className="grow"/>
      </div>
    </div>
  );
};

export default TextBlock;
