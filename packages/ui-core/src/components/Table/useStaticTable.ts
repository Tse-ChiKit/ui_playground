import { useMemo, useState } from "react";
import { Column, SortOrder } from "./types";

export function useStaticTable<T>(
  data: T[],
  columns: Column<T>[],
  options?: {
    isPaginated?: boolean;
    defaultPageSize?: number;
  }
) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(options?.defaultPageSize || 10);
  const [sortBy, setSortBy] = useState<string>();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sorted = useMemo(() => {
    if (!sortBy) return data;

    const column = columns.find((col) => col.key === sortBy);
    if (!column) return data;

    const baseCompare = column.sortFn
      ? column.sortFn
      : (a: T, b: T) => {
          const aVal = a[sortBy as keyof T];
          const bVal = b[sortBy as keyof T];
          if (aVal < bVal) return -1;
          if (aVal > bVal) return 1;
          return 0;
        };

    const sorted = [...data].sort(baseCompare);
    return sortOrder === "asc" ? sorted : sorted.reverse();
  }, [data, sortBy, sortOrder, columns]);

  const paginated = useMemo(() => {
    if (!options?.isPaginated) return sorted;
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize, options?.isPaginated]);

  return {
    data: paginated,
    total: data.length,
    isLoading: false,
    page,
    pageSize,
    setPage,
    sortBy,
    sortOrder,
    setSort: (key: string, order: SortOrder) => {
      setSortBy(key);
      setSortOrder(order);
      setPage(1); // Reset page on sort change
    },
  };
}
