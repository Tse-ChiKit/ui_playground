import React, { Fragment, useState } from "react";
import { Column, SortOrder } from "./types";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  total: number;
  isLoading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  sortBy?: string;
  sortOrder?: SortOrder;
  onSortChange?: (key: string, order: SortOrder) => void;
  expandable?: (row: T) => React.ReactNode;
}

export function Table<T>({
  columns,
  data,
  total,
  isLoading,
  page,
  pageSize,
  onPageChange,
  sortBy,
  sortOrder,
  onSortChange,
  expandable,
}: TableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const copy = new Set(prev);
      if (copy.has(index)) {
        copy.delete(index);
      } else {
        copy.add(index);
      }
      return copy;
    });
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="ui-table">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {expandable && <th className="px-2 py-2 w-8"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2 border-b ${
                  col.sortable ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (!col.sortable || !onSortChange) return;
                  const nextOrder: SortOrder =
                    sortBy === col.key && sortOrder === "asc" ? "desc" : "asc";
                  onSortChange(col.key, nextOrder);
                }}
              >
                {col.header}
                {col.sortable && sortBy === col.key && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length + (expandable ? 1 : 0)}
                className="text-center py-4"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (expandable ? 1 : 0)}
                className="text-center py-4"
              >
                No data
              </td>
            </tr>
          ) : (
            data.map((row, i) => {
              const isExpanded = expandedRows.has(i);
              return (
                <Fragment key={i}>
                  <tr className="border-t">
                    {expandable && (
                      <td className="text-center px-2 py-2 align-middle">
                        <button
                          className="text-sm text-gray-600"
                          onClick={() => toggleRow(i)}
                        >
                          {isExpanded ? "▲" : "▼"}
                        </button>
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-2 border-b">
                        {col.render(row, i)}
                      </td>
                    ))}
                  </tr>
                  {expandable && isExpanded && (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="bg-gray-50 px-4 py-2"
                      >
                        {expandable(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages} ({total} items)
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
