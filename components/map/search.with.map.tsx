"use client";
import React, { useEffect, useState } from "react";
import MenuBlock from "@components/map/menu.block";
import SearchBlock from "@components/map/search.block";
import SearchResultBlock from "@components/map/search.result.block";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import {
  Location,
  LOCATIONS_COLLECTION,
} from "@components/dashboard/locations/model";
import GoogleMapsContainer from "@/framework/googlemaps/google.maps.container";
import GoogleMapsDisplay from "@framework/googlemaps/google.maps.display";
import {
  asMapMarker,
  CITY_OF_GRAZ,
  MapMarker,
} from "@framework/googlemaps/model";
import PropTypes from "prop-types";
import { MapSearchFilters } from "@components/map/interfaces";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const SearchWithMap = (props: any) => {
  const params = useSearchParams();
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
    console.log("query was", params.get("l"));
    setIsClient(true);
    const locationId = params.get("l");
    if (locationId) {
      axios
        .get(dbUrl(LOCATIONS_COLLECTION, locationId))
        .then((response) => {
          const location = response.data as DatabaseEntry<Location>;
          locationSelected(
            asMapMarker(location.id!, location.data.address, true)
          );
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
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

  return (
    <div>
      <GoogleMapsContainer locale={props.locale}>
        <GoogleMapsDisplay center={center} markers={markers} />
      </GoogleMapsContainer>
      {/*<img*/}
      {/*  src="https://firebasestorage.googleapis.com/v0/b/vanlifezone-dev.appspot.com/o/images%2Fe535521d-fcc2-44f8-aff0-9fe5c33bb4ab?alt=media&token=3b4f6018-99e0-4d2f-a07a-11f98f0f6afc"*/}
      {/*  height="1080px"*/}
      {/*  width="1920px"*/}
      {/*/>*/}
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

SearchWithMap.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default SearchWithMap;
