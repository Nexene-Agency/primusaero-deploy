import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const VehicleTab = (params: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="w-full gap-4">
      <form onSubmit={doNothing}>
        <div className="w-full">
        <FormControl className="w-full">
          <FormLabel className="__article-form-title">
            {t("app.article.vehicleBrand")}
            <sup>*</sup>
          </FormLabel>
          <Input
            id="vehicleBrand"
            className="__nice-input"
            placeholder={t("app.article.vehicleBrand-ph")!}
            {...register("vehicleBrand")}
            bg="white"
            borderColor={errors.vehicleBrand ? "red !important" : "inherit"}
          />
        </FormControl>

        <div className=" gap-4 w-full">
          <FormControl className="w-full">
            <FormLabel className="__article-form-title">{t("app.article.vehicleName")}</FormLabel>
            <Input
              id="vehicleName"
              className="__nice-input"
              placeholder={t("app.article.vehicleName-ph")!}
              {...register("vehicleName")}
              bg="white"
              autoFocus={true}
              borderColor={errors.vehicleName ? "red !important" : "inherit"}
            />
          </FormControl>

          <FormControl className="w-full">
            <FormLabel className="__article-form-title">{t("app.article.vehicleYear")}</FormLabel>
            <Input
              id="vehicleYear"
              className="__nice-input"
              placeholder={t("app.article.vehicleYear-ph")!}
              {...register("vehicleYear")}
              bg="white"
              borderColor={errors.vehicleYear ? "red !important" : "inherit"}
            />
          </FormControl>

          <FormControl className="w-full">
            <FormLabel className="__article-form-title">{t("app.article.recommendVanlifeAcc")}</FormLabel>
            <Input
                id="recommendVanlifeAcc"
                className="__nice-input"
                placeholder={t("app.article.recommendVanlifeAcc-ph")!}
                {...register("recommendVanlifeAcc")}
                bg="white"
                borderColor={errors.recommendVanlifeAcc ? "red !important" : "inherit"}
            />
          </FormControl>
        </div>
        </div>
      </form>
    </div>
  );
};

export default VehicleTab;
