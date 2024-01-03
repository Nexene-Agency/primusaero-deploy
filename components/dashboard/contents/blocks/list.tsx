"use client";
import React, {useEffect, useState} from "react";
import {ListContent, ListDefinition, ListHeaderDefinition,} from "@framework/list/list.definition";
import {LIST_ADD_ITEM, LIST_EDIT_ITEM} from "@framework/constants";
import {ListColumnDefinitionBuilder} from "@framework/list/list.column.definition.builder";
import PropTypes from "prop-types";
import {asSelectable} from "@framework/utils";
import {DatabaseEntry, dbUrl} from "@framework/firebase.utils";
import {checkMarkColumnGetter} from "@components/fragments";
import {useEnvironmentContext, useEventContext,} from "@framework/context/providers";
import {AppCommandType, asError, Command, openPopupCommand,} from "@framework/events";
import {Selectable} from "@framework/model";
import {getClientTranslator, getCurrentLocale,} from "@framework/i18n.client.utils";
import {queryBuilder} from "@framework/query.builder";
import axios from "axios";
import FullList from "@framework/list/full.list";
import {CONTENT_BLOCKS_COLLECTION, ContentBlock, newContentBlock} from "@components/dashboard/contents/model";
import ContentBlockEditorPopup from "@components/dashboard/contents/blocks/editor.popup";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, {name: "app.content.block.new"})],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST: ListDefinition<DatabaseEntry<ContentBlock>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentBlock>>()
      .withName("name")
      .withTitle("app.fields.name")
      .withGetClass((def, row?) => "w-3/10")
      .withGetValue((def, row) => row.data.name)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentBlock>>()
      .withName("code")
      .withTitle("app.fields.code")
      .withGetClass((def, row?) => "w-1/10")
      .withGetValue((def, row) => row.data.code)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentBlock>>()
      .withName("description")
      .withTitle("app.fields.description")
      .withGetClass((def, row?) => "w-5/10")
      .withGetValue((def, row) => row.data.description)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentBlock>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, {name: "app.content.block.edit"})],
};

const ContentBlocksList = (props: any) => {
  const t = getClientTranslator();
  const locale = getCurrentLocale();
  const {environment} = useEnvironmentContext();
  const id = "contentBlock-list";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<ContentBlock>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const {eventBus, sendCommand, sendEvent} = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();
  // const [companies, setCompanies] = useState<Selectable[]>([]);

  useEffect(() => {
    reloadList();

    // axios.get("/api/companies/for-popup")
    //   .then((response) => {
    //     setCompanies(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("cannot load companies for popup", error);
    //   });
  }, []);

  // useEffect(() => {
  //   console.log("companies current value", companies);
  // }, [companies]);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("name", "asc").build();
    axios
      .post(dbUrl(CONTENT_BLOCKS_COLLECTION), query)
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
      setPopupCommand(openPopupCommand({data: newContentBlock()}));
    }
  };

  const listAction = (action: Selectable, row: DatabaseEntry<ContentBlock>) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      console.log("must edit", row);
      axios
        .get(dbUrl(CONTENT_BLOCKS_COLLECTION, row.id!))
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

  const hasRoles = (action: Selectable, row?: DatabaseEntry<ContentBlock>) => {
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
      <ContentBlockEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></ContentBlockEditorPopup>
    </>
  );
};

ContentBlocksList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default ContentBlocksList;
