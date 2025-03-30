"use client";

import { useState } from "react";
import type { Transcript } from "@/types/transcript";

interface TranscriptViewerProps {
  transcript: Transcript;
}

export default function TranscriptViewer({
  transcript,
}: TranscriptViewerProps) {
  const [activeTab, setActiveTab] = useState<"original" | "extracted">(
    "original"
  );

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("original")}
            className={`
              py-4 px-6 text-sm font-medium border-b-2 flex-1 text-center
              ${
                activeTab === "original"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Original Document
          </button>
          <button
            onClick={() => setActiveTab("extracted")}
            className={`
              py-4 px-6 text-sm font-medium border-b-2 flex-1 text-center
              ${
                activeTab === "extracted"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
            `}
          >
            Extracted Data
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === "original" ? (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            {/* TODO: Implement PDF/Image viewer */}
            <p className="text-gray-500">
              PDF/Image viewer will be implemented here
            </p>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <div className="space-y-6">
              {transcript.terms.map((term) => (
                <div key={term.id} className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {term.name}
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Course
                          </th>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Grade
                          </th>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Credits
                          </th>
                          <th className="text-left text-sm font-medium text-gray-500">
                            Confidence
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {term.courses.map((course) => (
                          <tr key={course.id}>
                            <td className="py-2 text-sm text-gray-900">
                              {course.name}
                            </td>
                            <td className="py-2 text-sm text-gray-900">
                              {course.grade}
                            </td>
                            <td className="py-2 text-sm text-gray-900">
                              {course.credits}
                            </td>
                            <td className="py-2 text-sm text-gray-900">
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      course.confidence >= 0.9
                                        ? "bg-green-500"
                                        : course.confidence >= 0.7
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${course.confidence * 100}%`,
                                    }}
                                  />
                                </div>
                                <span>
                                  {(course.confidence * 100).toFixed(0)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
