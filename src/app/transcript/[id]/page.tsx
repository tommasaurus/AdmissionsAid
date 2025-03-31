"use client";

import { Suspense } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock data - will be replaced with actual data fetching
const mockTranscript = {
  id: "1",
  studentName: "John Doe",
  schoolName: "High School A",
  rawGPA: 3.8,
  normalizedGPA: 4.0,
  terms: [
    {
      id: "t1",
      name: "Fall 2023",
      courses: [
        {
          id: "c1",
          name: "AP Calculus BC",
          category: "Math",
          credits: 1,
          grade: "A",
          gradeValue: 4.0,
          normalizedValue: 4.3,
          weight: 1.1,
          confidence: 0.98,
        },
        // Add more courses as needed
      ],
      termGPA: 4.0,
    },
  ],
  status: "complete" as const,
  uploadDate: "2024-03-30",
  originalFile: "transcript1.pdf",
  confidence: 0.95,
};

export default function TranscriptDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="space-y-6">
          {/* Student Header */}
          <section className="bg-white shadow-sm rounded-lg">
            <Suspense
              fallback={
                <div className="h-[120px] animate-pulse bg-gray-100 rounded-lg" />
              }
            >
              <StudentHeader transcript={mockTranscript} />
            </Suspense>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transcript Viewer */}
            <section className="bg-white shadow-sm rounded-lg">
              <Suspense
                fallback={
                  <div className="h-[600px] animate-pulse bg-gray-100 rounded-lg" />
                }
              >
                <TranscriptViewer transcript={mockTranscript} />
              </Suspense>
            </section>

            {/* Normalization Panel */}
            <section className="bg-white shadow-sm rounded-lg">
              <Suspense
                fallback={
                  <div className="h-[600px] animate-pulse bg-gray-100 rounded-lg" />
                }
              >
                <NormalizationPanel transcript={mockTranscript} />
              </Suspense>
            </section>
          </div>

          {/* Course Table */}
          <section className="bg-white shadow-sm rounded-lg">
            <Suspense
              fallback={
                <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
              }
            >
              <CourseTable transcript={mockTranscript} />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
