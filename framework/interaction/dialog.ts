import { uuidv4 } from "@firebase/util";

export interface DialogData {
  id: string;
  closeButton: boolean;
  title: string;
  message: string;
  yesCaption?: string;
  noCaption?: string;
  cancelCaption?: string;
  data?: unknown;
  zIndex: number;
}

export enum DialogResult {
  YES,
  NO,
  CANCEL,
  CLOSED,
}

export interface DialogResponse {
  result: DialogResult;
  data?: unknown;
}

export const asDialogResponse = (result: DialogResult, data?: unknown) => {
  return { result, data } as DialogResponse;
};

const DEFAULT_DIALOG_DATA: Partial<DialogData> = {
  closeButton: true,
  title: "TITLE",
  message: "MESSAGE",
  zIndex: 1000,
};

export const createDialog = (data: Partial<DialogData>): DialogData => {
  return {
    ...DEFAULT_DIALOG_DATA,
    ...data,
    id: uuidv4().toString(),
  } as DialogData;
};

export const createYesNoDialog = (
  title: string,
  message: string,
  data?: unknown
): DialogData => {
  return createDialog({
    title,
    message,
    yesCaption: "app.actions.yes",
    noCaption: "app.actions.no",
    data,
  });
};
