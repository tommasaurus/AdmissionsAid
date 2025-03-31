"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const handleFileUpload = (files: FileList) => {
    console.log("Files uploaded:", files);
    Array.from(files).forEach((file) => {
      console.log("File:", file.name, file.type, file.size);
    });
  };

  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
        <BackgroundPaths
          title="AdmissionsAid"
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
}
