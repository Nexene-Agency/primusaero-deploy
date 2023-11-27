import {useFormContext, useFormState} from "react-hook-form";
import React, {useState} from "react";
import {FormControl, FormLabel, Input, Switch, Text, Textarea,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing, SelectableProperty} from "@framework/utils";
import PropTypes from "prop-types";
import {Selectable} from "@framework/model";
import ChipsComponent from "@framework/components/chips.component";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});
  const [companies] = useState<Selectable[]>(props.companies);

  const getCompanies = () => {
    return (getValues("companies") || []).map(
      (value: string) => ({id: value, name: value} as Selectable)
    );
  };

  const companiesChanged = (tags: Selectable[]) => {
    setValue(
      "companies",
      tags.map((value: Selectable) => value.id),
      {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const searchCompany = (search: string): Selectable[] => {
    return companies.filter((value: Selectable) =>
      `${value.name} ${value.id}`.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <form onSubmit={doNothing}>
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
        <FormLabel>{t("app.fields.description")}</FormLabel>
        <Textarea
          id="description"
          placeholder={t("app.fields.description")!}
          {...register("description")}
          bg="white"
          borderColor={errors.description ? "red" : "inherit"}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("app.location.headline")}</FormLabel>
        <Input
          id="headline"
          placeholder={t("app.location.headline")!}
          {...register("headline")}
          bg="white"
          borderColor={errors.headline ? "red" : "inherit"}
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

      <FormControl>
        <FormLabel>{t("app.company.plural")}</FormLabel>
        <ChipsComponent
          values={getCompanies()}
          reload={searchCompany}
          onChange={companiesChanged}
          enableNew={false}
        ></ChipsComponent>
      </FormControl>

      <FormControl>
        <div className="__hstack __gap-16px">
          <Switch id="valid" {...register("valid")} />
          <Text>{t("app.fields.valid")}</Text>
        </div>
      </FormControl>
    </form>
  );
};

BasicTab.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)).isRequired,
};

export default BasicTab;
