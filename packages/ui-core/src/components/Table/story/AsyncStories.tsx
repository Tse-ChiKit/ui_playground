import { useAsyncTable } from "../useAsyncTable";
import { api } from "../../../utils/axios";
import { Table } from "../Table";
import type { User } from "./mockdata";

export const AsyncRemoteTable: React.FC = () => {
  const table = useAsyncTable<User>({
    queryKey: ["users"],
    queryFn: async ({ page, pageSize, sortBy, sortOrder, search }) => {
      const res = await api.get("/users", {
        params: {
          page,
          size: pageSize,
          sortBy,
          sortOrder,
          search,
        },
      });

      const json = res.data;
      return {
        items: json.data.records,
        total: json.total,
      };
    },
    defaultPageSize: 10,
    defaultSortBy: "id",
  });

  return (
    <Table
      columns={[
        {
          key: "id",
          header: "ID",
          sortable: true,
          render: (row) => row.id,
        },
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
