"use client";
import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import PropTypes from "prop-types";
import MapMarkerIcon from "@framework/icons/basic/MapMarkerIcon";
import { optionalFunctionWrapper } from "@framework/utils";

const fields = ["formatted_address", "address_components", "geometry"];

const GoogleMapsAutocomplete = (props: any) => {
  const autocomplete = useRef<google.maps.places.Autocomplete>();
  const [value] = useState<string>(props.value || "");
  const [streetNumber, setStreetNumber] = useState<string | undefined>();
  const onLoaded = (loaded: google.maps.places.Autocomplete) => {
    autocomplete.current = loaded;
  };

  const onPlaceChanged = () => {
    const place = autocomplete.current!.getPlace();
    if (place && Reflect.has(place, "formatted_address")) {
      setStreetNumber(
        place.address_components?.find((component) =>
          component.types.includes("street_number")
        )?.long_name
      );
      props.onSelected({
        address: place.formatted_address,
        postal_code: place.address_components?.find((component) =>
          component.types.includes("postal_code")
        )?.long_name,
        street: place.address_components?.find((component) =>
          component.types.includes("route")
        )?.long_name,
        street_number: place.address_components?.find((component) =>
          component.types.includes("street_number")
        )?.long_name,
        city: place.address_components?.find((component) =>
          component.types.includes("locality")
        )?.long_name,
        country: place.address_components?.find((component) =>
          component.types.includes("country")
        )?.long_name,
        lat: place.geometry!.location!.lat(),
        lng: place.geometry!.location!.lng(),
      });
    }
  };

  /**
   * Relays the onFocus event to the parent.
   */
  const fieldFocused = () => {
    optionalFunctionWrapper("googleMapsAutocomplete.onFocus", props.onFocus)();
  };

  return (
    // @ts-ignore
    <Autocomplete
      fields={fields}
      onLoad={onLoaded}
      onPlaceChanged={onPlaceChanged}
    >
      <InputGroup
        borderColor={
          props.requiredStreetNumber && props.focused && !streetNumber
            ? "red"
            : "inherit"
        }
      >
        <InputLeftAddon>
          <MapMarkerIcon height="24px" />
        </InputLeftAddon>
        <Input
          onFocus={fieldFocused}
          type="text"
          placeholder={props.placeholder}
          bgColor="white"
          defaultValue={value}
        />
      </InputGroup>
    </Autocomplete>
  );
};

GoogleMapsAutocomplete.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
  value: PropTypes.any,
  requiredStreetNumber: PropTypes.bool,
  focused: PropTypes.bool,
  onFocus: PropTypes.func,
};

export default GoogleMapsAutocomplete;
