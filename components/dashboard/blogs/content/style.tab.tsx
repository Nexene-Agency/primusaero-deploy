import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { FormControl, Textarea } from "@chakra-ui/react";
import React from "react";

const StyleTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <FormControl className="w-full">
          <Textarea
            id="style"
            {...register("style")}
            bg="white"
            autoFocus={true}
            borderColor={errors.style ? "red !important" : "inherit"}
          />
        </FormControl>
      </form>
    </div>
  );
};

export default StyleTab;
