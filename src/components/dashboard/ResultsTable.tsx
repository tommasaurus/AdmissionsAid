"use client";

import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Transcript } from "@/types/transcript";

// Temporary mock data - will be replaced with actual data fetching
const mockData: Transcript[] = [
  {
    id: "1",
    studentName: "John Doe",
    schoolName: "High School A",
    rawGPA: 3.8,
    normalizedGPA: 4.0,
    terms: [],
    status: "complete",
    uploadDate: "2024-03-30",
    originalFile: "transcript1.pdf",
    confidence: 0.95,
  },
  // Add more mock data as needed
];

const columnHelper = createColumnHelper<Transcript>();

const columns = [
  columnHelper.accessor("studentName", {
    header: "Student Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("schoolName", {
    header: "School",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rawGPA", {
    header: "Raw GPA",
    cell: (info) => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("normalizedGPA", {
    header: "Normalized GPA",
    cell: (info) => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("confidence", {
    header: "Confidence",
    cell: (info) => `${(info.getValue() * 100).toFixed(0)}%`,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
        ${
          info.getValue() === "complete"
            ? "bg-green-100 text-green-800"
            : info.getValue() === "error"
            ? "bg-red-100 text-red-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

export default function ResultsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data] = useState(() => [...mockData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <ChevronUpIcon className="w-4 h-4" />,
                      desc: <ChevronDownIcon className="w-4 h-4" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                // TODO: Implement navigation to transcript detail page
                console.log("Navigate to transcript:", row.original.id);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No transcripts processed yet
        </div>
      )}
    </div>
  );
}
