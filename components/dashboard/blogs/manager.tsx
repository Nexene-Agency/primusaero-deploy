import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { DatabaseEntry } from "@framework/firebase.utils";
import { Selectable } from "@framework/model";
import { loading } from "@components/fragments";
import BlogPostsList from "@components/dashboard/blogs/list";
import { LIST_ADD_ITEM } from "@framework/constants";
import { BlogPost } from "@components/dashboard/blogs/model";

import { getClientTranslator } from "@framework/i18n.client.utils";
import { useSession } from "next-auth/react";

const BlogManager = () => {
  const t = getClientTranslator();
  const { data } = useSession();

  const listAction = (action: Selectable, row?: DatabaseEntry<BlogPost>) => {
    if (action.id === LIST_ADD_ITEM.id) {
      console.log("should add new blog post");
    }
  };

  return data?.user ? (
    <VStack align="left" width="100%">
      <Text fontSize="xl" fontWeight="bold">
        {t("app.blog.plural")}
      </Text>
      {data ? <BlogPostsList onAction={listAction} /> : loading(t)}
    </VStack>
  ) : null;
};

export default BlogManager;
