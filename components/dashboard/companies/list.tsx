"use client";
import React, {useEffect, useState} from "react";
import {ListContent, ListDefinition, ListHeaderDefinition,} from "@framework/list/list.definition";
import {LIST_ADD_ITEM, LIST_EDIT_ITEM} from "@framework/constants";
import {ListColumnDefinitionBuilder} from "@framework/list/list.column.definition.builder";
import PropTypes from "prop-types";
import {asSelectable} from "@framework/utils";
import {DatabaseEntry, dbUrl} from "@framework/firebase.utils";
import {COMPANIES_COLLECTION, Company, newCompany} from "./model";
import {checkMarkColumnGetter} from "@components/fragments";
import {useEnvironmentContext, useEventContext,} from "@framework/context/providers";
import {AppCommandType, asError, Command, openPopupCommand,} from "@framework/events";
import {Selectable} from "@framework/model";
import {getClientTranslator, getCurrentLocale,} from "@framework/i18n.client.utils";
import {queryBuilder} from "@framework/query.builder";
import axios from "axios";
import FullList from "@framework/list/full.list";
import CompaniesEditorPopup from "@components/dashboard/companies/editor.popup";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, {name: "app.companies.new"})],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST: ListDefinition<DatabaseEntry<Company>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<Company>>()
      .withName("name")
      .withTitle("app.fields.name")
      .withGetClass((def, row?) => "w-3/10")
      .withGetValue((def, row) => row.data.name)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Company>>()
      .withName("code")
      .withTitle("app.fields.code")
      .withGetClass((def, row?) => "w-1/10")
      .withGetValue((def, row) => row.data.code)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Company>>()
      .withName("description")
      .withTitle("app.fields.description")
      .withGetClass((def, row?) => "w-5/10")
      .withGetValue((def, row) => row.data.description)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Company>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, {name: "app.company.edit"})],
};

const CompaniesList = (props: any) => {
  const t = getClientTranslator();
  const locale = getCurrentLocale();
  const {environment} = useEnvironmentContext();
  const id = "companies-list";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<Company>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const {eventBus, sendCommand, sendEvent} = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();
  const [locations, setLocations] = useState<Selectable[]>([]);

  useEffect(() => {
    reloadList();

    axios.get("/api/locations/for-popup")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("cannot load locations for popup", error);
      });
  }, []);

  useEffect(() => {
    console.log("locations current value", locations);
  }, [locations]);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("name", "asc").build();
    axios
      .post(dbUrl(COMPANIES_COLLECTION), query)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        // empty on purpose
      });
  };

  const popupAction = (action: Command) => {
    if (action.command === AppCommandType.ITEM_EDITED) {
      reloadList(); // FIXME
    }
  };

  const headerAction = (action: Command) => {
    if ((action.payload as Selectable).id === LIST_ADD_ITEM.id) {
      setPopupCommand(openPopupCommand({data: newCompany()}));
    }
  };

  const listAction = (action: Selectable, row: DatabaseEntry<Company>) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      console.log("must edit", row);
      axios
        .get(dbUrl(COMPANIES_COLLECTION, row.id!))
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

  const hasRoles = (action: Selectable, row?: DatabaseEntry<Company>) => {
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
      <CompaniesEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
        locations={locations}
      ></CompaniesEditorPopup>
    </>
  );
};

CompaniesList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default CompaniesList;
