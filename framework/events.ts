import { ListStatistics } from "@/framework/list/list.definition";
import { filter, Subject } from "rxjs";
import { Selectable } from "@framework/model";
import { CreateToastFnReturn } from "@chakra-ui/react";

export const showToast = (toast: CreateToastFnReturn, event: AppEvent) => {
  if (event.type !== AppEventType.TOAST) {
    return;
  }
  const payload = event.payload as MessagePayload;
  toast({
    title: payload.title,
    description: payload.message ?? undefined,
    status: payload.type,
    duration: parseInt(process.env.NEXT_PUBLIC_TOAST_DELAY ?? "5000"),
    isClosable: payload.closable,
  });
};

export enum AppEventType {
  TOAST,
  GOTO,
  LANGUAGE,
  COMMAND,
  LOGGED_OUT,
  LOGGED_IN,
}

export interface AppEvent {
  type: AppEventType;
  payload: unknown;
}

export interface MessagePayload {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  payload?: unknown;
  closable: boolean;
}

export const asError = (
  title: string,
  message: string,
  error?: unknown
): AppEvent => {
  return {
    type: AppEventType.TOAST,
    payload: {
      type: "error",
      title,
      message,
      payload: error,
      closable: true,
    } as MessagePayload,
  };
};

export const asWarning = (
  title: string,
  message: string,
  details?: unknown
): AppEvent => {
  return {
    type: AppEventType.TOAST,
    payload: {
      type: "warning",
      title,
      message,
      payload: details,
      closable: true,
    } as MessagePayload,
  };
};

export const asInfo = (
  title: string,
  message: string,
  details?: unknown
): AppEvent => {
  return {
    type: AppEventType.TOAST,
    payload: {
      type: "info",
      title,
      message,
      payload: details,
      closable: true,
    } as MessagePayload,
  };
};

export const asSuccess = (
  title: string,
  message: string,
  details?: unknown
): AppEvent => {
  return {
    type: AppEventType.TOAST,
    payload: {
      type: "success",
      title,
      message,
      payload: details,
      closable: true,
    } as MessagePayload,
  };
};

export interface GotoPayload {
  target: string;
  query?: unknown;
}

export const asGoto = (target: string, query?: unknown): AppEvent => {
  return {
    type: AppEventType.GOTO,
    payload: {
      target,
      query,
    } as GotoPayload,
  };
};

export interface LoggedOutPayload {
  nextPage?: string;
}

export const loggedOut = (payload?: LoggedOutPayload): AppEvent => {
  return {
    type: AppEventType.LOGGED_OUT,
    payload,
  };
};
export const asLanguageChange = (language: string): AppEvent => {
  return {
    type: AppEventType.LANGUAGE,
    payload: language,
  };
};

export enum AppCommandType {
  OPEN_POPUP,
  CLOSE_POPUP,
  SAVE_OBJECT,
  RELOAD_LIST,
  LIST_ROW_ACTION,
  DISABLE_OPERATIONS,
  LIST_OPERATION,
  LIST_RELOADED,
  ITEM_EDITED,
  SHOW_PROGRESS,
  HIDE_PROGRESS,
  ITEMS_SELECTED,
}

export interface CommandPayload {
  command: AppCommandType;
  sender: string;
  target: string;
  payload?: unknown;
}

export interface Command {
  key: number;
  command: AppCommandType;
  payload?: unknown;
}

export const asCommand = (
  command: AppCommandType,
  payload?: unknown
): Command => {
  return {
    key: Math.floor(new Date().getTime() + Math.random() * 1000),
    command,
    payload,
  };
};

export const listOperationCommand = (operation: Selectable): Command => {
  return asCommand(AppCommandType.LIST_OPERATION, operation);
};

export const itemsSelectedCommand = (payload?: any): Command => {
  return asCommand(AppCommandType.ITEMS_SELECTED, payload);
};

export const openPopupCommand = (payload?: unknown): Command => {
  return asCommand(AppCommandType.OPEN_POPUP, payload);
};

export const listRowActionCommand = (action: Selectable, row: any): Command => {
  return asCommand(AppCommandType.LIST_ROW_ACTION, { action, row });
};

export const listReloadedCommand = (
  sender: string,
  target: string,
  offset: number,
  totalItems: number,
  pageSize: number
): CommandPayload => ({
  command: AppCommandType.LIST_RELOADED,
  sender,
  target,
  payload: { offset, totalItems, pageSize } as ListStatistics,
});

export const disableOperationsCommand = (
  sender: string,
  target: string,
  disabledOperations: string[]
): CommandPayload => ({
  command: AppCommandType.DISABLE_OPERATIONS,
  sender,
  target,
  payload: disabledOperations,
});

export const reloadListCommand = (
  sender: string,
  target: string,
  page?: number,
  pageSize?: number
): CommandPayload => ({
  command: AppCommandType.RELOAD_LIST,
  sender,
  target,
  payload: page !== undefined ? { page, pageSize } : undefined,
});

export const closePopupCommand = (): Command => {
  return asCommand(AppCommandType.CLOSE_POPUP);
};

export const itemEditedCommand = (payload: unknown): Command => {
  return asCommand(AppCommandType.ITEM_EDITED, payload);
};

export const listReloadCommand = (): Command => {
  return asCommand(AppCommandType.RELOAD_LIST);
};

export const showProgressCommand = (): CommandPayload => ({
  command: AppCommandType.SHOW_PROGRESS,
  sender: "",
  target: "__saveProgress",
});

export const hideProgressCommand = (): CommandPayload => ({
  command: AppCommandType.HIDE_PROGRESS,
  sender: "",
  target: "__saveProgress",
});
export const commandEventsOnly = (
  eventBus: Subject<AppEvent>,
  target: string
) => {
  return eventBus
    .pipe(filter((e) => e.type === AppEventType.COMMAND))
    .pipe(filter((e) => (e.payload as CommandPayload).target === target));
};
