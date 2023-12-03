"use client";
import React, {useState} from "react";
import DashboardLayout from "@components/dashboard/layout";
import ContextProviders from "@framework/context/context.providers";
import {Text, VStack} from "@chakra-ui/react";
import {CITY_OF_GRAZ, MapMarker} from "@framework/googlemaps/model";
import {Selectable} from "@framework/model";

// const width = 1400;
// const height = 700;
// const scale = 200;

const ITEMS: Selectable[] = [
  {id: "privateAircraftOperation", name: "app.contactUs.subjects.privateAircraftOperation"},
  {id: "aircraftCharter", name: "app.contactUs.subjects.aircraftCharter"},
  {id: "aircraftAcquisition", name: "app.contactUs.subjects.aircraftAcquisition"},
  {id: "maintenance", name: "app.contactUs.subjects.maintenance"},
  {id: "technicalManagement", name: "app.contactUs.subjects.technicalManagement"},
  {id: "sparePartsAndLogistics", name: "app.contactUs.subjects.sparePartsAndLogistics"},
  {id: "consultingServices", name: "app.contactUs.subjects.consultingServices"},
  {id: "other", name: "app.contactUs.subjects.other"}
];

const RealDashboardMapPage = (props: any) => {
  const [center, setCenter] = useState<MapMarker>(CITY_OF_GRAZ);

  return (
    <DashboardLayout>
      <ContextProviders>
        <VStack align="left" width="100%">
          <Text fontSize="xl" fontWeight="bold">
            Select development
          </Text>
          <div className="w-1/2 bg-red-200">
            <input type="text" className="w-full h-8 py-2 border-b border-neutral-500 focus:border-black"/>
          </div>
          <div className="w-1/2 bg-red-200">
          </div>
          <div className="w-1/2 bg-red-200">
            <input type="text" className="w-full h-8 py-2 border-b border-neutral-500 focus:border-black"/>
          </div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <div
            className="w-96 h-12 pl-3 pr-96 border-b border-neutral-400 border-opacity-40 justify-start items-center inline-flex">
            <div className="text-black text-lg font-normal font-['Nimbus Sans']">Dropdown option 1</div>
          </div>
          <div
            className="w-96 h-8 pb-3 border-b border-neutral-500 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="pr-4 justify-start items-center gap-96 inline-flex">
              <div className="text-neutral-500 text-lg font-normal font-['Nimbus Sans']">Text input</div>
            </div>
          </div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
          <div>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</div>
        </VStack>
      </ContextProviders>
    </DashboardLayout>
  );
};

export default RealDashboardMapPage;
