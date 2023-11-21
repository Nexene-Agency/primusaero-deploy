import {ReactElement} from "react";
import {FieldErrors} from "react-hook-form";

/**
 * @interface Selectable
 * @description Defines a selectable element (for menu, dropdown, etc.)
 *
 * @param id The identifier
 * @param name The token for the name
 * @param target The target of the element
 * @param icon The icon to display
 * @param filter Values to base the filtering on
 * @param disabled Whether the element should be displayed as disabled or not
 */
export interface Selectable {
  id: string;
  name: string;
  target?: string;
  icon?: ReactElement;
  filter?: string[];
  disabled?: boolean;
  context?: any;
  children?: Selectable[];
}

export enum ENVIRONMENT_KEYS {
  CURRENT_LANGUAGE = "CURRENT_LANGUAGE",
  CURRENT_LOCALE = "CURRENT_LOCALE",
  CURRENT_USER = "CURRENT_USER",
  CURRENT_TOKEN = "CURRENT_TOKEN",
  CURRENT_ROLES = "CURRENT_ROLES",
  CURRENT_LIST_SIZE = "CURRENT_LIST_SIZE",
}

export interface FormState<T> {
  isValid: boolean;
  isDirty: boolean;
  errors?: FieldErrors;
  data?: T;
}
