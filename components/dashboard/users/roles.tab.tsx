import { useForm, useFormState } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Switch, Text } from "@chakra-ui/react";
import { getClientTranslator } from "@framework/i18n.client.utils";
import { doNothing, ignorePromise } from "@framework/utils";
import PropTypes from "prop-types";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Roles, ROLES, ROLES_SCHEMA } from "@components/dashboard/users/model";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { FormState } from "@/framework/model";
import FixedSet from "@framework/components/fixed.set";

const RolesTab = (props: any) => {
  const t = getClientTranslator();
  const [model, setModel] = useState<DatabaseEntry<Roles>>(props.original);

  const baseForm = useForm({
    defaultValues: {
      ...model.data,
    },
    resolver: joiResolver(ROLES_SCHEMA),
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
    } as FormState<Roles>);
  }, [changed]);

  const rolesChanged = (values: string[]) => {
    setValue("roles", values, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  return (
    <form onSubmit={doNothing}>
      <FormControl>
        <Switch id="valid" {...register("valid")} />
        <Text>{t("app.role.valid")}</Text>
      </FormControl>

      <FormControl>
        <FormLabel>{t("app.user.role.singular")}</FormLabel>
        <FixedSet
          choices={ROLES}
          values={getValues("roles") as string[]}
          textKey={"app.user.role.types"}
          onChange={rolesChanged}
        />
      </FormControl>
    </form>
  );
};

RolesTab.propTypes = {
  onChanged: PropTypes.func.isRequired,
  original: PropTypes.object.isRequired,
};

export default RolesTab;
