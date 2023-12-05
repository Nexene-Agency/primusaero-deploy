import {useFormContext, useFormState} from "react-hook-form";
import React, {useState} from "react";
import {FormControl, FormLabel, Input, Switch, Text,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing, SelectableProperty} from "@framework/utils";
import ChipsComponent from "@framework/components/chips.component";
import {Selectable} from "@framework/model";
import PropTypes from "prop-types";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});
  const [companies] = useState<Selectable[]>(props.companies);


  const getCompanies = () => {
    return getValues("companies").map(
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
      <div className="flex gap-4">
        <FormControl>
          <FormLabel>{t("app.fields.firstName")}</FormLabel>
          <Input
            id="firstName"
            placeholder={t("app.fields.firstName")!}
            bg="white"
            {...register("firstName")}
            autoFocus={true}
            borderColor={errors.firstName ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.lastName")}</FormLabel>
          <Input
            id="lastName"
            placeholder={t("app.fields.lastName")!}
            {...register("lastName")}
            bg="white"
            borderColor={errors.lastName ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.title")}</FormLabel>
          <Input
            id="title"
            placeholder={t("app.fields.title")!}
            {...register("title")}
            bg="white"
            borderColor={errors.title ? "red" : "inherit"}
          />
        </FormControl>
      </div>

      <div className="flex gap-4">
        <FormControl>
          <FormLabel>{t("app.fields.publicName")}</FormLabel>
          <Input
            id="publicName"
            placeholder={t("app.fields.publicName")!}
            {...register("publicName")}
            bg="white"
            borderColor={errors.publicName ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.jobTitle")}</FormLabel>
          <Input
            id="jobTitle"
            placeholder={t("app.fields.jobTitle")!}
            {...register("jobTitle")}
            bg="white"
            borderColor={errors.jobTitle ? "red" : "inherit"}
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
          <FormLabel>{t("app.fields.linkedIn")}</FormLabel>
          <Input
            id="linkedIn"
            placeholder={t("app.fields.linkedIn")!}
            {...register("linkedIn")}
            bg="white"
            borderColor={errors.linkedIn ? "red" : "inherit"}
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
      </div>


      <FormControl>
        <FormLabel>{t("app.company.plural")}</FormLabel>
        <ChipsComponent
          values={getCompanies()}
          reload={searchCompany}
          onChange={companiesChanged}
          enableNew={false}
        ></ChipsComponent>
      </FormControl>

      <div className="flex gap-4">
        <FormControl>
          <div className="__hstack __gap-16px">
            <Switch id="valid" {...register("valid")} />
            <Text>{t("app.fields.valid")}</Text>
          </div>
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.listingOrder")}</FormLabel>
          <Input
            id="listingOrder"
            placeholder={t("app.fields.listingOrder")!}
            {...register("listingOrder")}
            bg="white"
            borderColor={errors.listingOrder ? "red" : "inherit"}
          />
        </FormControl>
      </div>
    </form>
  );
};

BasicTab.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)),
};

export default BasicTab;
