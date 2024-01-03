import {CONTENT_FILE_BLOCK_SCHEMA, ContentFileBlock} from "@components/dashboard/contents/model";
import {getClientTranslator} from "@framework/i18n.client.utils";
import {useForm, useFormState} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import React, {useState} from "react";
import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {ignorePromise} from "@framework/utils";
import PlusIcon from "@framework/icons/basic/PlusIcon";
import BinIcon from "@framework/icons/basic/BinIcon";
import {useEventContext} from "@framework/context/providers";
import {AppEventType, asEvent} from "@framework/events";

export type ContainerPropertiesEditorProps = {
  block: ContentFileBlock;
}

const ContainerPropertiesEditor = (props: ContainerPropertiesEditorProps) => {
  const t = getClientTranslator();
  const [block] = useState<ContentFileBlock>(props.block);
  const {eventBus, sendEvent} = useEventContext();

  const baseForm = useForm({
    defaultValues: {
      ...block
    },
    resolver: joiResolver(CONTENT_FILE_BLOCK_SCHEMA),
    mode: "onChange",
  });
  const {control, reset, getValues, register, setValue, trigger, watch} = baseForm;
  const {errors, isDirty, isValid} = useFormState({control});

  const getCssPartError = (part: string) => {
    const cssParts = Reflect.get(errors, "cssParts");
    return cssParts ? cssParts[part] : false;
  };

  const revert = () => {
    reset(block);
    ignorePromise(trigger());
  };

  const save = () => {
    sendEvent(asEvent(AppEventType.SAVE_BLOCK, getValues() as ContentFileBlock));
  };

  const addChild = () => {
    sendEvent(asEvent(AppEventType.ADD_CHILD, block));
  };

  const deleteBlock = () => {
    sendEvent(asEvent(AppEventType.DELETE_BLOCK, block));
  };

  const debug = () => {
    console.log("values", getValues());
    console.log("errors", errors);
    console.log("isValid", isValid);
    console.log("isDirty", isDirty);
  };

  return (
    <div className="flex flex-col gap-4 py-4 w-full">
      <div className="text-xl font-bold">{t("app.content.block.container")} {getValues("name")}</div>
      <div className="flex flex-row gap-4 items-center">
        <Button size="sm" variant="outline" title={t("app.content.block.addChild")} onClick={addChild}>
          <PlusIcon className="h-4 w-4"/>
        </Button>
        <Button size="sm" variant="outline" title={t("app.content.block.delete")} onClick={deleteBlock}>
          <BinIcon className="h-4 w-4"/>
        </Button>
      </div>
      <FormControl>
        <FormLabel>{t("app.fields.name")}</FormLabel>
        <Input
          id="name"
          placeholder={t("app.fields.name")!}
          bg="white"
          {...register("name")}
          autoFocus={true}
          borderColor={errors.name ? "red" : "inherit"}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{t("app.content.block.containerClass")}</FormLabel>
        <Input
          id="name"
          placeholder={t("app.content.block.containerClass")}
          bg="white"
          {...register("cssParts.containerClass")}
          borderColor={getCssPartError("containerClass") ? "red" : "inherit"}
        />
      </FormControl>
      <div className="flex flex-row justify-end gap-4">
        <Button variant="outline" colorScheme="black" onClick={debug}>
          debug
        </Button>
        <Button variant="outline" colorScheme="black" onClick={revert}>
          {t("app.actions.revert")}
        </Button>
        <Button variant="outline" colorScheme="green" isDisabled={!isDirty || !isValid} onClick={save}>
          {t("app.actions.apply")}
        </Button>
      </div>
    </div>
  );

};

export default ContainerPropertiesEditor;