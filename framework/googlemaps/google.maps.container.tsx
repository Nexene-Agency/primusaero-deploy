"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import PropTypes from "prop-types";

const libraries = ["places"];

const GoogleMapsContainer = (props: any) => {
  const { isLoaded } = useJsApiLoader({
    // @ts-ignore
    libraries: libraries,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    language: props.locale,
  });

  return (
    // @ts-ignore
    isLoaded ? props.children : <div>loading...</div>
  );
};

GoogleMapsContainer.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default GoogleMapsContainer;
