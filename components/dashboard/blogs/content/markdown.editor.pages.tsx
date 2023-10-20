import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import {
  BlockData,
  BLOG_BLOCK_MARKDOWN_SCHEMA,
  BlogBlockMarkdown,
} from "@components/dashboard/blogs/model";
import { getClientTranslator } from "@/framework/i18n.client.utils";
import PropertiesTab from "@components/dashboard/blogs/content/properties.tab";
import ContentTab from "@components/dashboard/blogs/content/content.tab";
import StyleTab from "@components/dashboard/blogs/content/style.tab";

const MarkdownEditorPages = (props: any) => {
  const t = getClientTranslator();
  const [model, setModel] = useState<BlogBlockMarkdown>(props.block);

  const baseForm = useForm({
    defaultValues: {
      ...model,
    },
    resolver: joiResolver(BLOG_BLOCK_MARKDOWN_SCHEMA),
    mode: "onChange",
  });

  const { control, watch, getValues } = baseForm;
  const { errors, isDirty, isValid } = useFormState({ control });
  const changed = watch();

  useEffect(() => {
    props.onChange({
      isValid,
      isDirty,
      errors,
      fields: getValues(),
    } as BlockData);
  }, [changed]);

  const debug = () => {
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("errors", errors);
    console.log("fields", getValues());
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>{t("app.tabs.properties")}</Tab>
          <Tab>{t("app.blog.contentTab")}</Tab>
          <Tab>{t("app.blog.styleTab")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FormProvider {...baseForm}>
              <PropertiesTab />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <ContentTab key={`cttx-${model.id}`} />
            </FormProvider>
          </TabPanel>
          <TabPanel>
            <FormProvider {...baseForm}>
              <StyleTab />
            </FormProvider>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={debug}>debug</Button>
    </>
  );
};

MarkdownEditorPages.propTypes = {
  block: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MarkdownEditorPages;
