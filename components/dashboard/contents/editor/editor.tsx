import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {DatabaseEntry, dbUrl} from "@framework/firebase.utils";
import {loading} from "@/components/fragments";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {useToast} from "@chakra-ui/react";
import {
  AppEvent,
  AppEventType,
  asError,
  asEvent,
  asSuccess,
  Command,
  openPopupCommand,
  showToast
} from "@framework/events";
import {useRouter} from "next/navigation";
import "./editor.css";
import axios from "axios";
import {
  BLOCK_ACTIONS,
  CONTENT_BLOCKS_COLLECTION,
  CONTENT_FILE_VERSION_COLLECTION,
  CONTENT_FILES_COLLECTION,
  ContentBlock,
  ContentFile,
  ContentFileBlock,
  ContentFileVersion,
  deleteInBlocks,
  findBlock,
  newContentFile,
  newContentFileBlock,
  newContentFileVersion,
  replaceInBlocks
} from "@components/dashboard/contents/model";
import {useSession} from "next-auth/react";
import EditorMenu from "@components/dashboard/contents/editor/editor.menu";
import Renderer from "@components/dashboard/contents/editor/renderer";
import {queryBuilder} from "@framework/query.builder";
import AddBlockPopup from "@components/dashboard/contents/editor/add.block.popup";
import {useEventContext} from "@framework/context/providers";

const FileContentEditor = (props: any) => {
  const t = getClientTranslator();
  const [loaded, setLoaded] = useState<boolean>(false);
  const {data} = useSession();
  const toast = useToast();
  const [buildingBlocks, setBuildingBlocks] = useState<DatabaseEntry<ContentBlock>[]>([]);
  const [contentFile, setContentFile] = useState<DatabaseEntry<ContentFile>>({
    data: newContentFile(),
  } as DatabaseEntry<ContentFile>);
  const [contentFileVersion, setContentFileVersion] = useState<DatabaseEntry<ContentFileVersion>>({
    data: newContentFileVersion(data?.user?.name ?? "Primus Aero", 1),
  } as DatabaseEntry<ContentFileVersion>);
  const [rendererKey, setRendererKey] = useState<number>(0);
  const [menuKey, setMenuKey] = useState<number>(0);
  const router = useRouter();
  const [selectedBlock, setSelectedBlock] = useState<ContentFileBlock | undefined>();
  const [parentBlock, setParentBlock] = useState<ContentFileBlock | undefined>(undefined);
  const [addBlockCommand, setAddBlockCommand] = useState<Command>();
  const {eventBus, sendEvent} = useEventContext();
  const [triggerBlocksChanged, setTriggerBlocksChanged] = useState<number>(0);
  const [incomingEvent, setIncomingEvent] = useState<AppEvent>();

  useEffect(() => {
    const query = queryBuilder().limit(100).sortBy("name", "asc").build();
    axios
      .post(dbUrl(CONTENT_BLOCKS_COLLECTION), query)
      .then((result) => {
        console.log("loaded building blocks", result.data);
        setBuildingBlocks(result.data.data);
        return axios.get(dbUrl(CONTENT_FILES_COLLECTION, props.id));
      })
      .then((result) => {
        console.log("loaded content file", result.data);
        setContentFile(result.data);
      })
      .catch((error) => {
        console.error(error);
        showToast(
          toast,
          asError("app:errors.item.read", t(`errors.${error.code}`))
        );
      });

    const subscription = eventBus.subscribe(setIncomingEvent);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!incomingEvent) {
      return;
    }
    if (incomingEvent.type === AppEventType.BLOCK_SELECTED) {
      setSelectedBlock(incomingEvent.payload as ContentFileBlock);
    }
    if (incomingEvent.type === AppEventType.REQUEST_CONTENT_FILE_CHANGED) {
      // must use a state, otherwise the initial (empty) content file version is sent
      setTriggerBlocksChanged(new Date().getTime());
    }
    if (incomingEvent.type === AppEventType.ADD_CHILD) {
      // must use a state, otherwise the initial (empty) content file version is sent
      const parent = incomingEvent.payload as ContentFileBlock;
      console.log("should add child for parent", parent);
      setParentBlock(parent);
      setAddBlockCommand(openPopupCommand());
    }
    if (incomingEvent.type === AppEventType.DELETE_BLOCK) {
      replaceBlock(incomingEvent.payload as ContentFileBlock, true);
    }
    if (incomingEvent.type === AppEventType.SAVE_BLOCK) {
      replaceBlock(incomingEvent.payload as ContentFileBlock);
    }
  }, [incomingEvent]);

  useEffect(() => {
    console.log("sending blocks changed by request", contentFileVersion.data);
    sendEvent(asEvent(AppEventType.CONTENT_FILE_CHANGED, contentFileVersion.data));
  }, [triggerBlocksChanged]);

  useEffect(() => {
    if (contentFile.id) {
      axios
        .get(dbUrl(CONTENT_FILE_VERSION_COLLECTION(contentFile.id, contentFileVersion.data.version)))
        .then((result) => {
          console.log("loaded content file version", result.data);
          if (result.data.id) {
            setContentFileVersion(result.data);
          } else {
            console.log("empty version returned, creating a new one");
            setContentFileVersion({
              data: newContentFileVersion(data?.user?.name ?? "Primus Aero", contentFile.data.version)
            });
          }
        })
        .catch((error) => {
          console.error("cannot load version", error);
          setContentFileVersion({
            data: newContentFileVersion(data?.user?.name ?? "Primus Aero", contentFile.data.version)
          });
        })
        .finally(() => {
          setLoaded(true);
          console.log("contentFile", contentFile);
          console.log("contentFileVersion", contentFileVersion);
        });
    }
  }, [contentFile]);

  useEffect(() => {
    console.log("new contentFileVersion", contentFileVersion);
    setRendererKey(new Date().getTime());
    sendEvent(asEvent(AppEventType.CONTENT_FILE_CHANGED, contentFileVersion.data));
  }, [contentFileVersion]);

  useEffect(() => {
    console.log("editor selected block", selectedBlock);
    setRendererKey(new Date().getTime());
  }, [selectedBlock]);

  const menuAction = (action: BLOCK_ACTIONS, payload?: unknown) => {
    console.log("overlay action", action);
    if (action === BLOCK_ACTIONS.ADD) {
      setParentBlock(undefined);
      setAddBlockCommand(openPopupCommand());
    }
    if (action === BLOCK_ACTIONS.SAVE_FILE) {
      console.log("must save content file version", contentFileVersion);
      const toSave = {
        ...contentFileVersion.data,
        updatedAt: new Date().toISOString(),
        updatedBy: data?.user?.email ?? "system@primus.aero"
      };
      axios
        .put(dbUrl(CONTENT_FILE_VERSION_COLLECTION(contentFile.id!, contentFile.data.version)), {
          id: contentFileVersion.id,
          data: toSave
        })
        .then(() => {
          showToast(toast, asSuccess(t("app.content.file.saved"), ""));
        })
        .catch((error) => {
          showToast(
            toast,
            asError(t("errors.item.save"), t(`errors.backend.${error.code}`))
          );
        })
        .finally(() => {
          setContentFileVersion((current) => ({id: current.id, data: toSave}));
        });
    }
    if (action === BLOCK_ACTIONS.LEAVE_EDITOR) {
      router.push("/dashboard/content");
    }
  };

  /**
   * Replaces a block in the content file version.
   * @param block The new block to replace the old one.
   * @param toDelete If true, the block will be deleted.
   */
  const replaceBlock = (block: ContentFileBlock, toDelete = false) => {
    console.log("replacing block", block);
    console.log("original", contentFileVersion);
    const newBlocks = toDelete ?
      deleteInBlocks(contentFileVersion.data.blocks, block.id) :
      replaceInBlocks(contentFileVersion.data.blocks, block.id, block);
    console.log("new blocks", newBlocks);
    setContentFileVersion((current) => ({
      id: current.id,
      data: {
        ...current.data,
        blocks: newBlocks,
      },
    }));
  };

  const appendBlock = (block: DatabaseEntry<ContentBlock>) => {
    const newBlock = newContentFileBlock(block.data);
    if (parentBlock) {
      const theParent = findBlock(contentFileVersion.data.blocks, parentBlock.id);
      if (theParent) {
        theParent.children.push(newBlock);
        replaceBlock(theParent);
      } else {
        console.error("cannot find parent block", parentBlock);
      }
      setParentBlock(undefined);
    } else {
      const newBlocks = [...contentFileVersion.data.blocks, newBlock];
      setContentFileVersion((current) => ({
        id: current.id,
        data: {
          ...current.data,
          blocks: newBlocks,
        },
      }));
    }
  };

  const blockClicked = (block: ContentFileBlock) => {
    console.log("block clicked", block);
    setSelectedBlock(block);
    setRendererKey(new Date().getTime());
  };

  const renderEditor = () => (
    <div className="__root-layout">
      <EditorMenu
        onAction={menuAction}
        name={contentFile.data.name}
        buildingBlocks={buildingBlocks}
      />
      <Renderer
        key={`rnd-${rendererKey}`}
        file={contentFile.data}
        blocks={contentFileVersion.data.blocks}
        buildingBlocks={buildingBlocks}
        selectedBlock={selectedBlock}
        onClick={blockClicked}
      />
      <AddBlockPopup
        key={addBlockCommand?.key}
        command={addBlockCommand}
        buildingBlocks={buildingBlocks}
        onAction={appendBlock}
      ></AddBlockPopup>
    </div>
  );

  return (loaded ? renderEditor() : loading(t));
};

FileContentEditor.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FileContentEditor;
