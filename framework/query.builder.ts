import {limit, orderBy, OrderByDirection, QueryConstraint, startAfter, where, WhereFilterOp,} from "firebase/firestore";

/**
 * @interface QueryParameters
 * @description Defines the parameters which the queries can work from
 * @param limit The maximum number of the returned documents
 * @param order The ordering clauses
 * @param filter The filtering clauses
 * @param startAfter The reference to the document to start the query after
 */
export interface QueryParameters {
  limit: number;
  order: ListOrderClause[];
  filter: ListFilterClause[];
  startAfter?: any;
  fields: string[];
}

/**
 * @interface ListOrderClause
 * @description Defines a list ordering clause
 * @param field The name of the field to order by
 * @param direction The direction of the ordering: asc|desc
 */
export interface ListOrderClause {
  field: string;
  direction: OrderByDirection;
}

/**
 * @interface ListFilterClause
 * @description Defines a list filtering clause
 * @param field The name of the field to filter by
 * @param op The comparison operation
 * @param value The expected value
 */
export interface ListFilterClause {
  field: string;
  op: WhereFilterOp;
  value: any;
}

/** The number of items can be read in one go. */
export const MAX_ITEMS = 1000;
/** The number of items can be read by default. */
export const DEFAULT_ITEMS = 10;

/**
 * @interface FluentQueryBuilder
 * @description A fluent builder for querying the Firestore.
 */
export interface FluentQueryBuilder {
  /**
   * @param value The maximum, number of elements to return
   */
  limit(value: number): FluentQueryBuilder;

  /**
   * @param field The name of the field to sort by
   * @param direction The direction of the sort
   */
  sortBy(field: string, direction: OrderByDirection): FluentQueryBuilder;

  /**
   * @param field The name of the field to filter by
   * @param op The operation
   * @param value The expected value
   */
  filterBy(field: string, op: WhereFilterOp, value: any): FluentQueryBuilder;

  /**
   * @param ref Reference to the document to start after (for "pagination")
   */
  continuing(ref: any): FluentQueryBuilder;

  /**
   * @param fields The list of fields to return
   */
  fieldList(fields: string[]): FluentQueryBuilder;

  /**
   * @return The query parameter object
   */
  build(): QueryParameters;
}

/**
 * @class QueryBuilder
 * @implements FluentQueryBuilder
 * @description The default implementation of the FluentQueryBuilder
 */
export class QueryBuilder implements FluentQueryBuilder {
  private maxHits = 10;
  private order: ListOrderClause[] = [];
  private filter: ListFilterClause[] = [];
  private startAfter?: any;
  private fields: string[] = [];

  /**
   * @inheritDoc
   * Note: limit is 1..MAX_ITEMS, values outside that range will be replaced by the default value of DEFAULT_ITEMS
   */
  public limit(value: number): FluentQueryBuilder {
    this.maxHits = value >= 1 && value <= MAX_ITEMS ? value : DEFAULT_ITEMS;
    return this;
  }

  /**
   * @inheritDoc
   */
  public sortBy(
    field: string,
    direction: OrderByDirection
  ): FluentQueryBuilder {
    this.order.push({ field, direction });
    return this;
  }

  /**
   * @inheritDoc
   */
  public filterBy(
    field: string,
    op: WhereFilterOp,
    value: any
  ): FluentQueryBuilder {
    this.filter.push({ field, op, value });
    return this;
  }

  /**
   * @inheritDoc
   */
  public continuing(ref: any): FluentQueryBuilder {
    this.startAfter = ref;
    return this;
  }

  /**
   * @inheritDoc
   */
  public fieldList(fields: string[]): FluentQueryBuilder {
    this.fields = fields;
    return this;
  }

  /**
   * @inheritDoc
   */
  public build(): QueryParameters {
    return {
      limit: this.maxHits,
      order: this.order,
      filter: this.filter,
      startAfter: this.startAfter,
    } as QueryParameters;
  }
}

/**
 * Convenience factory for creating a new instance of the QueryBuilder.
 */
export const queryBuilder = () => new QueryBuilder();
/**
 * Generates a query returning documents without filtering.
 * @param sortBy The name of the field to sort by, default is "name"
 * @param limit The maximum number of documents to return, default is 100
 */
export const fullQuery = (
  sortBy: string = "name",
  limit: number = 100
): QueryParameters => queryBuilder().sortBy(sortBy, "asc").limit(limit).build();

/**
 * Generates Firebase query constraints from the parameters.
 *
 * @param params The parameters
 * @return The constraints
 */
export const queryFrom = (params: QueryParameters): QueryConstraint[] => {
  const constraints: QueryConstraint[] = [];
  params.filter.forEach((current) => {
    constraints.push(where(current.field, current.op, current.value));
  });
  params.order.forEach((current) => {
    constraints.push(orderBy(current.field, current.direction));
  });
  constraints.push(limit(params.limit));
  if (params.startAfter) {
    constraints.push(startAfter(params.startAfter));
  }
  return constraints;
};
