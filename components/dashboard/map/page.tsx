"use client";
import React, {useState} from "react";
import DashboardLayout from "@components/dashboard/layout";
import ContextProviders from "@framework/context/context.providers";
import {Text, VStack} from "@chakra-ui/react";
import {CITY_OF_GRAZ, MapMarker} from "@framework/googlemaps/model";
import WorldMap from "@components/webparts/world.map";

// const width = 1400;
// const height = 700;
// const scale = 200;

const RealDashboardMapPage = (props: any) => {
  const [center, setCenter] = useState<MapMarker>(CITY_OF_GRAZ);
  // const [markers, setMarkers] = useState<MapMarker[]>([]);
  // const [locations, setLocations] = useState<ListContent<Location>>({
  //   data: [],
  //   pageSize: 1000,
  // });
  // const locale = getCurrentLocale();
  // const t = getClientTranslator();

  // const projection = geoRobinson()
  //   .translate([width / 2, height / 2])
  //   .scale(scale);
  //
  // useEffect(() => {
  //   loadMarkers();
  // }, []);
  //
  // const loadMarkers = () => {
  //   const query = queryBuilder().limit(1000).sortBy("name", "asc").build();
  //   axios
  //     .post(dbUrl(LOCATIONS_COLLECTION), query)
  //     .then((response) => {
  //       setLocations(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("cannot load locations for map", error);
  //     });
  // };
  //
  // useEffect(() => {
  //   if (locations.data.length < 1) {
  //     return;
  //   }
  //   const markers = locations.data
  //     .map((location) => asMapMarker(location.id!, location.data.address, true))
  //     .map((marker) => {
  //       // const {x, y} = project(marker.lat, marker.lng, width, width / height);
  //       const x = marker.lat + 1.5;
  //       const y = marker.lng - 1.5;
  //       return {...marker, lat: x, lng: y};
  //     });
  //
  //   setMarkers(markers);
  // }, [locations]);
  //
  // const convertCoordinates = (latitude, longitude) => {
  //   const x = latitude;
  //   const y = longitude;
  //   return {x, y};
  // };

  return (
    <DashboardLayout>
      <ContextProviders>
        <VStack align="left" width="100%">
          <Text fontSize="xl" fontWeight="bold">
            Map development
          </Text>
          <div className="bg-red-200">
            <WorldMap widthPercent={70} xCorrection={1.5} yCorrection={1.5}/>
          </div>
        </VStack>
      </ContextProviders>
    </DashboardLayout>
  );
};

export default RealDashboardMapPage;
