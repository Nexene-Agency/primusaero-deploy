import { getClientTranslator } from "@framework/i18n.client.utils";
import { useSession } from "next-auth/react";
import { Button, Text, useToast } from "@chakra-ui/react";
import { loading } from "@components/fragments";
import React, { useEffect, useState } from "react";
import {
  DEFAULT_SYSTEM_SETTINGS,
  SETTINGS_ID,
  SYSTEM_SETTINGS_COLLECTION,
  SYSTEM_SETTINGS_SCHEMA,
  SystemSettings,
} from "@components/dashboard/settings/model";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import HotTopicsEditor from "@components/dashboard/settings/hot.topics.editor";
import { asError, asInfo, showToast } from "@framework/events";
import { ignorePromise } from "@framework/utils";
import axios from "axios";

const SystemSettingsManager = () => {
  const t = getClientTranslator();
  const { data } = useSession();
  const toast = useToast();
  const [settings, setSettings] = useState<DatabaseEntry<SystemSettings>>({
    data: { ...DEFAULT_SYSTEM_SETTINGS },
  });

  const baseForm = useForm({
    defaultValues: {
      ...settings.data,
    },
    resolver: joiResolver(SYSTEM_SETTINGS_SCHEMA),
    mode: "onChange",
  });

  const { control, reset, getValues, setValue, trigger } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });

  useEffect(() => {
    reloadSettings();
  }, []);

  const reloadSettings = () => {
    axios.get(dbUrl(SYSTEM_SETTINGS_COLLECTION, SETTINGS_ID)).then((loaded) => {
      setSettings(loaded.data);
      reset(loaded.data.data);
      ignorePromise(trigger());
    });
  };

  const save = () => {
    axios
      .put(dbUrl(SYSTEM_SETTINGS_COLLECTION, SETTINGS_ID), {
        id: SETTINGS_ID,
        data: getValues(),
      })
      .then(() => {
        showToast(toast, asInfo(t("app.setting.saved"), ""));
      })
      .catch((error) => {
        console.error("error", error);
        showToast(
          toast,
          asError(t("errors.item.save"), t(`errors.backend.${error.code}`))
        );
        // empty on purpose
      });
  };
  const renderEditors = () => (
    <>
      <FormProvider {...baseForm}>
        <HotTopicsEditor />
      </FormProvider>
      <div className="flex justify-end">
        <Button
          isDisabled={!isDirty || !isValid}
          colorScheme="primary"
          onClick={save}
        >
          {t("app.actions.save")}
        </Button>
      </div>
    </>
  );

  const renderSettings = () => (
    <div className="flex flex-col w-full pr-4 gap-6">
      <Text fontSize="xl" fontWeight="bold">
        {t("app.setting.plural")}
      </Text>
      {settings.id ? renderEditors() : loading(t)}
    </div>
  );

  return data?.user ? renderSettings() : null;
};

export default SystemSettingsManager;
