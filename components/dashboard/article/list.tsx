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
import { useEnvironmentContext } from "@framework/context/providers";
import {
  AppCommandType,
  asError,
  asInfo,
  Command,
  openPopupCommand,
  showToast,
} from "@framework/events";
import { Selectable } from "@framework/model";
import { getClientTranslator } from "@framework/i18n.client.utils";
import {
  Article,
  ArticleReference,
  ARTICLES_COLLECTION,
  newArticle,
} from "@components/dashboard/article/model";
import { dateGetter } from "@components/fragments";
import ArticleEditorPopup from "./editor.popup";
import VerifyCheckIcon from "@framework/icons/basic/VerifyCheckIcon";
import {
  createYesNoDialog,
  DialogData,
  DialogResponse,
  DialogResult,
} from "@framework/interaction/dialog";
import DialogComponent from "@framework/interaction/dialog.component";
import { hexHash } from "next/dist/shared/lib/hash";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { queryBuilder } from "@framework/query.builder";
import FullList from "@framework/list/full.list";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, { name: "app.teamMember.new" })],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST_MARK_AS_PROCESSED: Selectable = {
  id: "mark_as_processed",
  name: "app.article.markAsProcessed",
  icon: <VerifyCheckIcon className="__menu-icon" />,
  filter: ["*"],
};

const LIST: ListDefinition<DatabaseEntry<Article>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<Article>>()
      .withName("title")
      .withTitle("app.article.title")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.title)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Article>>()
      .withName("author")
      .withTitle("app.article.author")
      .withGetClass((def, row?) => "__w-min-35pct __w-max-35pct")
      .withGetValue((def, row) => row.data.email)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Article>>()
      .withName("submitted")
      .withTitle("app.article.submitted")
      .withGetClass((def, row?) => "__w-min-10pct __w-max-10pct")
      .withGetValue(dateGetter("submitted"))
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<Article>>()
      .withName("processed")
      .withTitle("app.article.processed")
      .withGetClass((def, row?) => "__w-min-10pct __w-max-10pct")
      .withGetValue(dateGetter("processed"))
      .build(),
  ],
  operations: [
    asSelectable(LIST_EDIT_ITEM, { name: "app.article.edit" }),
    LIST_MARK_AS_PROCESSED,
  ],
};

const ArticlesList = (props: any) => {
  const t = getClientTranslator();
  const { environment } = useEnvironmentContext();
  const id = "articles-list";
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<Article>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const [popupCommand, setPopupCommand] = useState<Command>();
  const [question, setQuestion] = useState<DialogData | undefined>();
  const toast = useToast();

  useEffect(() => {
    reloadList();
  }, []);

  const reloadList = (page = 0) => {
    const query = queryBuilder()
      .sortBy("submitted", "desc")
      .limit(listSize)
      .build();
    axios
      .post(dbUrl(ARTICLES_COLLECTION), query)
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
      setPopupCommand(
        openPopupCommand({
          data: newArticle(),
        })
      );
    }
  };

  const doMarkAsProcessed = (result: DialogResponse) => {
    console.log("dialog result", result);
    if (result.result !== DialogResult.YES) {
      return;
    }
    axios
      .put("/api/process_article", { id: result.data })
      .then((response) => {
        if (response.status !== 200) {
          showToast(
            toast,
            asError(
              t("errors.item.process"),
              t(`errors.backend.${response.status}`)
            )
          );
        } else {
          showToast(toast, asInfo(t("app.article.processedSet"), ""));
          setTimeout(() => {
            reloadList(); // FIXME
          }, 1500);
        }
      })
      .catch((error) => {
        showToast(
          toast,
          asError("errors.item.process", t(`errors.backend.${error.code}`))
        );
      });
  };

  const markAsProcessed = (id: string, title: string) => {
    setQuestion(
      createYesNoDialog(
        t("app.article.markAsProcessed"),
        t("app.article.markAsProcessedQuestion", { title }),
        id
      )
    );
  };

  const listAction = (action: Selectable, row: ArticleReference) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      axios
        .get(dbUrl(ARTICLES_COLLECTION, row.id))
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
    if (action.id === LIST_MARK_AS_PROCESSED.id) {
      markAsProcessed(row.id, row.data.title);
    }
  };

  const hasRoles = (action: Selectable, row?: DatabaseEntry<Article>) => {
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
      <ArticleEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></ArticleEditorPopup>
      <DialogComponent
        key={hexHash(question?.id || "aa")}
        data={question}
        onAction={doMarkAsProcessed}
      />
    </>
  );
};

ArticlesList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default ArticlesList;
