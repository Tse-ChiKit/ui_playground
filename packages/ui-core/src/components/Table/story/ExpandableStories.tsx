import React from "react";
import { useStaticTable } from "../useStaticTable";
import { Table } from "../Table";
import type { Column } from "../types";
import { compareNumber, compareString } from "../compare";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  joinDate: string;
};

const users: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 20 + (i % 5),
  joinDate: new Date(2023, i % 12, 10).toISOString(),
}));

const columns: Column<User>[] = [
  {
    key: "id",
    header: "ID",
    sortable: true,
    sortFn: (a, b) => compareNumber(a.id, b.id),
    render: (row) => row.id,
  },
  {
    key: "name",
    header: "Name",
    sortable: true,
    sortFn: (a, b) => compareString(a.name, b.name),
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
    sortFn: (a, b) => compareNumber(a.age, b.age),
    render: (row) => row.age,
  },
];

export const ExpandableWithArrowIcon = () => {
  const table = useStaticTable(users, columns, {
    isPaginated: true,
    defaultPageSize: 5,
  });

  return (
    <Table
      columns={columns}
      data={table.data}
      total={table.total}
      isLoading={table.isLoading}
      page={table.page}
      pageSize={table.pageSize}
      onPageChange={table.setPage}
      sortBy={table.sortBy}
      sortOrder={table.sortOrder}
      onSortChange={table.setSort}
      expandable={(row) => (
        <div className="text-sm text-gray-700">
          <strong>Email:</strong> {row.email} <br />
          <strong>Joined:</strong> {new Date(row.joinDate).toLocaleDateString()}
        </div>
      )}
    />
  );
};
