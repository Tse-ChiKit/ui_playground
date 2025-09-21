import type { Column } from "../types";
import { compareNumber, compareString } from "../compare";

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  joinDate: string;
};

export const users: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  age: 20 + (i % 5),
  joinDate: new Date(2023, i % 12, 10).toISOString(),
}));

export const columns: Column<User>[] = [
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
