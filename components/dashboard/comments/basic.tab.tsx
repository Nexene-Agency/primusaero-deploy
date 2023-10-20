import {
  getClientTranslator,
  getFormattedDate,
} from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import React from "react";

const BasicTab = (params: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <div className="flex flex-col gap-2 w-full">
          <div className="font-bold">{t("app.comment.postedBy")}</div>
          <div>
            {getValues("userName")} @{" "}
            {getFormattedDate(getValues("when"), "LLL")}
          </div>
          <div className="font-bold">{t("app.comment.parentName")}</div>
          <div>{getValues("parentName")}</div>
          <div className="font-bold">{t("app.comment.text")}</div>
          <div>
            <pre>{getValues("text")}</pre>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicTab;
