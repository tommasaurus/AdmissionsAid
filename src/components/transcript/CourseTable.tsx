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
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import type { Transcript, Course } from "@/types/transcript";

interface CourseTableProps {
  transcript: Transcript;
}

const columnHelper = createColumnHelper<Course>();

export default function CourseTable({ transcript }: CourseTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const columns = [
    columnHelper.accessor("name", {
      header: "Course Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("credits", {
      header: "Credits",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("grade", {
      header: "Grade",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gradeValue", {
      header: "Grade Value",
      cell: (info) => info.getValue().toFixed(2),
    }),
    columnHelper.accessor("normalizedValue", {
      header: "Normalized",
      cell: (info) => info.getValue().toFixed(2),
    }),
    columnHelper.accessor("weight", {
      header: "Weight",
      cell: (info) => info.getValue().toFixed(2),
    }),
    columnHelper.accessor("confidence", {
      header: "Confidence",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                info.getValue() >= 0.9
                  ? "bg-green-500"
                  : info.getValue() >= 0.7
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${info.getValue() * 100}%` }}
            />
          </div>
          <span>{(info.getValue() * 100).toFixed(0)}%</span>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <button
          onClick={() => setEditingId(info.row.original.id)}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      ),
    }),
  ];

  // Flatten courses from all terms
  const courses = transcript.terms.flatMap((term) => term.courses);

  const table = useReactTable({
    data: courses,
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
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Course Breakdown
        </h2>
      </div>

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
              className={`hover:bg-gray-50 ${
                editingId === row.original.id ? "bg-blue-50" : ""
              }`}
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

      {courses.length === 0 && (
        <div className="text-center py-12 text-gray-500">No courses found</div>
      )}
    </div>
  );
}
