import React from "react";
import { useAsyncTable } from "../useAsyncTable";
import { api } from "../../../utils/axios";
import { Table } from "../Table";
import type { User } from "./mockdata";

type BackendResponse = {
  status: boolean;
  message?: string;
  data: { records: User[]; total: number };
  total: number;
  current: number;
  pages: number;
  size: number;
};

export const AsyncRemoteTable: React.FC = () => {
  const table = useAsyncTable<User, BackendResponse>({
    queryKey: ["users"],

    // 🔧 Map page -> current (what your API expects)
    queryFn: async ({ page, pageSize, sortBy, sortOrder, queryParams }) => {
      const res = await api.get<BackendResponse>("/users", {
        params: {
          page, // <-- was `page`
          size: pageSize, // ok
          sortBy,
          sortOrder,
          ...queryParams,
        },
      });
      return res.data;
    },

    transform: (res) => ({
      items: res.data.records,
      total: res.total, // your API puts total at root
    }),

    defaultPageSize: 10,
    defaultSortBy: "id",
  });

  return (
    <Table
      columns={[
        { key: "id", header: "ID", sortable: true, render: (row) => row.id },
        {
          key: "name",
          header: "Name",
          sortable: true,
          render: (row) => row.name,
        },
        { key: "email", header: "Email", render: (row) => row.email },
        { key: "age", header: "Age", sortable: true, render: (row) => row.age },
      ]}
      data={table.data}
      total={table.total}
      isLoading={table.isLoading}
      page={table.page}
      pageSize={table.pageSize}
      onPageChange={table.setPage}
      sortBy={table.sortBy}
      sortOrder={table.sortOrder}
      onSortChange={table.setSort}
    />
  );
};
