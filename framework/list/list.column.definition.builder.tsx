"use client";
import {
  ColumnClassGetterFunction,
  ColumnGetRowIdFunction,
  ColumnGetterFunction,
  ColumnOperationCheckerFunction,
  defaultClassGetter,
  defaultOperationChecker,
  defaultRowIdGetter,
  ListColumnDefinition,
} from "@framework/list/list.definition";

export class ListColumnDefinitionBuilder<T> {
  private columnDefinition: ListColumnDefinition<T>;

  constructor() {
    this.columnDefinition = {
      name: "?",
      title: "?",
      getValue: () => <>?</>,
      getClass: defaultClassGetter,
      checkOperation: defaultOperationChecker,
      getRowId: defaultRowIdGetter,
    };
  }

  public withName(name: string): ListColumnDefinitionBuilder<T> {
    this.columnDefinition.name = name;
    return this;
  }

  public withTitle(title: string): ListColumnDefinitionBuilder<T> {
    this.columnDefinition.title = title;
    return this;
  }

  public withGetValue(
    getValue: ColumnGetterFunction<T>
  ): ListColumnDefinitionBuilder<T> {
    this.columnDefinition.getValue = getValue;
    return this;
  }

  public withGetClass(
    getClass: ColumnClassGetterFunction<T>
  ): ListColumnDefinitionBuilder<T> {
    this.columnDefinition.getClass = getClass;
    return this;
  }

  public withGetRowId(
    getRowId: ColumnGetRowIdFunction<T>
  ): ListColumnDefinitionBuilder<T> {
    this.columnDefinition.getRowId = getRowId;
    return this;
  }

  public withCheckOperation(
    checkOperation: ColumnOperationCheckerFunction<T>
  ): ListColumnDefinitionBuilder<T> {
    this.columnDefinition.checkOperation = checkOperation;
    return this;
  }

  public build(): ListColumnDefinition<T> {
    return this.columnDefinition;
  }
}
