"use client";
import React, { useEffect, useState } from "react";
import {
  ListContent,
  ListDefinition,
  ListHeaderDefinition,
} from "@framework/list/list.definition";
import { LIST_EDIT_ITEM } from "@framework/constants";
import { ListColumnDefinitionBuilder } from "@framework/list/list.column.definition.builder";
import PropTypes from "prop-types";
import { asSelectable } from "@framework/utils";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import {
  useEnvironmentContext,
  useEventContext,
} from "@framework/context/providers";
import {
  AppCommandType,
  asError,
  Command,
  openPopupCommand,
} from "@framework/events";
import { Selectable } from "@framework/model";
import { getClientTranslator } from "@framework/i18n.client.utils";
import { queryBuilder } from "@framework/query.builder";
import axios from "axios";
import FullList from "@/framework/list/full.list";
import {
  ROLES_COLLECTION,
  User,
  USERS_COLLECTION,
} from "@components/dashboard/users/model";
import UserEditorPopup from "@components/dashboard/users/editor.popup";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST: ListDefinition<DatabaseEntry<User>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<User>>()
      .withName("name")
      .withTitle("app.fields.name")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.name)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<User>>()
      .withName("email")
      .withTitle("app.fields.email")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.email)
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, { name: "app.user.edit" })],
};

const UsersList = (props: any) => {
  const t = getClientTranslator();
  const { environment } = useEnvironmentContext();
  const id = "location-manager";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<User>>({
    data: [],
    pageSize: listSize,
  });
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();

  useEffect(() => {
    reloadList();
  }, []);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("name", "asc").build();
    axios.post(dbUrl(USERS_COLLECTION), query).then((response) => {
      setContent(response.data);
    });
  };

  const popupAction = (action: Command) => {
    if (action.command === AppCommandType.ITEM_EDITED) {
      reloadList(); // FIXME
    }
  };

  const headerAction = (action: Command) => {};

  const listAction = (action: Selectable, row: DatabaseEntry<User>) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      console.log("must edit", row);
      let loadedUser: DatabaseEntry<User> = { data: {} as any };
      let loadedRoles: DatabaseEntry<User> = { data: {} as any };
      axios
        .get(dbUrl(USERS_COLLECTION, row.id!))
        .then((response) => {
          loadedUser = response.data;
          return axios.get(dbUrl(ROLES_COLLECTION, row.id!));
        })
        .then((response) => {
          loadedRoles = response.data;
          setPopupCommand(
            openPopupCommand({ user: loadedUser, roles: loadedRoles })
          );
        })
        .catch((error) => {
          sendEvent(
            asError("errors.item.load", t(`errors.backend.${error.code}`))
          );
        });
    }
  };

  const hasRoles = (action: Selectable, row?: DatabaseEntry<Location>) => {
    return true;
  };

  return (
    <>
      <FullList
        id={id}
        content={content.data}
        list={LIST}
        header={LIST_HEADER}
        headerVisible={true}
        headerAction={headerAction}
        listAction={listAction}
        hasRoles={hasRoles}
      ></FullList>
      <UserEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></UserEditorPopup>
    </>
  );
};

UsersList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default UsersList;
