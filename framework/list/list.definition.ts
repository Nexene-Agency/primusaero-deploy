import {ValidationMap} from "react";
import PropTypes from "prop-types";
import {SelectableProperty} from "@framework/utils";
import {DatabaseEntry} from "@framework/firebase.utils";
import {Selectable} from "@framework/model";

/**
 * @interface ListHeaderDefinition
 * @description Defines the list header
 * @param operations The operations for the list header
 * @param className The class name(s) to append to the header elements
 * @param printTotal Whether to print the total number of elements or not
 */
export interface ListHeaderDefinition {
  operations: Selectable[];
  className?: string;
  printTotal?: boolean;
  filterDefinitions?: ListFilterDefinition[];
}

/**
 * Schema for the {@code ListHeaderDefinition}.
 */
export const ListHeaderDefinitionProperty: ValidationMap<any> = {
  operations: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)).isRequired,
  className: PropTypes.string,
  printTotal: PropTypes.bool,
};

export type ColumnGetterFunction<T> = (
  column: ListColumnDefinition<T>,
  row: T
) => unknown;
export type ColumnClassGetterFunction<T> = (
  column: ListColumnDefinition<T>,
  row?: T
) => string;
export type ColumnOperationCheckerFunction<T> = (
  operation: Selectable,
  row: T
) => boolean;
export type ColumnGetRowIdFunction<T> = (row: T) => string;

export const defaultRowIdGetter: ColumnGetRowIdFunction<any> = (row: any) =>
  row.id || "";
export const defaultClassGetter: ColumnClassGetterFunction<any> = (
  column: ListColumnDefinition<any>,
  row: any
) => "";
export const defaultOperationChecker: ColumnOperationCheckerFunction<any> = (
  operation: Selectable,
  row: any
) => true;

export interface ListColumnDefinition<T> {
  name: string;
  title: string;
  getValue: ColumnGetterFunction<T>;
  getClass: ColumnClassGetterFunction<T>;
  checkOperation: ColumnOperationCheckerFunction<T>;
  getRowId: ColumnGetRowIdFunction<T>;
}

/**
 * Schema for the {@code ListDefinition}.
 */
export const ListColumnDefinitionProperty: ValidationMap<any> = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  getValue: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  checkOperation: PropTypes.func.isRequired,
  getRowId: PropTypes.func.isRequired,
};

/**
 * @interface ListDefinition
 * @description Defines the list body
 * @param columns The column definitions
 * @param operations The available operations
 * @param getters The special getters, if needed
 * @param columnClassNames The special column class names generator
 */
export interface ListDefinition<T> {
  columns: ListColumnDefinition<T>[];
  operations?: Selectable[];
  detailsAction?: boolean;
}

/**
 * Schema for the {@code ListDefinition}.
 */
export const ListDefinitionProperty: ValidationMap<any> = {
  columns: PropTypes.arrayOf(PropTypes.shape(ListColumnDefinitionProperty))
    .isRequired,
  operations: PropTypes.arrayOf(PropTypes.shape(SelectableProperty)),
};

export interface ListContent<T> {
  data: DatabaseEntry<T>[];
  pageSize: number;
  error?: any;
}

export interface ListStatistics {
  offset: number;
  totalItems: number;
  pageSize: number;
}

export interface PaginatorValues {
  firstRow: number;
  lastRow: number;
  totalPages: number;
  currentPage: number;
  firstButton?: boolean;
  previousButton?: boolean;
  nextButton?: boolean;
  lastButton?: boolean;
  pageNumbers: number[];
}

export interface ListReloadParameters {
  page: number;
  pageSize: number;
}

export interface ListFilterDefinition {
  fieldName: string;
  label: string;
  type: "string" | "number" | "date" | "boolean";
}

export interface ListFilterValue {
  fieldName: string;
  value: unknown;
  type: "string" | "number" | "date" | "boolean";
}

export interface ListSettings {
  pageSize: number;
  showInvalid: boolean;
}

export const asStringFilter = (
  fieldName: string,
  label: string
): ListFilterDefinition => ({
  fieldName,
  label,
  type: "string",
});
