import React, {Suspense} from "react";
import {flatten, getMessages, translator} from "@framework/i18n.utils";
import MESSAGES from "./messages";
import "./page.css";
import ArrowRight from "@components/icons/ArrowRight";
import PrimaryButton from "@app/components/webparts/primary.button";
import {getImageByName} from "@app/server-actions/images";
import BigArrowLeft from "@components/icons/BigArrowLeft";
import {CompanyResponse, getCompanyData} from "@app/server-actions/company";
import NexeneH2 from "@components/heading/NexeneH2";
import NexeneText from "@components/text/NexeneText";
import MarqueeText from "react-marquee-text";
import {Personnel} from "@components/dashboard/personnel/model";
import {DatabaseEntry} from "@framework/firebase.utils";

interface HomeProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const AboutUs = async ({params, searchParams}: HomeProps) => {
  const tl = translator(flatten(getMessages(params.locale, MESSAGES)));
  const images = await getImageByName("about-us-team-photo");
  const companyReference: CompanyResponse =
    await getCompanyData("primusaero-graz");

  const renderSlogansMarquee = () => (
    <div className="justify-start pt-6 gap-6 lg:gap-12 inline-flex mx-6">
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {tl("slogans.1")}
      </span>
      <BigArrowLeft className="h-[34px] lg:h-[76px]"/>
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {tl("slogans.2")}
      </span>
      <BigArrowLeft className="h-[34px] lg:h-[76px]"/>
      <span className="text-stone-950 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
        {tl("slogans.3")}
      </span>
      <BigArrowLeft className="h-[34px] lg:h-[76px]"/>
    </div>
  );

  const renderSection = (i: number) => (
    <div
      key={`rs-${i}`}
      className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex"
    >
      <NexeneH2 text={tl(`sections.section${i}.title`)}/>

      <div className="w-full lg:w-[62%]">
        {tl(`sections.section${i}.block.title`) &&
        tl(`sections.section${i}.block.title`) !== "" ? (
          <NexeneH2 text={tl(`sections.section${i}.block.title`)}/>
        ) : null}
        <NexeneText text={tl(`sections.section${i}.block.text`)}/>

        {tl(`sections.section${i}.block.topic`) &&
        tl(`sections.section${i}.block.topic`) !== "" ? (
          <div className="mt-12 lg:mt-16 flex">
            <PrimaryButton
              asLink={true}
              target={`/contact-us?topic=${tl(
                `sections.section${i}.block.topic`
              )}`}
            >
              {tl("getInTouch")}
              <ArrowRight className="fill-white"/>
            </PrimaryButton>
            <div className="flex-grow">&nbsp;</div>
          </div>
        ) : null}
      </div>
    </div>
  );

  const renderPerson = (personnel: DatabaseEntry<Personnel>) => (
    <div key={personnel.id} className="flex flex-col items-start">
      <img src={personnel.data.signaturePicture} alt={personnel.data.publicName} className="w-full aspect-square"/>
      <div
        className="text-stone-950 text-xl font-normal leading-relaxed pt-8">{personnel.data.publicName}</div>
      <div
        className="text-neutral-500 h-8 pb-8 text-lg font-normal leading-relaxed">{personnel.data.jobTitle}</div>
      {
        personnel.data.linkedIn ?
          <a href={personnel.data.linkedIn} target="_blank" rel="noreferrer noopener"
             className="text-stone-950 h-8 pb-8 text-lg font-normal leading-relaxed">{tl("linkedIn")}</a> :
          <div
            className="text-stone-950 h-8 pb-8 text-lg font-normal leading-relaxed">{tl("linkedIn")}</div>
      }
    </div>
  );

  return (
    <>
      <div
        className="flex flex-col __restricted-width px-6 lg:px-16 pt-6 lg:pt-20 text-stone-950 mt-[137px] lg:mt-[108px]">
        <div className="text-5xl lg:text-8xl font-bold font-muller uppercase leading-10 mb-16 lg:mb-36">
          {tl("title")}
        </div>
      </div>
      <div className="__restricted-width">
        <img src={images[0].data.imageURL} alt="team photo"/>
      </div>
      <div
        className="__restricted-width w-full px-6 lg:px-16 py-36 lg:py-72 bg-white border-stone-950 flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="self-stretch text-stone-950 text-xl lg:text-4xl font-normal lg:leading-10">
          {tl("subTitle")}
        </div>
      </div>

      <div className="__restricted-width pb-16 lg:pb-72">
        <div className="hidden lg:flex flex-col mx-6 lg:mx-16 items-center gap-16">
          {renderSection(0)}
        </div>
      </div>

      <Suspense fallback={renderSlogansMarquee()}>
        <div className="w-full overflow-x-hide border-t border-stone-950 pb-16 lg:pb-72">
          <MarqueeText duration={10} direction="right">
            {renderSlogansMarquee()}
            {renderSlogansMarquee()}
          </MarqueeText>
        </div>
      </Suspense>

      <div className="__restricted-width pb-20">
        <div className="flex flex-col mx-6 lg:mx-16 items-center gap-16">
          {renderSection(1)}
        </div>
      </div>

      <div className="__restricted-width pb-36 lg:pb-72">
        <div className="flex flex-col mx-6 lg:mx-16 items-center gap-16">
          {renderSection(2)}
        </div>
      </div>

      <div className="__restricted-width grid grid-cols-1 lg:grid-cols-4 gap-4 px-6 lg:px-16 pb-36 lg:pb-72">
        {companyReference.personnel?.map((personnel) => renderPerson(personnel))}
      </div>

      <div className="__restricted-width">
        <div
          className="w-full text-stone-950 mx-6 lg:mx-16 text-5xl lg:text-8xl font-bold font-nuller uppercase leading-10 pb-16 lg:pb-36">
          {tl("careers")}
        </div>
      </div>

      <div className="__restricted-width pb-20">
        <div className="flex flex-col mx-6 lg:mx-16 items-center gap-16">
          {renderSection(3)}
        </div>
      </div>

      <div className="__restricted-width pb-24">
        <div className="flex flex-col mx-6 lg:mx-16 items-center">
          {renderSection(4)}

          <div
            className="w-full lg:justify-between items-start flex-col lg:flex-row gap-6 lg:gap-0 inline-flex">
            <div
              className="w-full lg:w-[24%] text-lg lg:text-xl font-normal leading-relaxed">&nbsp;</div>
            <div className="w-full lg:w-[62%]">
              <div className="mt-12 lg:mt-16 flex">
                <PrimaryButton asLink={true} target={"https://join.com/companies/primus"} newWindow={true}>
                  {tl("joinUs")}<ArrowRight className="fill-white"/>
                </PrimaryButton>
                <div className="flex-grow">&nbsp;</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/*<div className="__restricted-width pb-36 lg:pb-72 flex flex-row justify-end px-6 lg:px-16">*/}
      {/*  <div className="w-[874px] h-[1066px] bg-neutral-200 flex justify-center items-center">*/}
      {/*    <div className="text-fuchsia-600 text-3xl font-normal  leading-relaxed">Job offers</div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};
export default AboutUs;
