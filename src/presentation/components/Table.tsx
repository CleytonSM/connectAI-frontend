import type { ReactNode } from "react";

export type TableColumn<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  rowKey?: (row: T) => string | number;
};

export function Table<T>({ columns, data, className, rowKey }: TableProps<T>) {
  return (
    <div
      className={`overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ${className || ""}`.trim()}
    >
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="border-b font-bold text-base-content/80"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-400 border-b"
              >
                Nenhum dado encontrado
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={rowKey ? rowKey(row) : idx} className="border-b">
                {columns.map((col) => (
                  <td key={String(col.key)} className="border-b">
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
