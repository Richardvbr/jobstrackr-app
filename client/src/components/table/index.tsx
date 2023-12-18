"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cn from "clsx";

import { Icons } from "@/components";
import styles from "./styles.module.scss";

type TableProps = {
  data: any[];
  columns: any;
  onRowClick?: (obj: any) => void;
  onEditClick?: (obj: any) => void;
  detailsId?: string;
  className?: string;
  initialSortedBy?: string;
  stickyHeader?: boolean;
  sorting?: any;
  setSorting?: any;
  pageSize?: number;
  searchValue?: string;
  setShownResults?: Dispatch<SetStateAction<number | string>>;
};

const Table = ({
  data,
  columns,
  onRowClick,
  onEditClick,
  detailsId,
  className,
  stickyHeader,
  searchValue,
  setShownResults,
}: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  // Set global filter
  useEffect(() => {
    setGlobalFilter(searchValue as string);
    // Allow time to update
    setTimeout(() => {
      const count = table.getRowModel().rows.length;
      // @ts-ignore
      setShownResults(count);
    }, 300);
  }, [searchValue]);

  return (
    <div
      className={cn([styles.table], className, {
        [styles.interactive]: onRowClick,
        [styles.stickyHeader]: stickyHeader,
      })}
    >
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.columnDef.enableSorting && (
                        <span>
                          {{
                            asc: <Icons.SortUp />,
                            desc: <Icons.SortDown />,
                          }[header.column.getIsSorted() as string] ?? (
                            <Icons.Sort />
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: Row<any>) => (
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              className={cn({
                [styles.activeRow]: String(row.original.id) === detailsId,
              })}
            >
              {row.getVisibleCells().map((cell) => (
                // Make "Edit" cell clickable
                <td
                  key={cell.id}
                  onClick={
                    cell.column.columnDef.header === "Edit" && onEditClick
                      ? () => onEditClick(row.original)
                      : undefined
                  }
                  className={cn({
                    [styles.activeCell]:
                      String(cell.column.columnDef.header) === "Edit",
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
