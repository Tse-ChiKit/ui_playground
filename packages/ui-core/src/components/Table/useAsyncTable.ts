import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SortOrder } from "./types";

type FetchParams = {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
};

type AsyncTableQueryResult<T> = {
  items: T[];
  total: number;
};

type UseAsyncTableOptions<T> = {
  queryKey: any[];
  queryFn: (params: FetchParams) => Promise<AsyncTableQueryResult<T>>;
  defaultPageSize?: number;
  defaultSortBy?: string;
  defaultSortOrder?: SortOrder;
  search?: string;
};

export function useAsyncTable<T>({
  queryKey,
  queryFn,
  defaultPageSize = 10,
  defaultSortBy,
  defaultSortOrder = "asc",
  search = "",
}: UseAsyncTableOptions<T>) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | undefined>(defaultSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);
  const [refreshToken, setRefreshToken] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: [
      ...queryKey,
      page,
      defaultPageSize,
      sortBy,
      sortOrder,
      search,
      refreshToken,
    ],
    queryFn: () =>
      queryFn({
        page,
        pageSize: defaultPageSize,
        sortBy,
        sortOrder,
        search,
      }),
    placeholderData: (previousData) => previousData ?? { items: [], total: 0 },
  });

  const refresh = () => setRefreshToken((prev) => prev + 1);

  const setSort = (key: string, order: SortOrder) => {
    setSortBy(key);
    setSortOrder(order);
    setPage(1); // Reset to page 1 on sort
  };

  return {
    data: data?.items || [],
    total: data?.total || 0,
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
