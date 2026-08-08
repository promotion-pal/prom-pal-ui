import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import React, { ReactNode } from "react";
import { cn } from "../lib/utils";

interface Column<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (item: T) => ReactNode;
}
interface UniversalTableProps<T> {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  footer?: {
    colSpan: number;
    label: string;
    value: string;
  };
  className?: string;
}
export function CommonTable<T extends Record<string, any>>({
  data,
  columns,
  caption,
  footer,
  className,
}: UniversalTableProps<T>) {
  const getValue = (item: T, key: keyof T | string): ReactNode => {
    if (typeof key === "string" && key.includes(".")) {
      const value = key.split(".").reduce((obj, k) => obj?.[k], item);
      if (value === null || value === undefined) {
        return null;
      }
      if (typeof value === "object" && !React.isValidElement(value)) {
        return JSON.stringify(value);
      }
      return value as ReactNode;
    }

    const value = item[key as keyof T];
    if (value === null || value === undefined) {
      return null;
    }
    if (typeof value === "object" && !React.isValidElement(value)) {
      return JSON.stringify(value);
    }
    return value as ReactNode;
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className={cn("w-full scroll-hidden mb-5", className)}>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader className="border-none">
          <TableRow className="border-none hover:bg-transparent">
            {columns.map((col, index) => (
              <TableHead
                key={index}
                className={cn("border-none whitespace-nowrap", col.className)}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow className="border-none">
              <TableCell
                colSpan={columns.length}
                className="text-center py-6 border-none"
              >
                Нет данных
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-none hover:bg-gray-50/50"
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn(
                      "border-none break-words whitespace-normal max-w-[200px]",
                      col.className,
                    )}
                  >
                    {col.render ? col.render(item) : getValue(item, col.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>

        {footer && (
          <TableFooter className="border-none">
            <TableRow className="border-none">
              <TableCell colSpan={footer.colSpan} className="border-none">
                {footer.label}
              </TableCell>
              <TableCell className="text-right border-none">
                {footer.value}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
