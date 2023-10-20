import { useFormContext, useFormState } from "react-hook-form";
import React from "react";
import { FormControl, FormLabel, Input, Switch, Text } from "@chakra-ui/react";
import { getClientTranslator } from "@framework/i18n.client.utils";
import { doNothing } from "@framework/utils";

const BasicTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <form onSubmit={doNothing}>
      <div className="flex gap-4">
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

      <div className="flex gap-4 mt-4">
        <FormControl>
          <FormLabel>{t("app.fields.imageURL")}</FormLabel>
          <Input
            id="imageURL"
            placeholder={t("app.fields.imageURL")!}
            {...register("imageURL")}
            bg="white"
            borderColor={errors.imageUrl ? "red" : "inherit"}
          />
        </FormControl>

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
      </div>

      <div className="flex gap-4 mt-4">
        <FormControl>
          <FormLabel>{t("app.fields.web")}</FormLabel>
          <Input
            id="web"
            placeholder={t("app.fields.web")!}
            {...register("web")}
            bg="white"
            borderColor={errors.web ? "red" : "inherit"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t("app.fields.social")}</FormLabel>
          <Input
            id="social"
            placeholder={t("app.fields.social")!}
            {...register("social")}
            bg="white"
            borderColor={errors.social ? "red" : "inherit"}
          />
        </FormControl>
      </div>

      <div className="flex gap-4 mt-4 items-center">
        <FormControl>
          <div className="flex gap-4">
            <Switch id="valid" {...register("valid")} />
            <Text>{t("app.fields.valid")}</Text>
          </div>
        </FormControl>
        <FormControl>
          <div className="flex gap-4">
            <Switch id="visible" {...register("visible")} />
            <Text>{t("app.fields.visible")}</Text>
          </div>
        </FormControl>
        <FormControl>
          <FormLabel>{t("app.fields.order")}</FormLabel>
          <Input
            id="order"
            type="number"
            placeholder={t("app.fields.order")!}
            {...register("order")}
            bg="white"
            borderColor={errors.order ? "red" : "inherit"}
            min={0}
            max={1000}
          />
        </FormControl>
      </div>
    </form>
  );
};

export default BasicTab;
