import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SortOrder } from "./types";

type FetchParams = {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  queryParams?: Record<string, unknown>;
};

export type AsyncTableQueryResult<T> = {
  items: T[];
  total: number;
};

export type UseAsyncTableOptions<T, Raw> = {
  queryKey: readonly unknown[];
  queryFn: (params: FetchParams) => Promise<Raw>;
  transform?: (raw: Raw) => AsyncTableQueryResult<T>;
  defaultPageSize?: number;
  defaultSortBy?: string;
  defaultSortOrder?: SortOrder;
  queryParams?: Record<string, unknown>;
};

export function useAsyncTable<T, Raw>({
  queryKey,
  queryFn,
  transform,
  defaultPageSize = 10,
  defaultSortBy,
  defaultSortOrder = "asc",
  queryParams = {},
}: UseAsyncTableOptions<T, Raw>) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | undefined>(defaultSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);
  const [refreshToken, setRefreshToken] = useState(0);

  const { data, isLoading } = useQuery<AsyncTableQueryResult<T>>({
    queryKey: [
      ...queryKey,
      page,
      defaultPageSize,
      sortBy,
      sortOrder,
      queryParams,
      refreshToken,
    ],
    queryFn: async () => {
      const raw = await queryFn({
        page,
        pageSize: defaultPageSize,
        sortBy,
        sortOrder,
        queryParams,
      });
      return transform ? transform(raw) : (raw as AsyncTableQueryResult<T>);
    },
    placeholderData: (prev) => prev ?? { items: [], total: 0 },
  });

  const refresh = () => setRefreshToken((prev) => prev + 1);

  const setSort = (key: string, order: SortOrder) => {
    setSortBy(key);
    setSortOrder(order);
    setPage(1);
  };

  return {
    data: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    page,
    pageSize: defaultPageSize,
    setPage,
    sortBy,
    sortOrder,
    setSort,
    refresh,
  };
}
