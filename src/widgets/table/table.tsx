import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table as ReactTable, flexRender } from "@tanstack/react-table";
import styled from "@emotion/styled";

const TableRowStyled = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f1f5f9;
  }
  &:nth-of-type(even) {
    background-color: #e2e8f0;
  }
  &:hover {
    background-color: #f3f4f6;
    transition: all 100ms ease-in;
  }
  & > td {
    color: white;
  }
`;

/*

 scroll solution, because pagination backend and frontend task

 look my nest-server https://github.com/industrial-demon/nest-server/blob/main/src/shared/dto/pagination/paginator.ts

 also i create pagination on previos test task, and mobx simplest implementation than that redux
  
 i don't know why developers still use redux, check please 
 classes + DI, similair to angular:
 https://github.com/industrial-demon/bintime-test-task/blob/main/src/root-store.tsx
 https://github.com/industrial-demon/bintime-test-task/blob/main/src/features/pagination.tsx

 good approach always backend endpoints for list entities with limit, offset for pagination
 */

export const Table = <TData,>({ model }: { model: ReactTable<TData> }) => {
  return (
    <Paper sx={{ overflow: "hidden", padding: "20px" }}>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", maxHeight: "calc(100vh - 40px)" }}
      >
        <MuiTable stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {model.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell sx={{ fontWeight: 700 }} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {model.getRowModel().rows.map((row, idx) => (
              <TableRowStyled
                key={`${row.id}-${idx}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} component="th" scope="row">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRowStyled>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
};
