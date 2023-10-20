"use client";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { AppCommandType, Command } from "@framework/events";
import { Selectable } from "@framework/model";
import { DatabaseEntry } from "@framework/firebase.utils";
import ContextProviders from "@framework/context/context.providers";
import { loading } from "@components/fragments";

import { getClientTranslator } from "@framework/i18n.client.utils";
import { useSession } from "next-auth/react";
import { Article } from "./model";
import ArticlesList from "@components/dashboard/article/list";

const ArticlesManager = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();

  const listAction = (command: Command) => {
    if (command.command === AppCommandType.LIST_ROW_ACTION) {
      const { action, row } = command.payload as {
        action: Selectable;
        row: DatabaseEntry<Article>;
      };
    }
  };

  return data?.user ? (
    <ContextProviders>
      <VStack align="left" width="100%">
        <Text fontSize="xl" fontWeight="bold">
          {t("app.article.plural")}
        </Text>
        {data ? <ArticlesList onAction={listAction} /> : loading(t)}
      </VStack>
    </ContextProviders>
  ) : null;
};

export default ArticlesManager;
