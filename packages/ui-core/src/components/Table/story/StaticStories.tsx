import { useStaticTable } from "../useStaticTable";
import { users, columns } from "./mockdata";
import { Table } from "../Table";

export const StaticPaginatedTable: React.FC = () => {
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
};

export const ExpandableRowExample: React.FC = () => {
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
