import {
  getClientTranslator,
  getFormattedDate,
} from "@framework/i18n.client.utils";
import { useFormContext, useFormState } from "react-hook-form";
import { doNothing } from "@framework/utils";
import React from "react";

const HistoryTab = (props: any) => {
  const t = getClientTranslator();
  const { register, control, watch, getValues, setValue } = useFormContext();
  const { errors, isDirty, isValid } = useFormState({ control });

  return (
    <div className="flex flex-col w-full gap-4">
      <form onSubmit={doNothing}>
        <div className="flex flex-col gap-2 w-full">
          <div className="font-bold">{t("app.comment.approved")}</div>
          {getValues("approved") ? (
            <div>
              {getValues("approvedBy")} @{" "}
              {getFormattedDate(getValues("approvedAt"), "LLL")}
            </div>
          ) : (
            <div>n/a</div>
          )}
          <div className="font-bold">{t("app.comment.likes")}</div>
          <div>{Reflect.ownKeys(getValues("likes")).length}</div>
        </div>
      </form>
    </div>
  );
};

export default HistoryTab;
