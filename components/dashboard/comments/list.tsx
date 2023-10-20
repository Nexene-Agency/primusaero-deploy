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
import { useEnvironmentContext } from "@framework/context/providers";
import {
  AppCommandType,
  asError,
  Command,
  openPopupCommand,
  showToast,
} from "@framework/events";
import { Selectable } from "@framework/model";
import { getClientTranslator } from "@framework/i18n.client.utils";
import {
  checkMarkColumnGetter,
  dateGetter,
  preColumnGetter,
} from "@components/fragments";
import CommentEditorPopup from "./editor.popup";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { queryBuilder } from "@framework/query.builder";
import FullList from "@framework/list/full.list";
import { Comment, COMMENTS_COLLECTION } from "@components/comments/model";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST: ListDefinition<DatabaseEntry<Comment>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<Comment>>()
      .withName("when")
      .withTitle("app.comment.when")
      .withGetClass((def, row?) => "nowrap")
      .withGetValue(dateGetter("when", "LLL"))
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Comment>>()
      .withName("parentName")
      .withTitle("app.comment.parentName")
      .withGetClass((def, row?) => "nowrap")
      .withGetValue((def, row) => row.data.parentName.substring(0, 50) + "...")
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Comment>>()
      .withName("text")
      .withTitle("app.comment.text")
      .withGetClass((def, row?) => "w-full")
      .withGetValue(preColumnGetter("text"))
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Comment>>()
      .withName("approved")
      .withTitle("app.comment.approved")
      .withGetClass((def, row?) => "nowrap")
      .withGetValue(checkMarkColumnGetter("approved"))
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, { name: "app.comment.edit" })],
};

const CommentsList = (props: any) => {
  const t = getClientTranslator();
  const { environment } = useEnvironmentContext();
  const id = "articles-list";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<Comment>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const [popupCommand, setPopupCommand] = useState<Command>();
  const toast = useToast();

  useEffect(() => {
    reloadList();
  }, []);

  const reloadList = (page = 0) => {
    const query = queryBuilder().sortBy("when", "desc").limit(listSize).build();
    axios
      .post(dbUrl(COMMENTS_COLLECTION), query)
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
    if (action.command === AppCommandType.RELOAD_LIST) {
      reloadList(); // FIXME
    }
  };

  const headerAction = (action: Command) => {
    // do nothing yet
  };

  const listAction = (action: Selectable, row: DatabaseEntry<Comment>) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      axios
        .get(dbUrl(COMMENTS_COLLECTION, row.id))
        .then((response) => {
          setPopupCommand(openPopupCommand(response.data));
        })
        .catch((error) => {
          showToast(
            toast,
            asError("errors.item.load", t(`errors.backend.${error.code}`))
          );
        });
    }
  };

  const hasRoles = (action: Selectable, row?: DatabaseEntry<Comment>) => {
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
      <CommentEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></CommentEditorPopup>
    </>
  );
};

CommentsList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default CommentsList;
