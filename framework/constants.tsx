import PlusIcon from "@/framework/icons/basic/PlusIcon";
import SquareEditIcon from "@/framework/icons/basic/SquareEditIcon";
import BlackboardIcon from "@/framework/icons/basic/BlackboardIcon";
import CopyDuplicateIcon from "@framework/icons/basic/CopyDuplicateIcon";
import ChevronRightIcon from "@framework/icons/basic/ChevronRightIcon";
import {Selectable} from "@framework/model";
import {ListQuery} from "@framework/list/model";

export const ROLES = {
  ADMIN: "admins",
  POWER_USER: "power_users",
  USER: "users",
};

export const LIST_ADD_ITEM: Selectable = {
  id: "add_item",
  name: "operations.add_item",
  icon: <PlusIcon/>,
  filter: ["*"],
};

export const LIST_ITEM_DETAILS: Selectable = {
  id: "item_details",
  name: "operations.item_details",
  icon: <ChevronRightIcon className="__menu-icon"/>,
  filter: ["*"],
};

export const LIST_DUPLICATE_ITEM: Selectable = {
  id: "duplicate_item",
  name: "operations.duplicate_item",
  icon: <CopyDuplicateIcon className="__menu-icon"/>,
  filter: ["*"],
};

export const LIST_EDIT_ITEM: Selectable = {
  id: "edit_item",
  name: "operations.edit_item",
  icon: <SquareEditIcon/>,
  filter: ["*"],
};
export const LIST_EDIT_ITEM_CONTENT: Selectable = {
  id: "edit_item_content",
  name: "operations.edit_item_content",
  icon: <BlackboardIcon className="__menu-icon"/>,
  filter: [ROLES.POWER_USER],
};

export const NEW_ENTRY = "00000000-0000-0000-0000-000000000000";

export const asQueryParams = (listQuery: ListQuery): string => {
  return `skip=${listQuery.skip}&limit=${listQuery.limit}&type=${listQuery.type}&full=${listQuery.full}`;
};

export const REGEX = {
  /** Regular expression to match a name, must be 8-256 characters. */
  PASSWORD: new RegExp("^(.{8,256})$"),
  /** Regular expression to match a human name, must be 1-128 characters. */
  GENERAL_NAME: new RegExp("^(.{1,128})$"),
  /** Regular expression to match a human name, must be 1-128 characters. */
  OPTIONAL_GENERAL_NAME: new RegExp("^(.{0,128})$"),
  /** Regular expression to match a human name, must be 0-128 characters. */
  HUMAN_NAME_OPTIONAL: new RegExp("^(.{0,128})$"),
  /** Regular expression to match a name, must be 5-256 characters. */
  DICT_CODE: new RegExp("^(.{2,12})$"),
  /** Regular expression to match a description, 0-1024 characters. */
  DESCRIPTION: new RegExp("^(.{0,1024})$"),
  /** Regular expression to match an e-mail address. */
  EMAIL: new RegExp("^.+@([?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?))$"),
  /** Regular expression for E.164 phone number. */
  PHONE: new RegExp("^\\+?[1-9]\\d{1,14}$"),
  /** An ISO date. */
  ISO_DATE: new RegExp("^\\d{4}-\\d{2}-\\d{2}$"),
  /** An ISO time. */
  ISO_TIME: new RegExp("^\\d{2}:\\d{2}$"),
  /** Regular expression to match a firebase id. */
  FIREBASE_ID: new RegExp("^(.{20,128})$"),
  /** Regular expression to mach a long mandatory string. */
  LONG_MANDATORY_STRING: new RegExp("^(.{1,1024})$"),
  /** Regular expression to mach a very short mandatory string. */
  MICRO_MANDATORY_STRING: new RegExp("^(.{1,32})$"),
  /** Regular expression to match a locale. */
  LOCALE: new RegExp("^(.{2,10})$"),
};
