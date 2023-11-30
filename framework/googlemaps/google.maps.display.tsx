"use client";
import {useRef, useState} from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";
import PropTypes from "prop-types";
import {optionalFunctionWrapper} from "@framework/utils";
import {MapMarker, MapMarkerProperty} from "@framework/googlemaps/model";
import MapMarkerIcon from "@framework/icons/basic/MapMarkerIcon";
import {useWindowSize} from "@framework/hooks/use.window.size";

const options: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  panControl: false,
  zoomControl: false,
  disableDefaultUI: true,
};

const customIcon = (opts: any) => {
  return Object.assign(
    {
      path: "M16,4a8.9999,8.9999,0,0,0-9,9c0,6,6.7583,13.07764,8.16156,14.63135a1.13778,1.13778,0,0,0,1.67688,0C18.2417,26.07764,25,19,25,13A8.9999,8.9999,0,0,0,16,4Zm0,14a5,5,0,1,1,5-5A5.00013,5.00013,0,0,1,16,18Z",
      fillColor: "white",
      fillOpacity: 1,
      strokeColor: "black",
      strokeWeight: 5,
      scale: 1,
    },
    MapMarkerIcon,
    opts
  );
};

const GoogleMapsDisplay = (props: any) => {
  const windowSize = useWindowSize();
  const map = useRef<any>(null);
  const [markers] = useState<MapMarker[]>(props.markers ?? []);

  const zoomChanged = () => {
    if (map.current && props.zoomChanged) {
      props.zoomChanged(map.current.getZoom());
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{
        width: props.width || `${Math.min(windowSize.width, 1920)}px`,
        height: props.height || `${windowSize.height}px`,
        margin: 0,
        padding: 0,
      }}
      options={{...options, styles: props.styles ?? []}}
      onLoad={(actual) => {
        map.current = actual;
      }}
      onZoomChanged={zoomChanged}
      center={props.center}
      zoom={props.zoom ?? 11}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {props.markers.map((current: MapMarker) => {
        console.log("rendering marker", current);
        return (
          <Marker
            key={current.address}
            title={current.address}
            position={{lat: current.lat, lng: current.lng}}
            onClick={() =>
              optionalFunctionWrapper(
                "googleMapsDisplay.markerClicked",
                props.markerClicked
              )(current)
            }
            onMouseOver={() =>
              optionalFunctionWrapper(
                "googleMapsDisplay.markerMouseOver",
                props.markerMouseOver
              )(current)
            }
            onMouseOut={() =>
              optionalFunctionWrapper(
                "googleMapsDisplay.markerMouseOut",
                props.markerMouseOut
              )(current)
            }
            onLoad={(marker) => {
              current.active
                ? marker.setIcon(
                  customIcon({
                    fillColor: "white",
                    strokeColor: "#e89e3c",
                    fillOpacity: 0.5,
                  })
                )
                : marker.setIcon(
                  customIcon({
                    fillColor: "white",
                    strokeColor: "#007b86",
                    fillOpacity: 0.5,
                  })
                );
            }}
          />
        );
      })}
    </GoogleMap>
  );
};

GoogleMapsDisplay.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  zoom: PropTypes.number,
  center: PropTypes.shape(MapMarkerProperty).isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape(MapMarkerProperty)).isRequired,
  markerClicked: PropTypes.func,
  markerMouseOver: PropTypes.func,
  markerMouseOut: PropTypes.func,
  zoomChanged: PropTypes.func,
  styles: PropTypes.any,
};

export default GoogleMapsDisplay;
