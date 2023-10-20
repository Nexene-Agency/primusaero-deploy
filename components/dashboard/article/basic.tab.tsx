import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const BasicTab = (params: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="w-full gap-4">
      <form onSubmit={doNothing}>
          <FormControl className="w-full">
            <FormLabel className="__article-form-title">
              {t("app.article.firstName")}
              <sup>*</sup>
            </FormLabel>
            <Input
              id="firstName"
              className="__nice-input"
              placeholder={t("app.article.firstName-ph")!}
              {...register("firstName")}
              bg="white"
              autoFocus={true}
              borderColor={errors.firstName ? "red !important" : "inherit"}
            />
          </FormControl>

        <FormControl className="w-full">
          <FormLabel className="__article-form-title">{t("app.article.lastName")}</FormLabel>
          <Input
              id="lastName"
              className="__nice-input"
              placeholder={t("app.article.lastName-ph")!}
              {...register("lastName")}
              bg="white"
              borderColor={errors.lastName ? "red !important" : "inherit"}
          />
        </FormControl>

          <FormControl className="w-full">
            <FormLabel className="__article-form-title">{t("app.article.web")}</FormLabel>
            <Input
                id="web"
                className="__nice-input"
                placeholder={t("app.article.web-ph")!}
                {...register("web")}
                bg="white"
                borderColor={errors.web ? "red !important" : "inherit"}
            />
          </FormControl>

          <FormControl className="w-full">
            <FormLabel className="__article-form-title">
              {t("app.article.social")}
              <sup>*</sup>
            </FormLabel>
            <Input
              id="social"
              className="__nice-input"
              placeholder={t("app.article.social-ph")!}
              {...register("social")}
              bg="white"
              autoFocus={true}
              borderColor={errors.social ? "red !important" : "inherit"}
            />
          </FormControl>

        <FormControl className="w-full">
          <FormLabel className="__article-form-title">
            {t("app.article.email")}
            <sup>*</sup>
          </FormLabel>
          <Input
            id="email"
            className="__nice-input"
            placeholder={t("app.article.email-ph")!}
            {...register("email")}
            bg="white"
            borderColor={errors.email ? "red !important" : "inherit"}
          />
        </FormControl>
      </form>
    </div>
  );
};

export default BasicTab;
