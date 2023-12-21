import { flatten, getMessages, translator } from "@framework/i18n.utils";
import MESSAGES from "@app/components/data/common-messages";
import React, { Suspense } from "react";
import WorldMap from "@components/webparts/world.map";
import "./styles.css";

interface BlockProperties {
  locale: string;
  withoutMap?: boolean;
}

const Map = (props: BlockProperties) => {
  const t = translator(flatten(getMessages(props.locale, MESSAGES)));

  return (
    <>
      {props.withoutMap ? null : (
        <div className="flex flex-col __restricted-width items-center">
          <div className="w-full ml-6 lg:ml-0 mb-8 lg:mb-0 lg:text-center text-stone-950 mt-36 lg:mt-0 text-5xl lg:text-8xl font-bold font-muller uppercase leading-10">
            {t("home.locations.ourLocations")}
          </div>
          {/*<img className="mb-36 lg:mb-72 px-2 lg:px-0" src="/assets/map-placeholder.svg" alt="map-placeholder"/>*/}
          <Suspense
            fallback={
              <img
                className="mb-36 lg:mb-72 px-2 lg:px-0"
                src="/assets/map-placeholder.svg"
                alt="map-placeholder"
              />
            }
          >
            <div>
              <WorldMap
                widthPercent={100}
                xCorrection={1.5}
                yCorrection={1.5}
              />
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Map;
