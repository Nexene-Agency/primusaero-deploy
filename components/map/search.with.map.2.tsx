"use client";
import React, { useEffect, useState } from "react";
import MenuBlock from "@components/map/menu.block";
import SearchBlock from "@components/map/search.block";
import SearchResultBlock from "@components/map/search.result.block";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Location } from "@components/dashboard/locations/model";
import {
  asLatLong,
  CITY_OF_GRAZ,
  MapMarker,
} from "@framework/googlemaps/model";
import PropTypes from "prop-types";
import { MapSearchFilters } from "@components/map/interfaces";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const SearchWithMap2 = (props: any) => {
  const [locations, setLocations] = useState<DatabaseEntry<Location>[]>([]);
  const [center, setCenter] = useState<MapMarker>(CITY_OF_GRAZ);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [filters, setFilters] = useState<MapSearchFilters>({
    garages: false,
    magazinStores: false,
    rentals: false,
    shops: false,
    campgrounds: false,
  });
  const [isClient, setIsClient] = useState(false);
  const [locale] = useState<string>(props.locale);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log("locations changed", locations);
  }, [locations]);

  const locationSelected = (location?: MapMarker) => {
    if (location !== center) {
      if (location) {
        setCenter(location);
        setMarkers([location]);
      } else {
        setCenter(CITY_OF_GRAZ);
        setMarkers([]);
      }
    }
  };

  // @ts-ignore
  const ChangeView = ({ center }) => {
    const map = useMap();

    map.setView(center);
    return null;
  };

  return (
    <div>
      <MapContainer
        id="mapContainer"
        center={asLatLong(center)}
        zoom={13}
        scrollWheelZoom={false}
      >
        <ChangeView center={asLatLong(center)} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={asLatLong(marker)}>
            <Popup>{marker.address}</Popup>
          </Marker>
        ))}
        {/*<Marker position={[CITY_OF_GRAZ.lat, CITY_OF_GRAZ.lng]}>*/}
        {/*  <Popup>*/}
        {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
        {/*  </Popup>*/}
        {/*</Marker>*/}
      </MapContainer>
      <MenuBlock onFilterChanged={setFilters} />
      <SearchResultBlock
        locale={locale}
        locations={locations}
        onSelected={locationSelected}
      />
      <SearchBlock onResult={setLocations} filters={filters} />
    </div>
  );
};

SearchWithMap2.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default SearchWithMap2;
