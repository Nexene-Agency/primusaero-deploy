"use client";
import React, {useEffect, useState} from "react";
import {ListContent, ListDefinition, ListHeaderDefinition,} from "@framework/list/list.definition";
import {LIST_ADD_ITEM, LIST_EDIT_ITEM} from "@framework/constants";
import {ListColumnDefinitionBuilder} from "@framework/list/list.column.definition.builder";
import PropTypes from "prop-types";
import {asSelectable} from "@framework/utils";
import {DatabaseEntry, dbUrl} from "@framework/firebase.utils";
import {newPersonnel, Personnel, PERSONNEL_COLLECTION} from "./model";
import {checkMarkColumnGetter} from "@components/fragments";
import {useEnvironmentContext, useEventContext,} from "@framework/context/providers";
import {AppCommandType, asError, Command, openPopupCommand,} from "@framework/events";
import {Selectable} from "@framework/model";
import {getClientTranslator, getCurrentLocale,} from "@framework/i18n.client.utils";
import {queryBuilder} from "@framework/query.builder";
import axios from "axios";
import FullList from "@framework/list/full.list";
import PersonnelEditorPopup from "@components/dashboard/personnel/editor.popup";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, {name: "app.companies.new"})],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST: ListDefinition<DatabaseEntry<Personnel>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<Personnel>>()
      .withName("publicName")
      .withTitle("app.fields.publicName")
      .withGetClass((def, row?) => "w-2/10")
      .withGetValue((def, row) => row.data.publicName)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Personnel>>()
      .withName("firstName")
      .withTitle("app.fields.firstName")
      .withGetClass((def, row?) => "w-3/10")
      .withGetValue((def, row) => row.data.firstName)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Personnel>>()
      .withName("lastName")
      .withTitle("app.fields.lastName")
      .withGetClass((def, row?) => "w-3/10")
      .withGetValue((def, row) => row.data.lastName)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Personnel>>()
      .withName("listingOrder")
      .withTitle("app.fields.listingOrder")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue((def, row) => row.data.listingOrder)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Personnel>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, {name: "app.personnel.edit"})],
};

const PersonnelList = (props: any) => {
  const t = getClientTranslator();
  const locale = getCurrentLocale();
  const {environment} = useEnvironmentContext();
  const id = "personnel-list";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<Personnel>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const {eventBus, sendCommand, sendEvent} = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();
  const [companies, setCompanies] = useState<Selectable[]>([]);

  useEffect(() => {
    reloadList();

    axios.get("/api/companies/for-popup")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("cannot load companies for popup", error);
      });
  }, []);

  useEffect(() => {
    console.log("companies current value", companies);
  }, [companies]);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("lastName", "asc").sortBy("firstName", "asc").build();
    axios
      .post(dbUrl(PERSONNEL_COLLECTION), query)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        console.error("cannot read personnel", error);
      });
  };

  const popupAction = (action: Command) => {
    if (action.command === AppCommandType.ITEM_EDITED) {
      reloadList(); // FIXME
    }
  };

  const headerAction = (action: Command) => {
    if ((action.payload as Selectable).id === LIST_ADD_ITEM.id) {
      setPopupCommand(openPopupCommand({data: newPersonnel()}));
    }
  };

  const listAction = (action: Selectable, row: DatabaseEntry<Personnel>) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      console.log("must edit", row);
      axios
        .get(dbUrl(PERSONNEL_COLLECTION, row.id!))
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

  const hasRoles = (action: Selectable, row?: DatabaseEntry<Personnel>) => {
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
      <PersonnelEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
        companies={companies}
      ></PersonnelEditorPopup>
    </>
  );
};

PersonnelList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default PersonnelList;
