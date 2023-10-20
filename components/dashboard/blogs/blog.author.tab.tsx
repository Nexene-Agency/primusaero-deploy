import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const BlogAuthorTab = (params: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  const hasError = (field: string) => {
    if (errors && errors.blogAuthor) {
      return Reflect.get(errors.blogAuthor, field);
    }
    return false;
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <FormControl className="w-full">
          <FormLabel>{t("app.fields.name")}</FormLabel>
          <Input
            id="name"
            className="__nice-input"
            placeholder={t("app.fields.name")!}
            {...register("blogAuthor.name")}
            bg="white"
            autoFocus={true}
            borderColor={hasError("name") ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>{t("app.fields.bio")}</FormLabel>
          <Input
            id="bio"
            className="__nice-input"
            placeholder={t("app.fields.bio")!}
            {...register("blogAuthor.bio")}
            bg="white"
            borderColor={hasError("bio") ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>{t("app.fields.location")}</FormLabel>
          <Input
            id="location"
            className="__nice-input"
            placeholder={t("app.fields.location")!}
            {...register("blogAuthor.location")}
            bg="white"
            borderColor={hasError("location") ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>{t("app.fields.social")}</FormLabel>
          <Input
            id="social"
            className="__nice-input"
            placeholder={t("app.fields.social")!}
            {...register("blogAuthor.social")}
            bg="white"
            borderColor={hasError("social") ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>{t("app.fields.web")}</FormLabel>
          <Input
            id="web"
            className="__nice-input"
            placeholder={t("app.fields.web")!}
            {...register("blogAuthor.web")}
            bg="white"
            borderColor={hasError("web") ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel>{t("app.fields.image")}</FormLabel>
          <Input
            id="image"
            className="__nice-input"
            placeholder={t("app.fields.image")!}
            {...register("blogAuthor.image")}
            bg="white"
            borderColor={hasError("image") ? "red !important" : "inherit"}
          />
        </FormControl>
      </form>
    </div>
  );
};

export default BlogAuthorTab;
