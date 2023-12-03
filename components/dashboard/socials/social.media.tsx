import {useFormContext, useFormState} from "react-hook-form";
import React from "react";
import {FormControl, FormLabel, Input,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing} from "@framework/utils";

// FIXME
const SocialMediaTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});

  const getError = (name: string) => {
    const root = errors["socials"] as any;
    if (root) {
      return root[name];
    }
    return undefined;
  };

  return (
    <form onSubmit={doNothing}>
      <FormControl>
        <FormLabel>{t("app.fields.facebook")}</FormLabel>
        <Input
          id="facebook"
          placeholder={t("app.fields.facebook")!}
          bg="white"
          {...register("socials.facebook")}
          autoFocus={true}
          borderColor={getError("facebook") ? "red" : "inherit"}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("app.fields.linkedin")}</FormLabel>
        <Input
          id="linkedin"
          placeholder={t("app.fields.linkedin")!}
          bg="white"
          {...register("socials.linkedin")}
          autoFocus={true}
          borderColor={getError("linkedin") ? "red" : "inherit"}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t("app.fields.instagram")}</FormLabel>
        <Input
          id="instagram"
          placeholder={t("app.fields.instagram")!}
          bg="white"
          {...register("socials.instagram")}
          autoFocus={true}
          borderColor={getError("instagram") ? "red" : "inherit"}
        />
      </FormControl>

    </form>
  );
};

export default SocialMediaTab;
