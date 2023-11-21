"use client";
import React, {useEffect, useState} from "react";
import {ListContent, ListDefinition, ListHeaderDefinition,} from "@framework/list/list.definition";
import {LIST_ADD_ITEM, LIST_EDIT_ITEM} from "@framework/constants";
import {ListColumnDefinitionBuilder} from "@framework/list/list.column.definition.builder";
import PropTypes from "prop-types";
import {asSelectable} from "@framework/utils";
import {DatabaseEntry, dbUrl} from "@framework/firebase.utils";
import {newTestimonial, Testimonial, TestimonialReference, TESTIMONIALS_COLLECTION,} from "./model";
import {checkMarkColumnGetter} from "@components/fragments";
import {useEnvironmentContext, useEventContext,} from "@framework/context/providers";
import {AppCommandType, asError, Command, openPopupCommand,} from "@framework/events";
import {Selectable} from "@framework/model";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {queryBuilder} from "@framework/query.builder";
import axios from "axios";
import FullList from "@/framework/list/full.list";
import {useSession} from "next-auth/react";
import TestimonialPopup from "@components/dashboard/testimonials/editor.popup";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, {name: "app.testimonial.new"})],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST: ListDefinition<DatabaseEntry<Testimonial>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<Testimonial>>()
      .withName("author")
      .withTitle("app.fields.author")
      .withGetClass((def, row?) => "w-2/10")
      .withGetValue((def, row) => row.data.author)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Testimonial>>()
      .withName("text")
      .withTitle("app.fields.text")
      .withGetClass((def, row?) => "w-7/10")
      .withGetValue((def, row) => row.data.text)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Testimonial>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, {name: "app.testimonial.edit"})],
};

const TestimonialList = (props: any) => {
  const t = getClientTranslator();
  const {environment} = useEnvironmentContext();
  const {data} = useSession();
  const id = "testimonial-manager";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<Testimonial>>({
    data: [],
    pageSize: listSize,
  });
  const {eventBus, sendCommand, sendEvent} = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();

  useEffect(() => {
    reloadList();
  }, []);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("author", "asc").build();
    axios.post(dbUrl(TESTIMONIALS_COLLECTION), query).then((response) => {
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
          data: {...newTestimonial(`${new Date().toISOString()}, ${data!.user!.email}`)},
        })
      );
    }
  };

  const listAction = (
    action: Selectable,
    row: DatabaseEntry<TestimonialReference>
  ) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      console.log("must edit", row);
      axios
        .get(dbUrl(TESTIMONIALS_COLLECTION, row.id!))
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
      <TestimonialPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></TestimonialPopup>
    </>
  );
};

TestimonialList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default TestimonialList;
