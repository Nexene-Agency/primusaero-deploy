import React, { useEffect, useState } from "react";
import {
  ListContent,
  ListDefinition,
  ListHeaderDefinition,
} from "@framework/list/list.definition";
import { asSelectable, optionalFunctionWrapper } from "@framework/utils";
import {
  LIST_ADD_ITEM,
  LIST_EDIT_ITEM,
  LIST_ITEM_DETAILS,
} from "@framework/constants";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import {
  BlogPost,
  BLOGPOST_REFERENCES_COLLECTION,
  BlogPostReference,
  BLOGPOSTS_COLLECTION,
  newBlogPost,
} from "@components/dashboard/blogs/model";
import { ListColumnDefinitionBuilder } from "@framework/list/list.column.definition.builder";
import { checkMarkColumnGetter } from "@components/fragments";
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
import PropTypes from "prop-types";

import { getClientTranslator } from "@framework/i18n.client.utils";
import BlogPostEditorPopup from "./editor.popup";
import { useSession } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import PencilIcon from "@framework/icons/basic/PencilIcon";
import { useRouter } from "next/navigation";
import axios from "axios";
import FullList from "@/framework/list/full.list";
import { queryBuilder } from "@framework/query.builder";
import VerifyCheckIcon from "@framework/icons/basic/VerifyCheckIcon";
import {
  createYesNoDialog,
  DialogData,
  DialogResponse,
  DialogResult,
} from "@framework/interaction/dialog";
import DialogComponent from "@framework/interaction/dialog.component";
import { hexHash } from "next/dist/shared/lib/hash";

export const LIST_EDIT_CONTENT: Selectable = {
  id: "edit_content",
  name: "operations.edit_content",
  icon: <PencilIcon className="__menu-icon" />,
  filter: ["*"],
};

const LIST_HEADER: ListHeaderDefinition = {
  operations: [asSelectable(LIST_ADD_ITEM, { name: "app.blog.new" })],
  filterDefinitions: [
    // asStringFilter("name", "fields.name"),
    // asStringFilter("description", "fields.description")
  ],
};

const LIST_PUBLISH: Selectable = {
  id: "publish",
  name: "app.blog.publish",
  icon: <VerifyCheckIcon className="__menu-icon" />,
  filter: ["*"],
};

const LIST: ListDefinition<DatabaseEntry<BlogPost>> = {
  columns: [
    new ListColumnDefinitionBuilder<DatabaseEntry<BlogPost>>()
      .withName("name")
      .withTitle("app.fields.name")
      .withGetValue((def, row) => row.data.name)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<BlogPost>>()
      .withName("description")
      .withTitle("app.fields.description")
      .withGetValue((def, row) => row.data.description)
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<BlogPost>>()
      .withName("valid")
      .withTitle("app.fields.valid")
      .withGetValue(checkMarkColumnGetter("valid"))
      .build(),
    new ListColumnDefinitionBuilder<DatabaseEntry<BlogPost>>()
      .withName("published")
      .withTitle("app.fields.published")
      .withGetValue(checkMarkColumnGetter("published"))
      .build(),
  ],
  operations: [
    asSelectable(LIST_EDIT_ITEM, { name: "app.blog.edit" }),
    asSelectable(LIST_EDIT_CONTENT, { name: "app.blog.editContent" }),
    LIST_PUBLISH,
  ],
};

const BlogPostsList = (props: any) => {
  const t = getClientTranslator();
  const id = "blog-manager";
  const { data } = useSession();
  const router = useRouter();
  const toast = useToast();
  const { environment } = useEnvironmentContext();
  const [listSize, setListSize] = useState<number>(environment.currentListSize);
  const [content, setContent] = useState<ListContent<BlogPostReference>>({
    data: [],
    pageSize: environment.currentListSize,
  });
  const [popupCommand, setPopupCommand] = useState<Command>();
  const [question, setQuestion] = useState<DialogData | undefined>();

  useEffect(() => {
    reloadList();
  }, []);

  const reloadList = (page = 0) => {
    const query = queryBuilder().limit(listSize).sortBy("name", "asc").build();
    axios
      .post(dbUrl(BLOGPOST_REFERENCES_COLLECTION), query)
      .then((response) => {
        setContent(response.data);
      });
  };

  const popupAction = (action: Command) => {
    if (action.command === AppCommandType.ITEM_EDITED) {
      reloadList();
    }
  };

  const headerAction = (action: Command) => {
    if ((action.payload as Selectable).id === LIST_ADD_ITEM.id) {
      setPopupCommand(
        openPopupCommand({
          data: newBlogPost(data!.userId!, data!.user!.email!),
        })
      );
    }
  };

  const listAction = (action: Selectable, row: any) => {
    if (action.id === LIST_ITEM_DETAILS.id) {
      optionalFunctionWrapper("blogList", props.onAction)(action, row);
    }
    if (action.id === LIST_EDIT_ITEM.id) {
      axios
        .get(dbUrl(BLOGPOSTS_COLLECTION, row.id!))
        .then((response) => {
          setPopupCommand(openPopupCommand(response.data));
        })
        .catch((error) => {
          showToast(
            toast,
            asError("app:errors.item.read", t(`errors.${error.code}`))
          );
        });
    }
    if (action.id === LIST_EDIT_CONTENT.id) {
      router.push(`/dashboard/blog/content/${row.id!}`);
    }
    if (action.id === LIST_PUBLISH.id) {
      setQuestion(
        createYesNoDialog(
          t("app.blog.publish"),
          t("app.blog.publishQuestion", { title: row.data.name }),
          row.id
        )
      );
    }
  };

  const hasRoles = (action: Selectable, row: DatabaseEntry<BlogPost>) => {
    return true;
  };

  const doPublish = (result: DialogResponse) => {
    console.log("dialog result", result);
    if (result.result !== DialogResult.YES) {
      return;
    }
    axios
      .put("/api/blog", { id: result.data })
      .then(() => {
        showToast(toast, asInfo(t("app.blog.publishedNow"), ""));
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
        headerAction={headerAction}
        headerVisible={true}
        listAction={listAction}
        hasRoles={hasRoles}
      ></FullList>
      <BlogPostEditorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={popupAction}
      ></BlogPostEditorPopup>
      <DialogComponent
        key={hexHash(question?.id || `${Math.random()}`)}
        data={question}
        onAction={doPublish}
      />
    </>
  );
};

BlogPostsList.propTypes = {
  onAction: PropTypes.func.isRequired,
};

export default BlogPostsList;
