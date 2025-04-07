"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

  const handleFileUpload = (files: FileList | null) => {
    setUploadedFiles(files);
    if (files) {
      console.log("Files uploaded:", files);
      Array.from(files).forEach((file) => {
        console.log("File:", file.name, file.type, file.size);
      });
    } else {
      console.log("Files cleared");
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='relative min-h-screen w-full overflow-hidden bg-transparent'>
        <BackgroundPaths
          title='AdmissionsAId'
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
}
