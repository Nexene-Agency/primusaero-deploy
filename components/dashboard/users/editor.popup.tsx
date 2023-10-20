"use client";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  AppCommandType,
  asError,
  closePopupCommand,
  Command,
  itemEditedCommand,
  showToast,
} from "@framework/events";
import PopupContainer from "@framework/popup.container";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import { useSession } from "next-auth/react";

import { getClientTranslator } from "@framework/i18n.client.utils";
import {
  Roles,
  ROLES_COLLECTION,
  User,
  USERS_COLLECTION,
} from "@components/dashboard/users/model";
import { FormState } from "@framework/model";
import UserTab from "@components/dashboard/users/user.tab";
import RolesTab from "@components/dashboard/users/roles.tab";
import { optionalFunctionWrapper } from "@framework/utils";
import axios from "axios";

const UserEditorPopup = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const toast = useToast();
  const [id] = useState<string>(props.id);
  const [user, setUser] = useState<DatabaseEntry<User>>({
    data: { image: "", emailVerified: false, name: "", email: "" },
  } as DatabaseEntry<User>);
  const [roles, setRoles] = useState<DatabaseEntry<Roles>>({
    data: { valid: false, roles: [] },
  } as DatabaseEntry<Roles>);
  const userFormState = useRef<FormState<User>>({
    isDirty: false,
    isValid: false,
  });
  const rolesFormState = useRef<FormState<Roles>>({
    isDirty: false,
    isValid: false,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [command, setCommand] = useState<Command>(props.command);
  const [cannotSave, setCannotSave] = useState<boolean>(false);

  useEffect(() => {
    if (!command) {
      return;
    }
    if (command.command === AppCommandType.OPEN_POPUP) {
      console.log("setting model", command.payload);
      const incoming = command.payload as {
        user: DatabaseEntry<User>;
        roles: DatabaseEntry<Roles>;
      };
      setUser(incoming.user);
      setRoles(incoming.roles);
    }
  }, [command]);

  const renderHeader = () => <>{t("app.user.singular")}</>;

  const closePopup = (saved?: DatabaseEntry<User>) => {
    setCommand(closePopupCommand());
    optionalFunctionWrapper(
      "UserEditorPopup.onAction",
      props.onAction
    )(itemEditedCommand(saved));
  };

  const saveModel = () => {
    setSaving(true);
    axios
      .put(dbUrl(USERS_COLLECTION, user.id), {
        id: user.id,
        data: userFormState.current.data!,
      })
      .then(() => {
        return axios.put(dbUrl(ROLES_COLLECTION, roles.id), {
          id: roles.id,
          data: rolesFormState.current.data!,
        });
      })
      .then(() => {
        closePopup({ id: user.id, data: userFormState.current.data! });
      })
      .catch((error) => {
        console.error(error);
        showToast(
          toast,
          asError(t("errors.item.save"), t(`errors.backend.${error.code}`))
        );
      })
      .finally(() => setSaving(false));
  };

  const calculateCannotSave = () => {
    console.log("checking...");
    const result =
      saving ||
      !userFormState.current.isValid ||
      !rolesFormState.current.isValid ||
      !(userFormState.current.isDirty || rolesFormState.current.isDirty);
    if (result != cannotSave) {
      setCannotSave(result);
    }
  };

  const debug = () => {
    console.log("userFormState", userFormState);
    console.log("rolesFormState", rolesFormState);
  };

  const renderFooter = () => (
    <>
      <Button variant="outline" mr={3} onClick={debug} isDisabled={saving}>
        debug
      </Button>
      <Button
        variant="outline"
        mr={3}
        onClick={() => closePopup()}
        isDisabled={saving}
      >
        {t("app.actions.cancel")}
      </Button>
      <Button
        variant="outline"
        isDisabled={cannotSave}
        colorScheme="green"
        onClick={saveModel}
      >
        {/* @ts-ignore */}
        {t(user.id ? "app.actions.save" : "app.actions.create")}
      </Button>
    </>
  );

  const userChanged = (state: FormState<User>) => {
    userFormState.current = state;
    calculateCannotSave();
  };

  const rolesChanged = (state: FormState<Roles>) => {
    rolesFormState.current = state;
    calculateCannotSave();
  };

  return (
    <PopupContainer
      id={`${id}-popup`}
      key={command?.key}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      command={command}
    >
      <Tabs height="460px" maxHeight="460px">
        <TabList>
          <Tab>{t("app.user.singular")}</Tab>
          <Tab>{t("app.user.role.plural")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTab original={user} onChanged={userChanged} />
          </TabPanel>
          <TabPanel>
            <RolesTab original={roles} onChanged={rolesChanged} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopupContainer>
  );
};

UserEditorPopup.propTypes = {
  command: PropTypes.object,
  onAction: PropTypes.func,
};

export default UserEditorPopup;
