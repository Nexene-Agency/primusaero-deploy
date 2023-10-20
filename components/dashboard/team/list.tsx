"use client";
import React, { useEffect, useState } from "react";
import {
  ListContent,
  ListDefinition,
  ListHeaderDefinition,
} from "@framework/list/list.definition";
import { LIST_ADD_ITEM, LIST_EDIT_ITEM } from "@framework/constants";
import { ListColumnDefinitionBuilder } from "@framework/list/list.column.definition.builder";
import PropTypes from "prop-types";
import { asSelectable } from "@framework/utils";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import {
  newTeamMember,
  TEAM_MEMBERS_COLLECTION,
  TeamMember,
  TeamMemberReference,
} from "./model";
import { checkMarkColumnGetter } from "@components/fragments";
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
import TeamMemberEditorPopup from "@components/dashboard/team/editor.popup";
import { queryBuilder } from "@framework/query.builder";
import axios from "axios";
import FullList from "@/framework/list/full.list";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, { name: "app.teamMember.new" })],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST: ListDefinition<DatabaseEntry<TeamMember>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<TeamMember>>()
      .withName("name")
      .withTitle("app.fields.name")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.name)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<TeamMember>>()
      .withName("description")
      .withTitle("app.fields.title")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.title)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<TeamMember>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetClass((def, row?) => "__w-min-10pct __w-max-10pct")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<TeamMember>>()
      .withName("visible")
      .withTitle("app.fields.visible")
      .withGetClass((def, row?) => "__w-min-10pct __w-max-10pct")
      .withGetValue(checkMarkColumnGetter("visible"))
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<TeamMember>>()
      .withName("order")
      .withTitle("app.fields.order")
      .withGetClass((def, row?) => "__w-min-10pct __w-max-10pct")
      .withGetValue((def, row) => row.data.order)
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, { name: "app.teamMember.edit" })],
};

const TeamMembersList = (props: any) => {
  const t = getClientTranslator();
  const { environment } = useEnvironmentContext();
  const id = "location-manager";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<TeamMember>>({
    data: [],
    pageSize: listSize,
  });
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();

  useEffect(() => {
    reloadList();
  }, []);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("order", "asc").build();
    axios.post(dbUrl(TEAM_MEMBERS_COLLECTION), query).then((response) => {
      setContent(response.data);
    });
  };

  const popupAction = (action: Command) => {
    if (action.command === AppCommandType.ITEM_EDITED) {
      reloadList(); // FIXME
    }
  };

  const headerAction = (action: Command) => {
    if ((action.payload as Selectable).id === LIST_ADD_ITEM.id) {
      setPopupCommand(
        openPopupCommand({
          data: { ...newTeamMember() },
        })
      );
    }
  };

  const listAction = (
    action: Selectable,
    row: DatabaseEntry<TeamMemberReference>
  ) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      console.log("must edit", row);
      axios
        .get(dbUrl(TEAM_MEMBERS_COLLECTION, row.id!))
        .then((response) => {
          setPopupCommand(openPopupCommand(response.data));
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
      <TeamMemberEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></TeamMemberEditorPopup>
    </>
  );
};

TeamMembersList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default TeamMembersList;
