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
import {AppCommandType, asError, asInfo, Command, openPopupCommand, showToast,} from "@framework/events";
import {Selectable} from "@framework/model";
import {getClientTranslator, getCurrentLocale,} from "@framework/i18n.client.utils";
import {queryBuilder} from "@framework/query.builder";
import axios from "axios";
import FullList from "@framework/list/full.list";
import {CONTENT_FILES_COLLECTION, ContentFile, newContentFile} from "@components/dashboard/contents/model";
import ContentFileEditorPopup from "@components/dashboard/contents/files/editor.popup";
import PencilIcon from "@framework/icons/basic/PencilIcon";
import {useRouter} from "next/navigation";
import EyeIcon from "@framework/icons/basic/EyeIcon";
import EyeOffIcon from "@framework/icons/basic/EyeOffIcon";
import DialogComponent from "@framework/interaction/dialog.component";
import {hexHash} from "next/dist/shared/lib/hash";
import {createYesNoDialog, DialogData, DialogResponse, DialogResult} from "@framework/interaction/dialog";
import {useToast} from "@chakra-ui/react";
import {useSession} from "next-auth/react";

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, {name: "app.content.file.new"})],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

export const LIST_EDIT_CONTENT: Selectable = {
  id: "edit_content",
  name: "app.content.file.editContent",
  icon: <PencilIcon/>,
  filter: ["*"],
};

export const LIST_PUBLISH_CONTENT: Selectable = {
  id: "publish_content",
  name: "app.content.file.publish",
  icon: <EyeIcon/>,
  filter: ["*"],
};

export const LIST_REVOKE_CONTENT: Selectable = {
  id: "revoke_content",
  name: "app.content.file.recall",
  icon: <EyeOffIcon/>,
  filter: ["*"],
};

const LIST: ListDefinition<DatabaseEntry<ContentFile>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentFile>>()
      .withName("name")
      .withTitle("app.fields.name")
      .withGetClass((def, row?) => "w-3/10")
      .withGetValue((def, row) => row.data.name)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentFile>>()
      .withName("description")
      .withTitle("app.fields.description")
      .withGetClass((def, row?) => "w-5/10")
      .withGetValue((def, row) => row.data.description)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentFile>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentFile>>()
      .withName("version")
      .withTitle("app.fields.version")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue((def, row) => row.data.version)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<ContentFile>>()
      .withName("publishedVersion")
      .withTitle("app.fields.publishedVersion")
      .withGetClass((def, row?) => "w-1/20")
      .withGetValue((def, row) => row.data.publishedVersion)
      .build(),
  ],
  operations: [asSelectable(LIST_EDIT_ITEM, {name: "app.content.file.edit"}), LIST_EDIT_CONTENT, LIST_PUBLISH_CONTENT, LIST_REVOKE_CONTENT],
};

const ContentFilesList = (props: any) => {
  const t = getClientTranslator();
  const locale = getCurrentLocale();
  const router = useRouter();
  const {data} = useSession();
  const {environment} = useEnvironmentContext();
  const id = "contentFile-list";
  const toast = useToast();
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<ContentFile>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const {eventBus, sendCommand, sendEvent} = useEventContext();
  const [popupCommand, setPopupCommand] = useState<Command>();
  // const [companies, setCompanies] = useState<Selectable[]>([]);
  const [publishQuestion, setPublishQuestion] = useState<DialogData | undefined>();
  const [revokeQuestion, setRevokeQuestion] = useState<DialogData | undefined>();

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
      .post(dbUrl(CONTENT_FILES_COLLECTION), query)
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
      setPopupCommand(openPopupCommand({data: newContentFile()}));
    }
  };

  const listAction = (action: Selectable, row: DatabaseEntry<ContentFile>) => {
    if (action.id === LIST_EDIT_ITEM.id) {
      axios
        .get(dbUrl(CONTENT_FILES_COLLECTION, row.id!))
        .then((response) => {
          setPopupCommand(openPopupCommand(response.data));
        })
        .catch((error) => {
          sendEvent(
            asError("errors.item.load", t(`errors.backend.${error.code}`))
          );
        });
    }
    if (action.id === LIST_EDIT_CONTENT.id) {
      router.push(`/dashboard/content/${row.id!}`);
    }
    if (action.id === LIST_PUBLISH_CONTENT.id) {
      setPublishQuestion(
        createYesNoDialog(
          t("app.content.file.publish"),
          t("app.content.file.publishQuestion", {title: row.data.name}),
          row.id
        )
      );
    }
    if (action.id === LIST_REVOKE_CONTENT.id) {
      setRevokeQuestion(
        createYesNoDialog(
          t("app.content.file.recall"),
          t("app.content.file.recallQuestion", {title: row.data.name}),
          row.id
        )
      );
    }
  };

  const hasRoles = (action: Selectable, row?: DatabaseEntry<ContentFile>) => {
    if (action.id === LIST_PUBLISH_CONTENT.id) {
      return row?.data.valid && (row?.data.publishedVersion < row?.data.version);
    }
    if (action.id === LIST_REVOKE_CONTENT.id) {
      return (row?.data.publishedVersion ?? 0) > 0;
    }
    return true;
  };

  const doPublish = (result: DialogResponse) => {
    console.log("dialog result", result);
    if (result.result !== DialogResult.YES) {
      return;
    }
    axios
      .put("/api/content/published", {fileId: result.data})
      .then(() => {
        showToast(toast, asInfo(t("app.content.file.published"), ""));
        setTimeout(() => {
          reloadList(); // FIXME
        }, 1500);
      })
      .catch((error) => {
        showToast(
          toast,
          asError("errors.item.process", t(`errors.backend.${error.code}`))
        );
      });
  };

  const doRevoke = (result: DialogResponse) => {
    console.log("dialog result", result);
    if (result.result !== DialogResult.YES) {
      return;
    }
    axios
      .delete(`/api/content/published/${result.data}`)
      .then(() => {
        showToast(toast, asInfo(t("app.content.file.recalled"), ""));
        setTimeout(() => {
          reloadList(); // FIXME
        }, 1500);
      })
      .catch((error) => {
        showToast(
          toast,
          asError("errors.item.process", t(`errors.backend.${error.code}`))
        );
      });
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
      <ContentFileEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></ContentFileEditorPopup>
      <DialogComponent
        key={hexHash(publishQuestion?.id || `${Math.random()}`)}
        data={publishQuestion}
        onAction={doPublish}
      />
      <DialogComponent
        key={hexHash(revokeQuestion?.id || `${Math.random()}`)}
        data={revokeQuestion}
        onAction={doRevoke}
      />
    </>
  );
};

ContentFilesList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default ContentFilesList;
