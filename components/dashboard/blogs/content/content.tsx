import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DatabaseEntry, dbUrl } from "@framework/firebase.utils";
import {
  BlogBlock,
  BlogPost,
  BLOGPOSTS_COLLECTION,
  newBlogBlockMarkdown,
  newBlogPost,
} from "@components/dashboard/blogs/model";
import { loading } from "@/components/fragments";
import { getClientTranslator } from "@framework/i18n.client.utils";
import { useToast } from "@chakra-ui/react";
import { asError, asSuccess, showToast } from "@framework/events";
import EditorMenu from "@components/dashboard/blogs/content/editor.menu";
import Renderer from "@components/dashboard/blogs/content/renderer";
import { useRouter } from "next/navigation";

import "./content.css";

import "@app/styles/blog.css";
import axios from "axios";

const BlogContentEditor = (props: any) => {
  const t = getClientTranslator();
  const toast = useToast();
  const [model, setModel] = useState<DatabaseEntry<BlogPost>>({
    data: newBlogPost("", ""),
  } as DatabaseEntry<BlogPost>);
  const [rendererKey, setRendererKey] = useState<number>(0);
  const router = useRouter();
  const [selectedBlock, setSelectedBlock] = useState<BlogBlock | undefined>();

  useEffect(() => {
    axios
      .get(dbUrl(BLOGPOSTS_COLLECTION, props.id))
      .then((result) => {
        console.log("loaded", result);
        setModel(result.data);
      })
      .catch((error) => {
        console.error(error);
        showToast(
          toast,
          asError("app:errors.item.read", t(`errors.${error.code}`))
        );
      });
  }, []);

  const menuAction = (action: string, payload?: unknown) => {
    console.log("overlay action", action);
    if (action === "add-block") {
      setModel((current) => ({
        id: current.id,
        data: {
          ...current.data,
          content: [...current.data.content, newBlogBlockMarkdown()],
        },
      }));
    }
    if (action === "save-blogpost") {
      axios
        .put(dbUrl(BLOGPOSTS_COLLECTION, model.id), model)
        .then(() => {
          showToast(toast, asSuccess(t("app.blog.saved"), ""));
        })
        .catch((error) => {
          showToast(
            toast,
            asError(t("errors.item.save"), t(`errors.backend.${error.code}`))
          );
        });
    }
    if (action === "exit-blogpost") {
      router.push("/dashboard/blog");
    }
  };

  const replaceBlock = (block: BlogBlock) => {
    console.log(block);
    console.log("before", model.data.content);
    const blocks = model.data.content.map((current) =>
      current.id !== block.id ? current : block
    );
    console.log("after", blocks);
    setModel((current) => ({
      id: current.id,
      data: {
        ...current.data,
        content: blocks,
      },
    }));
    setRendererKey(new Date().getTime());
  };

  const blockClicked = (block: BlogBlock) => {
    console.log("block clicked", block);
    setSelectedBlock(block);
    setRendererKey(new Date().getTime());
  };

  const saveBlock = (block: BlogBlock) => {
    console.log("must save block", block);
    replaceBlock(block);
    setSelectedBlock(undefined);
  };

  const renderEditor = () => (
    <>
      <EditorMenu
        onAction={menuAction}
        selectedBlock={selectedBlock}
        onBlockSave={saveBlock}
        key={`mnu-${rendererKey}`}
      />
      <Renderer
        key={`rnd-${rendererKey}`}
        blocks={model.data.content}
        onClick={blockClicked}
      />
    </>
  );

  return model.id ? renderEditor() : loading(t);
};

BlogContentEditor.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BlogContentEditor;
