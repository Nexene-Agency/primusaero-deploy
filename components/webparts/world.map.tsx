"use client";
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import MapPointGreen from "@components/icons/MapPointGreen";
import React, {MouseEvent, useEffect, useRef, useState} from "react";
import {asMapMarker, MapMarker} from "@framework/googlemaps/model";
import {ListContent} from "@framework/list/list.definition";
import {Location} from "@components/dashboard/locations/model";
import {queryBuilder} from "@framework/query.builder";
import axios from "axios";
import PropTypes from "prop-types";
import {geoRobinson} from "d3-geo-projection";
import {Box} from "@chakra-ui/react";
import {useWindowSize} from "@framework/hooks/use.window.size";
import MapPointWhite from "@components/icons/MapPointWhite";
import "./world.map.css";
import {debounceTime, Subject} from "rxjs";
import {getClientTranslator} from "@framework/i18n.client.utils";

interface WorldMapProps {
  width: number;
  height: number;
  scale: number;
}

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  name: string;
  markerId: string;
}

const WorldMap = (props: any) => {
  const t = getClientTranslator();
  const [widthPercent] = useState<number>(props.widthPercent);
  const size = useWindowSize();
  const [mapDimensions, setMapDimensions] = useState<WorldMapProps>({
    width: 0,
    height: 0,
    scale: 0,
  });
  // const [projection, setProjection] = useState<any>(geoRobinson().translate([100, 100]).scale(100));
  const [xCorrection] = useState<number>(props.xCorrection);
  const [yCorrection] = useState<number>(props.yCorrection);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [locations, setLocations] = useState<ListContent<Location>>({
    data: [],
    pageSize: 1000,
  });
  const [tooltipProps, setTooltipProps] = useState<TooltipProps>({visible: false, x: 0, y: 0, name: "", markerId: ""});
  const [chooseProps, setChooseProps] = useState<TooltipProps>({visible: false, x: 0, y: 0, name: "", markerId: ""});
  const [mouseMoved, setMouseMoved] = useState<MouseEvent | undefined>();
  const [insideMap, setInsideMap] = useState<boolean>(false);

  const moveEvents = new Subject<MouseEvent>();
  const subscription = moveEvents.pipe(debounceTime(props.debounceTime ?? 800)).subscribe((next) => {
    setMouseMoved(next as MouseEvent);
  });
  const mapRef = useRef();

  useEffect(() => {
    recalculateMapDimensions();
    loadMarkers();

    return () => {
      if (!subscription.closed) {
        subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    recalculateMapDimensions();
  }, [size]);

  const recalculateMapDimensions = () => {
    const width = (Math.min(window.innerWidth, props.maxScreenWidth ?? 1536) - ((props.leftMargin ?? 0) + (props.rightMargin ?? 0)))
      * (widthPercent / 100);
    const height = width / 2;
    const scale = height * 0.33;
    setMapDimensions({width, height, scale});
  };

  const loadMarkers = () => {
    const query = queryBuilder().limit(1000).sortBy("name", "asc").build();
    axios
      .get("/api/locations/for-map")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("cannot load locations for map", error);
      });
  };

  useEffect(() => {
    if (locations.data.length < 1) {
      return;
    }
    const markers = locations.data
      .map((location) => asMapMarker(location.id!, location.data.name, location.data.address, false))
      .map((marker) => {
        const x = marker.lat + xCorrection;
        const y = marker.lng - yCorrection;
        return {...marker, lat: x, lng: y};
      });

    setMarkers(markers);
  }, [locations]);

  const setMarkerActive = (event: MouseEvent<SVGPathElement>, marker: MapMarker) => {
    if (tooltipProps.visible) {
      return;
    }
    setTooltipProps({
      visible: true,
      x: window.scrollX + event.clientX,
      y: window.scrollY + event.clientY,
      name: marker.name,
      markerId: marker.id!
    });
  };

  const setMarkerInactive = (markerId: string) => {
    if (!tooltipProps.visible) {
      return;
    }
    setTooltipProps((current) => ({...current, visible: false}));
  };

  const enteringMap = () => {
    setInsideMap(true);
  };

  const leavingMap = () => {
    setInsideMap(false);
  };

  useEffect(() => {
    if (!mouseMoved) {
      return;
    }
    if (insideMap) {
      setChooseProps({
        visible: true,
        x: window.scrollX + mouseMoved.clientX,
        y: window.scrollY + mouseMoved.clientY,
        name: "",
        markerId: ""
      });
    } else {
      setChooseProps((current) => ({...current, visible: false}));
    }
  }, [mouseMoved]);

  const moveOverMap = (event: MouseEvent<SVGSVGElement>) => {
    moveEvents.next(event);
  };

  // useEffect(() => {
  //   console.log("chooseProps changed", chooseProps);
  //   console.log(mapRef.current);
  // }, [chooseProps]);
  //
  // useEffect(() => {
  //   console.log("toolTipProps changed", tooltipProps);
  //   console.log(mapRef.current);
  // }, [tooltipProps]);

  return (
    <div>
      {(locations.data.length > 0 && mapDimensions.width > 0) ?
        <Box width={mapDimensions.width} height={mapDimensions.height}>
          <ComposableMap width={mapDimensions.width} height={mapDimensions.height} onMouseEnter={enteringMap}
                         ref={mapRef} className="__map" onMouseMove={moveOverMap}
                         onMouseLeave={leavingMap}
                         projection={geoRobinson().translate([mapDimensions.width / 2, mapDimensions.height / 2]).scale(mapDimensions.scale)}>
            <Geographies geography="/assets/world.json">
              {({geographies}) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} fill="#f7f5f5" stroke="lightgrey"/>
                ))
              }
            </Geographies>
            {markers.map((marker) => (
              <Marker key={marker.id} coordinates={[marker.lng, marker.lat]} className="__marker"
                      onMouseEnter={(event) => setMarkerActive(event, marker)}>
                <MapPointGreen className="w-[12px] h-[12px]"/>
              </Marker>
            ))}
          </ComposableMap>
          {tooltipProps.visible ? <div className="__location-tip"
                                       onMouseLeave={() => setMarkerInactive(tooltipProps.markerId)}
                                       style={{top: tooltipProps.y - 26, left: tooltipProps.x - 26}}>
            <MapPointWhite/>
            <div className="__primusaero">PRIMUS AERO</div>
            <div className="__location">{tooltipProps.name}</div>
          </div> : null}
          {chooseProps.visible ? <div className="__tooltip-tip"
                                      style={{top: chooseProps.y, left: chooseProps.x}}>
            <MapPointWhite/>
            {t("app.map.click")}
          </div> : null}

        </Box> : null}
    </div>
  );

};

WorldMap.propTypes = {
  maxScreenWidth: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  debounceTime: PropTypes.number,
  widthPercent: PropTypes.number.isRequired,
  xCorrection: PropTypes.number.isRequired,
  yCorrection: PropTypes.number.isRequired,
};
export default WorldMap;