import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import CircleEmptyInfoIcon from "@framework/icons/basic/CircleEmptyInfoIcon";

const ArticleTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="w-full">
      <form onSubmit={doNothing}>
        <div className="w-full">
          <FormControl className="w-full">
            <FormLabel className="__article-form-title">
              {t("app.article.title")}
              <sup>*</sup>
            </FormLabel>
            <Input
              id="title"
              className="__nice-input"
              placeholder={t("app.article.max60")!}
              {...register("title")}
              bg="white"
              autoFocus={true}
              borderColor={errors.title ? "red !important" : "inherit"}
            />
          </FormControl>

          <FormControl className="w-full">
            <FormLabel className="__article-form-title">{t("app.article.subTitle")}</FormLabel>
            <Input
              id="subTitle"
              className="__nice-input"
              placeholder={t("app.article.max60")!}
              {...register("subTitle")}
              bg="white"
              borderColor={errors.subTitle ? "red !important" : "inherit"}
            />
          </FormControl>
        </div>

        <FormControl className="w-full">
          <FormLabel className="__article-form-title">
            {t("app.article.location")}
            <sup>*</sup>
          </FormLabel>
          <Input
            id="location"
            className="__nice-input"
            placeholder={t("app.article.location-ph")!}
            {...register("location")}
            bg="white"
            borderColor={errors.location ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <FormLabel className="__article-form-title">
            {t("app.article.article")}
            <sup>*</sup>
          </FormLabel>
          <Textarea
            id="article"
            className="__nice-input __text-box"
            placeholder={t("app.article.article-ph")!}
            {...register("article")}
            bg="white"
            borderColor={errors.article ? "red !important" : "inherit"}
          />
        </FormControl>

        <FormControl className="w-full">
          <div className="flex justify-between">
            <FormLabel className="__article-form-title">
              {t("app.article.images")}
              <sup>*</sup>
            </FormLabel>
            {props.showMore ? (
              <a
                className="__text-link __secondary cursor-pointer flex gap-2 items-center"
                onClick={props.showMore}
              >
                <CircleEmptyInfoIcon className="__menu-icon" />
                {t("app.article.moreInfo")}
              </a>
            ) : null}
          </div>
          <Input
            id="images"
            className="__nice-input"
            placeholder={t("app.article.images-ph")!}
            {...register("images")}
            bg="white"
            borderColor={errors.images ? "red !important" : "inherit"}
          />
        </FormControl>
      </form>
    </div>
  );
};

ArticleTab.propTypes = {
  showMore: PropTypes.func,
};

export default ArticleTab;
