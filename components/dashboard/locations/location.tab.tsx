import {getClientTranslator} from "@framework/i18n.client.utils";
import React, {useState} from "react";
import {useFormContext, useFormState} from "react-hook-form";
import {Flex, FormControl, FormLabel, Input, Text, VStack} from "@chakra-ui/react";
import GoogleMapsDisplay from "@framework/googlemaps/google.maps.display";
import GoogleMapsAutocomplete from "@framework/googlemaps/google.maps.autocomplete";
import {Address, ADDRESS_SCHEMA, CITY_OF_GRAZ, MapMarker,} from "@framework/googlemaps/model";

const fields = [
  "address",
  "postal_code",
  "street",
  "street_number",
  "city",
  "country",
  "lat",
  "lng",
];

const LocationTab = (props: any) => {
  const t = getClientTranslator();
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [center, setCenter] = useState<MapMarker>(CITY_OF_GRAZ);

  const {register, control, reset, watch, getValues, setValue} =
    useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});

  const renderElement = (name: string) => (
    // @ts-ignore
    <Text key={name} size="xs" pl={2}>
      {/*// @ts-ignore*/}
      <span className="bold">{t(`app.fields.${name}`)}</span>:{" "}
      {getValues(`address.${name}`)}
    </Text>
  );

  const hasError = () => {
    return ADDRESS_SCHEMA.validate(getValues("address")).error;
  };

  const selected = (loc: Address) => {
    setValue("address", loc, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    const point = {
      address: loc.address,
      lat: loc.lat,
      lng: loc.lng,
      active: false,
      name: "",
    } as MapMarker;
    setMarkers([point]);
    setCenter(point);
    const currentErrors = Reflect.get(errors, "address");
    console.log("location errors", Reflect.ownKeys(currentErrors ?? {}));
  };

  return (
    <>
      <FormControl>
        <Flex>
          <GoogleMapsDisplay
            markers={markers}
            width="60%"
            height="270px"
            center={center}
          />
          <VStack alignItems="left">
            {fields.map((current) => renderElement(current))}
            {hasError() ? (
              <Text
                key="error"
                size="xs"
                fontWeight="bold"
                color="red.500"
                pl={2}
              >
                {t("errors.address.incomplete")}
              </Text>
            ) : null}
          </VStack>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>{t("app.fields.location")}</FormLabel>
        <GoogleMapsAutocomplete
          requiredStreetNumber={true}
          placeholder={t("app.fields.address_locator")}
          onSelected={selected}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{t("app.location.addressPlus")}</FormLabel>
        <Input
          id="addressPlus"
          placeholder={t("app.location.addressPlus")!}
          {...register("addressPlus")}
          bg="white"
          borderColor={errors.addressPlus ? "red" : "inherit"}
        />
      </FormControl>
    </>
  );
};

export default LocationTab;
