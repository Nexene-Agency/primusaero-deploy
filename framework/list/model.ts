"use client";

export interface ListQuery {
  skip: number;
  limit: number;
  type: string;
  full: boolean;
}

export interface QueryBuilder {
  skipping(value: number): QueryBuilder;

  limited(value: number): QueryBuilder;

  ofType(value: string): QueryBuilder;

  withParams(): QueryBuilder;

  build(): ListQuery;
}

export interface QueryResult<T> {
  data: T[];
  found: number;
  query: ListQuery;
  error?: string;
}
