import { useStaticTable } from "../useStaticTable";
import { users, columns } from "./mockdata";
import { Table } from "../Table";

import { type Meta, type StoryObj } from "@storybook/react-vite";

export default {
  title: "Components/Table/Static",
  component: Table,
} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

export const StaticPaginatedTable: Story = {
  render: () => {
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
      />
    );
  },
};

export const ExpandableRowExample: Story = {
  render: () => {
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
            <strong>Joined:</strong>{" "}
            {new Date(row.joinDate).toLocaleDateString()}
          </div>
        )}
      />
    );
  },
};
