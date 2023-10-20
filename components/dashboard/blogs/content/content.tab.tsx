import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl } from "@chakra-ui/react";
import React from "react";
import MarkdownEditor from "@framework/components/markdown.editor";

const ContentTab = (props: any) => {
  const t = getClientTranslator();
  const { setValue, getValues } = useFormContext();
  // const { errors, isDirty, isValid } = useFormState({ control });

  const textChanged = (value: string) => {
    setValue("content", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <FormControl className="w-full">
          <MarkdownEditor
            id={`mde-${getValues("id")}`}
            originalText={getValues("content")}
            onChange={textChanged}
          />
        </FormControl>
      </form>
    </div>
  );
};

export default ContentTab;
