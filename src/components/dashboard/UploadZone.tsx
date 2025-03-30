"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import type { TranscriptUpload } from "@/types/transcript";

export default function UploadZone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // TODO: Implement file upload handling
    console.log("Files dropped:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`h-[180px] p-6 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors cursor-pointer
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 bg-white"
        }`}
    >
      <input {...getInputProps()} />
      <CloudArrowUpIcon
        className={`w-12 h-12 mb-4 ${
          isDragActive ? "text-blue-500" : "text-gray-400"
        }`}
      />

      <div className="text-center">
        <p className="text-base font-medium text-gray-700">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop transcript files here"}
        </p>
        <p className="mt-1 text-sm text-gray-500">or click to select files</p>
        <p className="mt-2 text-xs text-gray-400">
          Supports PDF, PNG, and JPEG files
        </p>
      </div>
    </div>
  );
}
