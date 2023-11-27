import {useFormContext, useFormState} from "react-hook-form";
import React from "react";
import {FormControl, FormLabel, Input,} from "@chakra-ui/react";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {doNothing} from "@framework/utils";

const SocialMediaTab = (props: any) => {
  const t = getClientTranslator();
  const {register, control, watch, getValues, setValue} = useFormContext();
  const {errors, isDirty, isValid} = useFormState({control});

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
          borderColor={errors.socials?.facebook ? "red" : "inherit"}
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
          borderColor={errors.socials?.linkedin ? "red" : "inherit"}
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
          borderColor={errors.socials?.instagram ? "red" : "inherit"}
        />
      </FormControl>

    </form>
  );
};

export default SocialMediaTab;
