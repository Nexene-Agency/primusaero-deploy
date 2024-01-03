"use client";
import React, {useState} from "react";
import {Command} from "@framework/events";
import ContextProviders from "@framework/context/context.providers";

import {getClientTranslator} from "@framework/i18n.client.utils";
import {useSession} from "next-auth/react";
import FilesQueueIcon from "@framework/icons/basic/FilesQueueIcon";
import {Button, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ThumbnailsSmallIcon from "@framework/icons/basic/ThumbnailsSmallIcon";
import ContentBlocksList from "@components/dashboard/contents/blocks/list";
import ContentFilesList from "@components/dashboard/contents/files/list";

export enum Mode {
  FILES,
  BLOCKS
}

const ContentsManager = (props: any) => {
  const t = getClientTranslator();
  const {data} = useSession();
  const [mode, setMode] = useState<Mode>(Mode.FILES);

  const listAction = (command: Command) => {
    // empty on purpose
    // {data ? <LocationsList onAction={listAction}/> : loading(t)}

  };

  const renderMenu = () => (
    <div className="flex flex-row gap-4">
      <Button variant="outline" className="gap-4 p-4" onClick={() => setMode(Mode.FILES)}
      >
        <FilesQueueIcon/>
        {t("app.content.files")}
      </Button>
      <Button variant="outline" className="gap-4 p-4" onClick={() => setMode(Mode.BLOCKS)}
      >
        <ThumbnailsSmallIcon/>
        {t("app.content.blocks")}
      </Button>
    </div>
  );

  const renderFilesList = () => (
    <div>files</div>
  );

  const renderBlocksList = () => (
    <div>blocks</div>
  );


  return data?.user ? (
    <ContextProviders>
      <div className="flex flex-col gap-4 w-full p-4">
        <div className="text-xl font-bold">{t("app.content.plural")}</div>
        <div className="w-full">
          <Tabs>
            <TabList>
              <Tab>{t("app.content.files")}</Tab>
              <Tab>{t("app.content.blocks")}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ContentFilesList onAction={listAction}/>
              </TabPanel>
              <TabPanel>
                <ContentBlocksList onAction={listAction}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </ContextProviders>
  ) : null;
};

export default ContentsManager;
