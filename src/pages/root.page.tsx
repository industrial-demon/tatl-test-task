import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import {
  ColumnLesson,
  Data,
  MappedStudent,
  Rate,
  Student,
  studentsMapper,
} from "../entities";

import { Cell, Table, useTableModel } from "../widgets/table";

import {
  fetchColumnsLessons,
  fetchRates,
  fetchStudents,
  markRateFetch,
  unMarkRateFetch,
} from "../api";
import SimpleSnackbar from "../widgets/snackbar";
import { useQuerySnackCtx } from "../providers/query-snack-context.provider";

const initColumns: ColumnDef<MappedStudent>[] = [
  {
    id: "rowNumber",
    header: "#",
    accessorFn: (_, idx) => idx + 1,
    cell(props) {
      return props.getValue();
    },
  },
  {
    id: "FirstName",
    header: "Ученик",
    accessorFn: (row) => `${row.LastName} ${row.FirstName} ${row.SecondName}`,
    cell(props) {
      return props.getValue();
    },
  },
];

export const RootPage = () => {
  const { isOpenSnake, closeSnack } = useQuerySnackCtx();
  const queryClient = useQueryClient();

  const [data, setData] = useState<MappedStudent[]>([]);
  const [columns, setColumns] = useState<ColumnDef<MappedStudent>[]>([]);

  const tableModel = useTableModel({
    columns,
    data,
  });

  const studentsQuery = useQuery<Data<Student>>({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const columnsQuery = useQuery<Data<ColumnLesson>>({
    queryKey: ["lessons"],
    queryFn: fetchColumnsLessons,
  });

  const ratesQuery = useQuery<Data<Rate>>({
    queryKey: ["rates"],
    queryFn: fetchRates,
  });

  const markRateMutation = useMutation({
    mutationKey: ["mark-rate"],
    mutationFn: markRateFetch,
  });

  const unMarkRateMutation = useMutation({
    mutationKey: ["un-mark-rate"],
    mutationFn: unMarkRateFetch,
  });

  const markRate = useCallback(
    ({ studentId, columnId }: { studentId: number; columnId: number }) => {
      markRateMutation.mutate(
        { SchoolboyId: studentId, ColumnId: columnId, Title: "H" },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes("rates") ||
                query.queryKey.includes("students"),
            });
          },
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [markRateMutation.mutate, ratesQuery.refetch, studentsQuery.refetch]
  );

  const unMarkRate = useCallback(
    ({ studentId, columnId }: { studentId: number; columnId: number }) => {
      unMarkRateMutation.mutate(
        { SchoolboyId: studentId, ColumnId: columnId },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              predicate: (query) =>
                query.queryKey.includes("rates") ||
                query.queryKey.includes("students"),
            });
          },
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ratesQuery.refetch, studentsQuery.refetch, unMarkRateMutation.mutate]
  );

  useEffect(() => {
    if (studentsQuery.data && columnsQuery.data && ratesQuery.data) {
      setData(
        studentsMapper(
          studentsQuery.data.Items,
          columnsQuery.data.Items,
          ratesQuery.data.Items
        )
      );

      const lessonsColumns: ColumnDef<MappedStudent>[] =
        columnsQuery.data.Items.map((column) => ({
          header: `${column.Title}`,
          id: `${column.Id}`,
          accessorFn: (row) => row[column.Id],
          cell(props) {
            const value = props.getValue();
            return (
              <Cell
                onClick={() => {
                  value === "H"
                    ? unMarkRate({
                        studentId: props.row.original.Id,
                        columnId: column.Id,
                      })
                    : markRate({
                        studentId: props.row.original.Id,
                        columnId: column.Id,
                      });
                }}
              >
                {value as string}
              </Cell>
            );
          },
        }));

      const updatedCol = initColumns.concat(lessonsColumns);
      setColumns(updatedCol);
    }
  }, [
    studentsQuery.data,
    columnsQuery.data,
    ratesQuery.data,
    unMarkRate,
    markRate,
  ]);

  console.log(markRateMutation);

  return (
    <div>
      <Table<MappedStudent> model={tableModel} />
      <SimpleSnackbar open={isOpenSnake} onClose={closeSnack} />
    </div>
  );
};
