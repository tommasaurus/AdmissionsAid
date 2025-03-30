"use client";

import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import type { Transcript } from "@/types/transcript";

interface StudentHeaderProps {
  transcript: Transcript;
}

export default function StudentHeader({ transcript }: StudentHeaderProps) {
  const gpaChange = transcript.normalizedGPA - transcript.rawGPA;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {transcript.studentName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{transcript.schoolName}</p>
        </div>

        <div className="flex items-center gap-6">
          {/* Raw GPA */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Raw GPA</p>
            <p className="text-2xl font-bold text-gray-900">
              {transcript.rawGPA.toFixed(2)}
            </p>
          </div>

          {/* GPA Change Indicator */}
          <div className="flex items-center">
            {gpaChange > 0 ? (
              <ArrowUpIcon className="w-5 h-5 text-green-500" />
            ) : gpaChange < 0 ? (
              <ArrowDownIcon className="w-5 h-5 text-red-500" />
            ) : null}
          </div>

          {/* Normalized GPA */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Normalized GPA</p>
            <p className="text-2xl font-bold text-gray-900">
              {transcript.normalizedGPA.toFixed(2)}
            </p>
          </div>

          {/* Confidence Score */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Confidence</p>
            <p className="text-2xl font-bold text-gray-900">
              {(transcript.confidence * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Additional metadata */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <span>
          Uploaded: {new Date(transcript.uploadDate).toLocaleDateString()}
        </span>
        <span>•</span>
        <span>File: {transcript.originalFile}</span>
        <span>•</span>
        <span
          className={`capitalize ${
            transcript.status === "complete"
              ? "text-green-600"
              : transcript.status === "error"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          Status: {transcript.status}
        </span>
      </div>
    </div>
  );
}
