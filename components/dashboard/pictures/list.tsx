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
import { newPicture, Picture, PICTURES_COLLECTION } from "./model";
import { checkMarkColumnGetter } from "@components/fragments";
import { useSession } from "next-auth/react";
import {
  useEnvironmentContext,
  useEventContext,
} from "@framework/context/providers";
import {
  AppCommandType,
  asError,
  asInfo,
  Command,
  openPopupCommand,
} from "@framework/events";
import { Selectable } from "@framework/model";
import CopyIcon from "@framework/icons/basic/CopyIcon";

import { getClientTranslator } from "@framework/i18n.client.utils";
import PictureEditorPopup from "./editor.popup";
import { queryBuilder } from "@framework/query.builder";
import axios from "axios";
import FullList from "@/framework/list/full.list";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, { name: "app.picture.new" })],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

export const COPY_REFERENCE: Selectable = {
  id: "copy_reference",
  name: "app.picture.copy_reference",
  icon: <CopyIcon className="__menu-icon" />,
  filter: ["*"],
};

const LIST: ListDefinition<DatabaseEntry<Picture>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<Picture>>()
      .withName("name")
      .withTitle("app.fields.name")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.name)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Picture>>()
      .withName("description")
      .withTitle("app.fields.description")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.description)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Picture>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetClass((def, row?) => "__w-min-10pct __w-max-10pct")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
  ],
  operations: [
    asSelectable(LIST_EDIT_ITEM, { name: "app.picture.edit" }),
    asSelectable(COPY_REFERENCE, {}),
  ],
};

const PicturesList = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();
  const { environment } = useEnvironmentContext();
  const id = "blog-manager";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<Picture>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const { eventBus, sendCommand, sendEvent } = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();

  useEffect(() => {
    reloadList();
  }, []);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("name", "asc").build();
    axios
      .post(dbUrl(PICTURES_COLLECTION), query)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        // empty on purpose
      });
  };

  const popupAction = (action: Command) => {
    if (action.command === AppCommandType.ITEM_EDITED) {
      reloadList();
    }
  };

  const headerAction = (action: Command) => {
    if ((action.payload as Selectable).id === LIST_ADD_ITEM.id) {
      console.log("should open popup");
      setPopupCommand(openPopupCommand({ data: newPicture() }));
    }
  };

  const listAction = (action: Selectable, row: DatabaseEntry<Picture>) => {
    if (action.id === COPY_REFERENCE.id) {
      console.log("must copy", row);
      navigator.clipboard.writeText(row.data.imageURL).then(() => {
        sendEvent(asInfo("app.picture.reference_copied", ""));
      });
    }
    if (action.id === LIST_EDIT_ITEM.id) {
      console.log("must edit", row);
      axios
        .get(dbUrl(PICTURES_COLLECTION, row.id!))
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

  const hasRoles = (action: Selectable, row?: DatabaseEntry<Picture>) => {
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
      <PictureEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></PictureEditorPopup>
    </>
  );
};

PicturesList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default PicturesList;
