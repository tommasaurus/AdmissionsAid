"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowUpTrayIcon,
  DocumentIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { GlowEffect } from "@/components/ui/glow-effect";
import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 1400"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  onFileUpload,
}: {
  title?: string;
  onFileUpload?: (files: FileList) => void;
}) {
  const words = title.split(" ");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showDocumentSection, setShowDocumentSection] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentSectionRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      createFileUrl(file);
      onFileUpload?.(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      createFileUrl(file);
      onFileUpload?.(e.target.files);
    }
  };

  const createFileUrl = (file: File) => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const scrollDown = () => {
    setShowDocumentSection(true);
    setIsAnalyzing(true);

    // Start analysis timer
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }, 3000);

    // Wait for state update to render the section before scrolling
    setTimeout(() => {
      documentSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 500); // Increased timeout further to ensure rendering
  };

  useEffect(() => {
    if (uploadedFile && isAnalyzing) {
      setShowDocumentSection(true);
    }
  }, [uploadedFile]);

  // Determine file type
  const getFileType = () => {
    if (!uploadedFile) return null;
    const name = uploadedFile.name.toLowerCase();
    if (name.endsWith(".pdf")) return "pdf";
    if (name.endsWith(".doc") || name.endsWith(".docx")) return "doc";
    if (
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".png")
    )
      return "image";
    return "other";
  };

  const fileType = getFileType();

  const hardcodedData = {
    student_info: {
      full_name: "Qu, Thomas Shen",
      date_of_birth: "2003-01-07",
      enrollment_date: "2017-04-10",
      graduation_date: "2021-06-11",
    },
    school_info: {
      school_name: "Flint Hill School",
      school_address:
        "3320 Jermantown Road, Oakton, VA 22124-1755, United States",
      ceeb_code: "471648",
      phone: "703-584-2300",
      school_type: "In-State (U.S.)",
    },
    gpas: {
      "9th_grade_weighted": 4.08,
      "10th_grade_weighted": 4.19,
      "11th_grade_weighted": 4.59,
      "12th_grade_weighted": 4.86,
      cumulative_weighted_gpa: 4.43,
      approx_cumulative_unweighted_gpa: 4.01,
    },
  };

  return (
    <div className="relative min-h-[400vh] w-full bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                    dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl font-light text-neutral-600 dark:text-neutral-400 mb-16 max-w-2xl mx-auto"
          >
            Transcript evaluation from hours to seconds
          </motion.p>

          <div className="w-[600px] mx-auto">
            <div className="relative isolate">
              <div
                className={`relative z-10 h-[220px] border-2 ${
                  isDragging ? "border-gray-600" : "border-gray-500"
                } rounded-3xl 
                bg-white dark:bg-black 
                flex flex-col items-center justify-center gap-4 
                shadow-lg hover:shadow-xl cursor-pointer
                [mask-image:linear-gradient(white,white)]`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".pdf,.doc,.docx,.txt"
                  multiple={false}
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center gap-1"
                >
                  {uploadedFile ? (
                    <>
                      <DocumentIcon className="w-8 h-8 text-gray-900 dark:text-white stroke-2" />
                      <div className="flex flex-col justify-center mt-7">
                        <p className="text-2xl font-medium text-gray-900 dark:text-white">
                          {uploadedFile.name}
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          Click to replace
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ArrowUpTrayIcon className="w-8 h-8 text-gray-900 dark:text-white stroke-2" />
                      <p className="text-xl font-medium text-gray-900 dark:text-white">
                        Upload transcript
                      </p>
                    </>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Generate button that appears after file upload */}
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 relative isolate flex justify-center"
              >
                <div className="relative isolate">
                  <GlowEffect
                    colors={[
                      "#FF2D55",
                      "#FF9500",
                      "#FFCC00",
                      "#34C759",
                      "#5856D6",
                      "#AF52DE",
                    ]}
                    mode="colorShift"
                    blur="soft"
                    duration={10}
                    scale={0.98}
                    className="!scale-x-100 rounded-full"
                  />
                  <Button
                    onClick={scrollDown}
                    className="relative z-10 py-2.5 px-8 text-base font-medium bg-white hover:bg-gray-50 text-gray-900 dark:bg-black dark:hover:bg-neutral-900 dark:text-white rounded-full shadow-md transition-all duration-200 border border-gray-300/30 backdrop-blur-sm"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin" />
                        Analyzing Transcript...
                      </div>
                    ) : (
                      "Generate Analysis"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {showAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white rounded-2xl shadow-2xl p-8"
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="student">Student Info</TabsTrigger>
              <TabsTrigger value="school">School Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Admissions Summary</h2>
                <h3 className="text-xl font-semibold mb-3">
                  Academic Overview
                </h3>
                <p className="text-gray-700 mb-4">
                  Thomas Qu has maintained consistently strong academic
                  performance at Flint Hill School (VA), with a clear upward GPA
                  trend each year (weighted GPAs of 4.08, 4.19, 4.59, and 4.86
                  in grades 9–12, culminating in a 4.43 cumulative average). He
                  has taken a rigorous course load, including 10 total AP
                  courses and additional honors/post-AP coursework in
                  mathematics and other disciplines.
                </p>
                <h3 className="text-xl font-semibold mb-3">Strengths</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>
                    Demonstrated excellence in STEM courses, evidenced by strong
                    performance in Precalculus Honors, AP Calculus BC,
                    Multivariable Calculus (Post-AP), and Linear Algebra
                    (Post-AP).
                  </li>
                  <li>
                    Consistent success across English, history, and
                    Spanish—highlighting balanced academic strengths.
                  </li>
                  <li>
                    Upward trend from early high school years through senior
                    year, indicating sustained growth.
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="student">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(hardcodedData.student_info).map(
                  ([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">
                        {key
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </div>
                      <div className="text-lg font-medium">
                        {value || "N/A"}
                      </div>
                    </div>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="school">
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(hardcodedData.school_info).map(
                  ([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">
                        {key
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </div>
                      <div className="text-lg font-medium">{value}</div>
                    </div>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="academic">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">
                    GPA Progression
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(hardcodedData.gpas).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="text-sm text-gray-500 mb-1">
                          {key
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </div>
                        <div className="text-2xl font-semibold text-indigo-600">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}

      {showDocumentSection && (
        <div
          ref={documentSectionRef}
          className="w-full mt-16 pt-16 pb-16 transition-all duration-500"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Document viewer on the left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 relative"
              >
                {/* Enhanced background effect */}
                <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/40 dark:bg-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-white/70 dark:from-gray-800/90 dark:to-neutral-900/70 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 dark:to-gray-800/20 mix-blend-overlay"></div>
                </div>

                <div className="rounded-xl shadow-xl overflow-hidden border border-gray-300/70 dark:border-gray-700/70 backdrop-blur-md h-full ring-1 ring-black/5 dark:ring-white/10">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-neutral-900/95">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <DocumentIcon className="w-5 h-5" />
                      {"Uploaded Transcript"}
                    </h2>
                  </div>
                  <div className="p-5 h-[700px] bg-white/90 dark:bg-neutral-900/90 overflow-hidden">
                    {fileUrl ? (
                      fileType === "pdf" ? (
                        <iframe
                          src={`${fileUrl}#toolbar=0&navpanes=0`}
                          className="w-full h-full rounded border border-gray-200 shadow-inner"
                          title="PDF Preview"
                        />
                      ) : fileType === "image" ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={fileUrl}
                            alt={"Uploaded Transcript"}
                            className="max-w-full max-h-full object-contain drop-shadow-md"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="w-36 h-48 mx-auto rounded bg-gray-100 dark:bg-gray-800 mb-4 flex items-center justify-center shadow-inner">
                              <DocumentIcon className="w-18 h-18 text-gray-400" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                              {fileType === "doc"
                                ? "Word documents cannot be previewed directly"
                                : "This file type cannot be previewed"}
                            </p>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-36 h-48 mx-auto rounded bg-gray-100 dark:bg-gray-800 mb-4 flex items-center justify-center shadow-inner">
                            <DocumentIcon className="w-18 h-18 text-gray-400" />
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Loading document preview...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Analysis results on the right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-1/2 relative"
              >
                {/* Enhanced background effect */}
                <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/40 dark:bg-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-white/70 dark:from-gray-800/90 dark:to-neutral-900/70 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 dark:to-gray-800/20 mix-blend-overlay"></div>
                </div>

                <div className="rounded-xl shadow-xl overflow-hidden border border-gray-300/70 dark:border-gray-700/70 backdrop-blur-md h-full ring-1 ring-black/5 dark:ring-white/10">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-neutral-900/95">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      Transcript Analysis
                    </h2>
                  </div>
                  <div className="p-5 h-[700px] bg-white/90 dark:bg-neutral-900/90">
                    <div className="animate-pulse space-y-5 h-full">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
