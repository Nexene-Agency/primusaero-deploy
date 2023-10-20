import { useFormContext, useFormState } from "react-hook-form";
import { LocationTypes } from "@components/dashboard/locations/model";
import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { getClientTranslator } from "@framework/i18n.client.utils";
import { doNothing } from "@framework/utils";
import FixedSet from "@framework/components/fixed.set";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  const locationTypeChanged = (values: string[]) => {
    setValue("type", values, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  return (
    <form onSubmit={doNothing}>
      <FormControl>
        <FormLabel>{t("app.fields.name")}</FormLabel>
        <Input
          id="name"
          placeholder={t("app.fields.name")!}
          {...register("name")}
          bg="white"
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
        <FormLabel>{t("app.fields.imageTag")}</FormLabel>
        <Input
          id="imageTag"
          placeholder={t("app.fields.imageTag")!}
          {...register("imageTag")}
          bg="white"
          borderColor={errors.imageTag ? "red" : "inherit"}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("app.location.types.singular.text")}</FormLabel>
        <FixedSet
          choices={LocationTypes}
          values={getValues("type") as string[]}
          textKey={"app.location.types.singular"}
          onChange={locationTypeChanged}
        />
      </FormControl>

      <div className="__hstack">
        <FormControl>
          <div className="__hstack __gap-16px">
            <Switch id="valid" {...register("valid")} />
            <Text>{t("app.fields.valid")}</Text>
          </div>
        </FormControl>
        <FormControl>
          <FormLabel>{t("app.fields.expires")}</FormLabel>
          <Input
            id="expires"
            placeholder={t("app.fields.expires")!}
            {...register("expires")}
            bg="white"
            borderColor={errors.expires ? "red" : "inherit"}
          />
        </FormControl>
      </div>
    </form>
  );
};

export default BasicTab;
