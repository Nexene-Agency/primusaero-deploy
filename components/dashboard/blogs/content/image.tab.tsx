import { getClientTranslator } from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import { Button, FormControl } from "@chakra-ui/react";
import React, { useState } from "react";
import PictureSelectorPopup from "@components/dashboard/pictures/picture.selector.popup";
import { Command, openPopupCommand } from "@framework/events";

const ImageTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });
  const [popupCommand, setPopupCommand] = useState<Command>();

  const pictureSelectorAction = (data?: {
    images: string[];
    previews: string[];
  }) => {
    console.log("selected pics", data);
  };

  const showPopup = () => {
    setPopupCommand(openPopupCommand());
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        {/*<FormControl className="w-full">*/}
        {/*  <Text*/}
        {/*    id={`mde-${getValues("id")}`}*/}
        {/*    originalText={getValues("content")}*/}
        {/*    onChange={textChanged}*/}
        {/*  />*/}
        {/*</FormControl>*/}
        <FormControl>
          <Button onClick={showPopup}>{t("app.picture.selectOne")}</Button>
        </FormControl>
      </form>
      <PictureSelectorPopup
        key={popupCommand?.key}
        command={popupCommand}
        onAction={pictureSelectorAction}
      />
    </div>
  );
};

export default ImageTab;
