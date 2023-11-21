"use client";
import "./locations.css";
import {useEffect, useState} from "react";
import MapPointWhite from "@components/icons/MapPointWhite";
import {Flex} from "@chakra-ui/react";
import {debounceTime, Subject} from "rxjs";
import {getClientTranslator} from "@framework/i18n.client.utils";

const Locations = (props: any) => {
  const t = getClientTranslator();
  const [locationPosX, setLocationPosX] = useState<number>(100);
  const [locationPosY, setLocationPosY] = useState<number>(100);
  const [locationVisible, setLocationVisible] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>(""); // FIXME: from dictionary
  const [mouseMoved, setMouseMoved] = useState<MouseEvent | undefined>();
  const [insideMap, setInsideMap] = useState<boolean>(false);

  const [tooltipPosX, setTooltipPosX] = useState<number>(100);
  const [tooltipPosY, setTooltipPosY] = useState<number>(100);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const moveEvents = new Subject<MouseEvent>();

  const locationClicked = (item: Element) => {
    setLocationPosX(item.getBoundingClientRect().x + item.getBoundingClientRect().width / 2);
    setLocationPosY(item.getBoundingClientRect().y + item.getBoundingClientRect().height / 2);
    setLocationName(item.id);
    setLocationVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      const map: HTMLObjectElement = document.querySelector("#map");
      const circles = map.contentDocument.querySelectorAll("circle");
      circles.forEach((item) => {
        item.onclick = () => {
          locationClicked(item);
        };
      });
      const paths = map.contentDocument.querySelectorAll("path");
      paths.forEach((item) => {
        item.onmousemove = (ev: MouseEvent) => {
          moveEvents.next(ev);
        };
      });
      const theMap: SVGElement = map.contentDocument.querySelector("#the-map");
      theMap.onclick = () => {
        hideTooltip();
      };
      const theMapBackground: SVGElement = map.contentDocument.querySelector("#map-background");
      theMapBackground.onclick = () => {
        hideTooltip();
      };
      theMapBackground.onmousemove = (ev: MouseEvent) => {
        moveEvents.next(ev);
      };
    }, 2000);

    moveEvents.pipe(debounceTime(800)).subscribe((next) => setMouseMoved(next as MouseEvent));
  }, []);

  useEffect(() => {
    if (!mouseMoved) {
      return;
    }
    if (insideMap) {
      // console.log("inside map");
      setTooltipPosX(mouseMoved.clientX);
      setTooltipPosY(mouseMoved.clientY);
      setTooltipVisible(true);
    } else {
      // console.log("not inside map");
      setTooltipVisible(false);
      return;
    }
  }, [mouseMoved]);

  const hideTooltip = () => {
    setLocationVisible(false);
    // console.log("hideLocation");
  };

  const enteringMap = () => {
    setInsideMap(true);
    // console.log("entering map");
  };

  const leavingMap = () => {
    setInsideMap(false);
    setTooltipVisible(false);
    // console.log("leaving map");
  };

  // FIXME: japan and australia should open left side
  return (
    <div id="mapContainer" className="__interactive-map" onMouseEnter={enteringMap}
         onMouseLeave={leavingMap}>
      <object id="map" type="image/svg+xml" data="/assets/interactive-map.svg"
              onClick={hideTooltip}></object>
      <Flex visibility={locationVisible ? "visible" : "hidden"} className="__location-tip"
            style={{top: locationPosY - 21, left: locationPosX - 21}}>
        <MapPointWhite/>
        <div className="__primusaero">PRIMUS AERO</div>
        <div className="__location">{locationName}</div>
      </Flex>
      <Flex visibility={tooltipVisible && !locationVisible ? "visible" : "hidden"} className="__tooltip-tip"
            style={{top: tooltipPosY, left: tooltipPosX}}>
        <MapPointWhite/>
        {t("app.locationMap.click")}
      </Flex>
    </div>
  );
};

export default Locations;