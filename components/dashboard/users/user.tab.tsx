import { useForm, useFormState } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Switch, Text } from "@chakra-ui/react";
import { getClientTranslator } from "@framework/i18n.client.utils";
import { doNothing, ignorePromise } from "@framework/utils";
import PropTypes from "prop-types";
import { DatabaseEntry } from "@framework/firebase.utils";
import { User, USER_SCHEMA } from "@components/dashboard/users/model";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormState } from "@/framework/model";

const UserTab = (props: any) => {
  const t = getClientTranslator();
  const [model, setModel] = useState<DatabaseEntry<User>>(props.original);

  const baseForm = useForm({
    defaultValues: {
      ...model.data,
    },
    resolver: joiResolver(USER_SCHEMA),
    mode: "onChange",
  });

  const { control, watch, reset, register, getValues, setValue, trigger } =
    baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });
  const changed = watch();

  useEffect(() => {
    reset(model.data);
    ignorePromise(trigger());
  }, [model]);

  useEffect(() => {
    props.onChanged({
      isValid,
      isDirty,
      errors,
      data: getValues(),
    } as FormState<User>);
  }, [changed]);

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
        <FormLabel>{t("app.fields.image")}</FormLabel>
        <Input
          id="image"
          placeholder={t("app.fields.image")!}
          {...register("image")}
          bg="white"
          borderColor={errors.image ? "red" : "inherit"}
        />
      </FormControl>

      <FormControl>
        <Switch id="emailVerified" {...register("emailVerified")} />
        <Text>{t("app.user.emailVerified")}</Text>
      </FormControl>
    </form>
  );
};

UserTab.propTypes = {
  onChanged: PropTypes.func.isRequired,
  original: PropTypes.object.isRequired,
};

export default UserTab;
