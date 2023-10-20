import Joi from "joi";
import { ValidationMap } from "react";
import PropTypes from "prop-types";
import { LatLngTuple } from "leaflet";

export interface Address {
  address: string;
  postal_code: string;
  street: string;
  street_number: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  hash?: string;
}

export const ADDRESS_SCHEMA = Joi.object({
  address: Joi.string().required(),
  postal_code: Joi.string().required(),
  street: Joi.string().required(),
  street_number: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  hash: Joi.string().optional(),
});

export const asMapMarker = (
  id: string,
  address: Address,
  active = true
): MapMarker => {
  return {
    id,
    address: address.address,
    lat: address.lat,
    lng: address.lng,
    active,
  };
};

export interface MapMarker {
  id?: string;
  address: string;
  lat: number;
  lng: number;
  active: boolean;
}

export const MapMarkerProperty: ValidationMap<any> = {
  address: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

export const CITY_OF_GRAZ: MapMarker = {
  address: "Graz, Austria",
  lat: 47.070714,
  lng: 15.439504,
  active: false,
};

export const asLatLong = (marker: MapMarker): LatLngTuple => {
  return [marker.lat, marker.lng];
};
