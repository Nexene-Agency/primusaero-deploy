import MESSAGES from "@app/components/home-page/text.modules.messages";
import { flatten, getMessages, translator } from "@framework/i18n.utils";
import PrimaryButton from "@app/components/webparts/primary.button";
import ArrowRight from "@components/icons/ArrowRight";
import React, { Suspense } from "react";
import NexeneH2 from "@components/heading/NexeneH2";
import NexeneText from "@components/text/NexeneText";

interface TextBlockProps {
  locale: string;
}

const WhatWeDoText = (props: TextBlockProps) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <Suspense
      fallback={
        <div className="flex lg:hidden flex-col py-36 w-full">
          <div className="text-stone-950 text-lg font-normal pb-6">
            {t("whatWeDo.1")}
          </div>
          <div className="text-stone-950 text-lg font-normal pb-6">
            {t("whatWeDo.2")}
          </div>
          <div className="text-neutral-500 text-xl font-normal pb-12">
            {t("whatWeDo.3")}
          </div>
          <div className="font-normal flex ml-6 mt-12">
            <PrimaryButton asLink={true} target="/contact-us">
              <span>{t("getInTouch")}</span>
              <ArrowRight className="fill-white" />
            </PrimaryButton>
            <div className="grow" />
          </div>
        </div>
      }
    >
      <div className="flex lg:hidden flex-col py-36 w-full">
        <NexeneH2 text={t("whatWeDo.1")} />
        <NexeneH2 text={t("whatWeDo.2")} />
        <NexeneText text={t("whatWeDo.3")} />
        <div className="font-normal flex ml-6 mt-12">
          <PrimaryButton asLink={true} target="/contact-us">
            <span>{t("getInTouch")}</span>
            <ArrowRight className="fill-white" />
          </PrimaryButton>
          <div className="grow" />
        </div>
      </div>
    </Suspense>
  );
};

export default WhatWeDoText;
