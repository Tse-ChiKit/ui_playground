import { ReactNode } from "react";

export type SortOrder = "asc" | "desc";

export type Column<T> = {
  key: string;
  header: ReactNode;
  sortable?: boolean;
  render: (row: T, index: number) => ReactNode;

  /**
   * Custom compare function (ASC by default).
   * Table will reverse result for DESC.
   */
  sortFn?: (a: T, b: T) => number;
};
