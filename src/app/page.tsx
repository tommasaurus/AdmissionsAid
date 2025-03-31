"use client";

import {
  ArrowUpTrayIcon,
  QueueListIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const scrollToContent = () => {
    const contentSection = document.getElementById("dashboard-content");
    contentSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = (files: FileList) => {
    // Here you can handle the uploaded files
    console.log("Files uploaded:", files);
    // Add your file processing logic here
    Array.from(files).forEach((file) => {
      console.log("File:", file.name, file.type, file.size);
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
        <BackgroundPaths
          title="AdmissionsAid"
          onFileUpload={handleFileUpload}
        />
      </div>

      {/* Dashboard Content */}
      <main
        id="dashboard-content"
        className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Transcript Dashboard
            </h2>
          </div>

          {/* Upload Zone */}
          <section className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <ArrowUpTrayIcon className="w-6 h-6 text-gray-400" />
                Upload Transcripts
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="h-[180px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-4 transition-colors hover:border-gray-400">
                <ArrowUpTrayIcon className="w-10 h-10 text-gray-400" />
                <div className="text-center">
                  <p className="text-base font-medium text-gray-700">
                    Drag and drop transcripts here
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    or click to select files
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Queue */}
          <section className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <QueueListIcon className="w-6 h-6 text-gray-400" />
                Processing Queue
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="h-[100px] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
                <p className="text-gray-500 flex items-center gap-2">
                  <QueueListIcon className="w-5 h-5" />
                  No transcripts in queue
                </p>
              </div>
            </div>
          </section>

          {/* Results Table */}
          <section className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <DocumentTextIcon className="w-6 h-6 text-gray-400" />
                Processed Transcripts
              </h2>
            </div>
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-gray-500 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                No transcripts processed yet
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
