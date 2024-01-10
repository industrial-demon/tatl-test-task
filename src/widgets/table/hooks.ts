import {
  TableOptions,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const useTableModel = <TData>({
  data,
  columns,
  ...options
}: Pick<TableOptions<TData>, "data" | "columns" | "state">) => {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...options,
  });
};
