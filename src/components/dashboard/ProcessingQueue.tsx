"use client";

import {
  DocumentIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import type { TranscriptUpload } from "@/types/transcript";

// Temporary mock data - will be replaced with actual state management
const mockUploads: TranscriptUpload[] = [
  { file: new File([], "transcript1.pdf"), progress: 100, status: "complete" },
  { file: new File([], "transcript2.pdf"), progress: 45, status: "processing" },
  {
    file: new File([], "transcript3.pdf"),
    progress: 0,
    status: "error",
    error: "Failed to process file",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  complete: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
};

const StatusIcon = ({ status }: { status: TranscriptUpload["status"] }) => {
  switch (status) {
    case "complete":
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case "error":
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    default:
      return <DocumentIcon className="w-5 h-5 text-gray-500" />;
  }
};

export default function ProcessingQueue() {
  return (
    <div className="space-y-4">
      {mockUploads.map((upload, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-sm"
        >
          <StatusIcon status={upload.status} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 truncate">
                {upload.file.name}
              </p>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[upload.status]
                }`}
              >
                {upload.status}
              </span>
            </div>

            {upload.status === "processing" && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            )}

            {upload.error && (
              <p className="mt-1 text-xs text-red-600">{upload.error}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
