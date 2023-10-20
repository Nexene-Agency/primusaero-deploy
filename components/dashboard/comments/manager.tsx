"use client";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Command } from "@framework/events";
import ContextProviders from "@framework/context/context.providers";
import { loading } from "@components/fragments";

import { getClientTranslator } from "@framework/i18n.client.utils";
import { useSession } from "next-auth/react";
import CommentsList from "./list";

const CommentsManager = (props: any) => {
  const t = getClientTranslator();
  const { data } = useSession();

  const listAction = (command: Command) => {
    // do nothing yet
  };

  return data?.user ? (
    <ContextProviders>
      <VStack align="left" width="100%">
        <Text fontSize="xl" fontWeight="bold">
          {t("app.comment.plural")}
        </Text>
        {data ? <CommentsList onAction={listAction} /> : loading(t)}
      </VStack>
    </ContextProviders>
  ) : null;
};

export default CommentsManager;
