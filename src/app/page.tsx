"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
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
    </div>
  );
}
