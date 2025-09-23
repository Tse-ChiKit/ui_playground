import React from "react";
import { Table } from "../Table";
import { useAsyncTable } from "../useAsyncTable";
import { api } from "../../../utils/axios";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { User } from "./mockdata";

type BackendResponse = {
  status: boolean;
  message?: string;
  data: {
    records: User[];
    total: number;
  };
  total: number;
  current: number;
  pages: number;
  size: number;
};

// ✅ Move this up
const AsyncRemoteTableComponent = () => {
  const table = useAsyncTable<User, BackendResponse>({
    queryKey: ["users"],
    queryFn: async ({ page, pageSize, sortBy, sortOrder, queryParams }) => {
      const res = await api.get<BackendResponse>("/users", {
        params: {
          page,
          size: pageSize,
          sortBy,
          sortOrder,
          ...queryParams,
        },
      });
      return res.data;
    },
    transform: (res) => ({
      items: res.data.records,
      total: res.total,
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
        {
          key: "email",
          header: "Email",
          render: (row) => row.email,
        },
        {
          key: "age",
          header: "Age",
          sortable: true,
          render: (row) => row.age,
        },
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

// ✅ Then declare Storybook metadata
export default {
  title: "Components/Table/Async",
  component: Table,
} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

// ✅ Now it will work correctly
export const AsyncRemoteTable: Story = {
  render: () => <AsyncRemoteTableComponent />,
};
