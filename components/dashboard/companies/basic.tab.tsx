import {useFormContext, useFormState} from "react-hook-form";
import React, {ChangeEvent, useState} from "react";
import {FormControl, FormLabel, Input, Select, Switch, Text, Textarea,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing, SelectableProperty} from "@framework/utils";
import ChipsComponent from "@framework/components/chips.component";
import {Selectable} from "@framework/model";
import PropTypes from "prop-types";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});
  const [locations] = useState<Selectable[]>(props.locations);

  //   locations: Joi.array().items(Joi.string()).optional().max(10),
  //   postalAddress: Joi.string().optional().allow("").max(256),
  //   email: Joi.string().required().email({tlds: {allow: false}}).max(128),
  //   phone: Joi.string().required().max(128),
  //   socials: Joi.object().required(),
  //   valid: Joi.boolean().required(),
  //   tags: Joi.array().items(Joi.string()).required().min(1).max(10),

  const getLocations = () => {
    return getValues("locations").map(
      (value: string) => ({id: value, name: value} as Selectable)
    );
  };

  const locationsChanged = (tags: Selectable[]) => {
    setValue(
      "locations",
      tags.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const searchLocation = (search: string): Selectable[] => {
    return locations.filter((value: Selectable) =>
      `${value.name} ${value.id}`.toLowerCase().includes(search.toLowerCase())
    );
  };

  const typeChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("type changed", event.target.value);
    setValue("partner", event.target.value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={doNothing}>
      <div className="flex gap-4">
        <FormControl>
          <FormLabel>{t("app.fields.name")}</FormLabel>
          <Input
            id="name"
            placeholder={t("app.fields.name")!}
            bg="white"
            {...register("name")}
            autoFocus={true}
            borderColor={errors.name ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.code")}</FormLabel>
          <Input
            id="code"
            placeholder={t("app.fields.code")!}
            {...register("code")}
            bg="white"
            borderColor={errors.code ? "red" : "inherit"}
          />
        </FormControl>
      </div>

      <FormControl>
        <FormLabel>{t("app.fields.description")}</FormLabel>
        <Textarea
          id="description"
          placeholder={t("app.fields.description")!}
          {...register("description")}
          bg="white"
          borderColor={errors.description ? "red" : "inherit"}
        />
      </FormControl>


      <div className="flex gap-4">
        <FormControl>
          <FormLabel>{t("app.fields.vatNumber")}</FormLabel>
          <Input
            id="vatNumber"
            placeholder={t("app.fields.vatNumber")!}
            {...register("vatNumber")}
            bg="white"
            borderColor={errors.vatNumber ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.eoriNumber")}</FormLabel>
          <Input
            id="eoriNumber"
            placeholder={t("app.fields.eoriNumber")!}
            {...register("eoriNumber")}
            bg="white"
            borderColor={errors.eoriNumber ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.registrationNumber")}</FormLabel>
          <Input
            id="registrationNumber"
            placeholder={t("app.fields.registrationNumber")!}
            {...register("registrationNumber")}
            bg="white"
            borderColor={errors.registrationNumber ? "red" : "inherit"}
          />
        </FormControl>
      </div>

      <div className="flex gap-4">
        <FormControl>
          <FormLabel>{t("app.fields.email")}</FormLabel>
          <Input
            id="email"
            placeholder={t("app.fields.email")!}
            {...register("email")}
            bg="white"
            borderColor={errors.email ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.phone")}</FormLabel>
          <Input
            id="phone"
            placeholder={t("app.fields.phone")!}
            {...register("phone")}
            bg="white"
            borderColor={errors.phone ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.postalAddress")}</FormLabel>
          <Input
            id="postalAddress"
            placeholder={t("app.fields.postalAddress")!}
            {...register("postalAddress")}
            bg="white"
            borderColor={errors.postalAddress ? "red" : "inherit"}
          />
        </FormControl>
      </div>

      <FormControl>
        <FormLabel>{t("app.location.plural")}</FormLabel>
        <ChipsComponent
          values={getLocations()}
          reload={searchLocation}
          onChange={locationsChanged}
          enableNew={false}
        ></ChipsComponent>
      </FormControl>

      <div className="flex gap-4 items-center">
        <FormControl>
          <div className="flex gap-4 items-center">
            <Switch id="valid" {...register("valid")} />
            <Text>{t("app.fields.valid")}</Text>
          </div>
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.type")}</FormLabel>
          <Select defaultValue={getValues("partner")} onChange={typeChanged} rounded="md">
            {["full", "affiliate", "main"].map((item) => (
              <option value={item} key={item}>{t(`app.company.types.${item}`)}</option>))}
          </Select>
        </FormControl>
      </div>
    </form>
  );
};

BasicTab.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)),
};

export default BasicTab;
