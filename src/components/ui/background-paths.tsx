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
import { AutoComplete, type Option } from "@/components/ui/autocomplete";
import {
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { transcriptDataMap, type TranscriptData, AcademicYear, type Course } from "@/data/transcriptData";

// Add scrollbar-hide styles
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}

const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export function BackgroundPaths({
  title = "Background Paths",
  onFileUpload,
}: {
  title?: string;
  onFileUpload?: (files: FileList | null) => void;
}) {
  const words = title.split(" ");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showDocumentSection, setShowDocumentSection] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<Option>();
  const [currentTranscript, setCurrentTranscript] = useState<TranscriptData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentSectionRef = useRef<HTMLDivElement>(null);

  const VIRGINIA_SCHOOLS = [
    {
      value: "flint-hill",
      label: "Flint Hill School",
    },
    {
      value: "tjhsst",
      label: "Thomas Jefferson High School for Science and Technology",
    },
    {
      value: "potomac",
      label: "Potomac School",
    },
    {
      value: "langley",
      label: "Langley High School",
    },
    {
      value: "sidwell",
      label: "Sidwell Friends School",
    },
    {
      value: "oakton",
      label: "Oakton High School",
    },
    {
      value: "south-lakes",
      label: "South Lakes High School",
    },
    {
      value: "westfield",
      label: "Westfield High School",
    },
    {
      value: "madison",
      label: "Madison High School",
    },
  ];

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

  const handleRemoveFile = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setUploadedFile(null);
    setFileUrl(null);
    setShowDocumentSection(false);
    setShowAnalysis(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileUpload?.(null);
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

  // Function to handle transcript selection
  const handleTranscriptSelect = (state: string) => {
    const transcriptData = transcriptDataMap[state];
    setCurrentTranscript(transcriptData);
    setUploadedFile(new File([], `${state}.pdf`));
    setFileUrl(`/transcripts/${state}.pdf`);
    scrollDown();
  };

  return (
    <div className="relative w-full bg-transparent">
      <style>{scrollbarHideStyles}</style>
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold text-center mb-4"
          >
            <span>Admissions</span>
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Ai
            </span>
            <span>d</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl font-light text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto"
          >
            Transcript evaluation from hours to seconds
          </motion.p>

          <div className="w-[600px] mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleTranscriptSelect("virginia")}
                className="relative py-4 px-6 text-lg font-medium bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200 h-auto"
              >
                Virginia
              </Button>
              
                    <Button
                onClick={() => handleTranscriptSelect("texas")}
                className="relative py-4 px-6 text-lg font-medium bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200 h-auto"
              >
                Texas
                    </Button>

              <Button
                onClick={() => handleTranscriptSelect("new-york")}
                className="relative py-4 px-6 text-lg font-medium bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200 h-auto"
              >
                New York
              </Button>

                <Button
                onClick={() => handleTranscriptSelect("connecticut")}
                className="relative py-4 px-6 text-lg font-medium bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200 h-auto"
              >
                Connecticut
                </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {showDocumentSection && (
        <div
          ref={documentSectionRef}
          className="w-full mt-4 pt-4 pb-4 transition-all duration-500 bg-transparent"
        >
          <div className="container mx-auto px-4 max-w-[1600px]">
            <div className="flex flex-col md:flex-row gap-0">
              {/* Document viewer on the left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full md:w-2/5 relative"
              >
                {/* Enhanced background effect */}
                <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/40 dark:bg-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-white/70 dark:from-gray-800/90 dark:to-neutral-900/70"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 dark:to-gray-800/20"></div>
                </div>

                <div className="rounded-xl shadow-xl overflow-hidden border border-gray-300/70 dark:border-gray-700/70 backdrop-blur-md h-full ring-1 ring-black/5 dark:ring-white/10">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-neutral-900/95">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <DocumentIcon className="w-5 h-5" />
                      {"Uploaded Transcript"}
                    </h2>
                  </div>
                  <div className="p-5 h-[750px] bg-white/90 dark:bg-neutral-900/90 overflow-hidden">
                    {fileUrl ? (
                      fileType === "pdf" ? (
                        <iframe
                          src={`${fileUrl}#zoom=page-fit&toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH`}
                          className="w-full h-full rounded border border-gray-200 shadow-inner bg-[#525659]"
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
                transition={{ duration: 0.4 }}
                className="w-full md:w-3/5 relative"
              >
                {/* Enhanced background effect */}
                <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/40 dark:bg-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-white/70 dark:from-gray-800/90 dark:to-neutral-900/70"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 dark:to-gray-800/20"></div>
                </div>

                <div className="rounded-xl shadow-xl overflow-hidden border border-gray-300/70 dark:border-gray-700/70 backdrop-blur-md h-full ring-1 ring-black/5 dark:ring-white/10">
                  <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-neutral-900/95">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      Transcript Analysis - {""}{" "}
                      {currentTranscript?.student_info.full_name || ""}
                    </h2>
                  </div>
                  <div className="p-5 h-[750px] bg-white/90 dark:bg-neutral-900/90">
                    {isAnalyzing ? (
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
                      </div>
                    ) : (
                      showAnalysis && currentTranscript && (
                        <Tabs defaultValue="curriculum" className="w-full">
                          <TabsList className="grid w-full grid-cols-5 mb-4">
                            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                            <TabsTrigger value="courses">Details</TabsTrigger>
                            <TabsTrigger value="patterns">Patterns</TabsTrigger>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="info">Info</TabsTrigger>
                          </TabsList>

                          <TabsContent value="curriculum" className="mt-0">
                            <div className="space-y-6 h-[650px] overflow-y-auto pr-2 scrollbar-hide">
                              <div className="bg-white/50 dark:bg-neutral-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                                  Curriculum Overview
                                </h2>

                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                      <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-neutral-900/50">
                                          Subject
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-neutral-900/50">
                                          9th Grade
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-neutral-900/50">
                                          10th Grade
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-neutral-900/50">
                                          11th Grade
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-neutral-900/50">
                                          12th Grade
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      {currentTranscript?.transcript_summary.curriculum_overview.subjects.map((subject, index) => (
                                        <tr key={index}>
                                          <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                            {subject.subject_name}
                                        </td>
                                          {[0, 1, 2, 3].map((gradeIndex) => (
                                            <td key={gradeIndex} className="px-4 py-3">
                                              <div className="space-y-3">
                                                {subject.courses_by_grade[gradeIndex]?.map((course, courseIndex) => (
                                                  <div key={courseIndex}>
                                                    <div className="text-sm text-gray-900">
                                                      {course.course_name}
                                          </div>
                                                    <div className={`text-xs ${
                                                      course.rigor === "AP" ? "text-blue-600" :
                                                      course.rigor === "Honors" ? "text-emerald-600" :
                                                      course.rigor === "Post-AP" ? "text-violet-600" :
                                                      course.rigor === "Advanced" ? "text-amber-600" :
                                                      "text-gray-500"
                                                    }`}>
                                                      {course.rigor}
                                          </div>
                                          </div>
                                                ))}
                                          </div>
                                        </td>
                                          ))}
                                      </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="mt-8 space-y-4">
                                  <div className="bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                                      Key Patterns
                                    </h3>
                                    <ul className="space-y-2 text-amber-800">
                                      {currentTranscript?.transcript_summary.curriculum_overview.key_patterns.map((pattern, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                          {pattern}
                                      </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="patterns" className="mt-0">
                            <div className="space-y-6 h-[650px] overflow-y-auto pr-2 scrollbar-hide">
                              <div className="bg-white/50 dark:bg-neutral-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                                  Academic Patterns
                                </h2>

                                <div className="space-y-6">
                                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                                    <h3 className="text-xl font-semibold mb-4 text-indigo-900">
                                      Course Rigor Progression
                                    </h3>
                                    <div className="space-y-4">
                                      {currentTranscript?.transcript_summary?.patterns?.rigor_progression?.by_year?.map((yearData, index) => {
                                        const totalCourses = yearData.courses.reduce((sum, course) => sum + course.count, 0);
                                        
                                        return (
                                          <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                              <span className="text-sm font-medium text-gray-600">
                                                {yearData.year}
                                              </span>
                                              <span className="text-sm text-gray-600">
                                                {yearData.courses.map(course => `${course.count} ${course.rigor}`).join(", ")}
                                              </span>
                                            </div>
                                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                              {yearData.courses.map((course, i) => {
                                                const percentage = (course.count / totalCourses) * 100;
                                                return percentage > 0 && (
                                                  <div
                                                    key={i}
                                                    className={`h-full ${
                                                      course.rigor === "Honors" ? "bg-emerald-400" :
                                                      course.rigor === "AP" ? "bg-blue-400" :
                                                      course.rigor === "Post-AP" ? "bg-violet-400" :
                                                      course.rigor === "Advanced" ? "bg-amber-400" :
                                                      "bg-gray-300"
                                                    }`}
                                                    style={{ width: `${percentage}%` }}
                                                  ></div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-green-50/80 dark:bg-green-900/20 p-6 rounded-xl border border-green-200/50 dark:border-green-800/50">
                                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                                        Strengths
                                      </h3>
                                      <ul className="space-y-2 text-green-800">
                                        {currentTranscript?.transcript_summary?.patterns?.strengths?.points?.map((point, index) => (
                                          <li key={index} className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            {point}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="bg-blue-50/80 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                                      <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                        Notable Patterns
                                      </h3>
                                      <ul className="space-y-2 text-blue-800">
                                        {currentTranscript?.transcript_summary?.patterns?.notable_patterns?.points?.map((point, index) => (
                                          <li key={index} className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            {point}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="bg-gray-50/80 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                      Grade Anomalies
                                    </h3>
                                    <div className="space-y-3">
                                      {currentTranscript?.transcript_summary?.patterns?.grade_anomalies?.anomalies?.map((anomaly, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                          <span className="text-amber-600">
                                            {anomaly.grade}
                                          </span>
                                          <span className="text-gray-600">
                                            {anomaly.course}
                                          </span>
                                          {anomaly.improvement && (
                                            <span className="text-green-600">
                                              → {anomaly.improvement}
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="overview" className="mt-0">
                            <div className="space-y-6 h-[650px] overflow-y-auto pr-2 scrollbar-hide">
                              <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200">
                                  <h2 className="text-2xl font-bold mb-6">
                                    Academic Overview
                                  </h2>
                                  <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                      {currentTranscript?.transcript_summary.overview.summary}
                                    </p>

                                    <div className="mb-6">
                                      <h3 className="text-xl font-semibold mb-3 text-indigo-900">
                                        Strengths
                                      </h3>
                                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                        {currentTranscript?.transcript_summary.overview.strengths.map((strength, index) => (
                                          <li key={index} className="leading-relaxed">
                                            {strength}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="mb-6">
                                      <h3 className="text-xl font-semibold mb-3 text-indigo-900">
                                        Potential Concerns
                                      </h3>
                                      <p className="text-gray-700 leading-relaxed">
                                        {currentTranscript?.transcript_summary.overview.concerns}
                                      </p>
                                    </div>

                                    <div>
                                      <h3 className="text-xl font-semibold mb-3 text-indigo-900">
                                        Overall Impression
                                      </h3>
                                      <p className="text-gray-700 leading-relaxed">
                                        {currentTranscript?.transcript_summary.overview.overall_impression}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="prose dark:prose-invert max-w-none">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                  <h3 className="text-xl font-semibold mb-3">
                                    Grading Scale
                                  </h3>
                                  <div className="space-y-2 text-gray-700">
                                    <p>
                                      <span className="font-medium">
                                        Base Scale:
                                      </span>{" "}
                                      {currentTranscript?.transcript_summary.grading_scale.base_scale}
                                    </p>
                                    <p>
                                      <span className="font-medium">
                                        Honors Weight:
                                      </span>{" "}
                                      {currentTranscript?.transcript_summary.grading_scale.honors_weight}
                                    </p>
                                    <p>
                                      <span className="font-medium">
                                        AP Weight:
                                      </span>{" "}
                                      {currentTranscript?.transcript_summary.grading_scale.ap_weight}
                                    </p>
                                    <p>
                                      <span className="font-medium">Note:</span>{" "}
                                      {currentTranscript?.transcript_summary.grading_scale.note_plus_minus}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="courses" className="mt-0">
                            <div className="space-y-6 h-[650px] overflow-y-auto pr-2 scrollbar-hide">
                              {currentTranscript?.transcript_summary.academic_years.map(
                                (year, index) => (
                                  <div
                                    key={index}
                                    className="bg-white shadow-sm rounded-xl border border-gray-200"
                                  >
                                    <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                                      <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                          {year.year_label}
                                        </h3>
                                        <span className="text-indigo-600 font-semibold">
                                          GPA: {year.weighted_gpa}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="p-4">
                                      <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                          <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                              Course
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                              Rigor
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                              Grades
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                              Credits
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          {year.courses.map((course, courseIndex) => (
                                              <tr
                                                key={courseIndex}
                                              className="hover:bg-gray-50"
                                              >
                                              <td className="px-4 py-2 text-sm">
                                                  {course.course_name}
                                                </td>
                                              <td className="px-4 py-2 text-sm">
                                                  <span
                                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                course.rigor === "AP"
                                                      ? "bg-blue-50 text-blue-700"
                                                  : course.rigor === "Honors"
                                                      ? "bg-emerald-50 text-emerald-700"
                                                  : course.rigor === "Post-AP"
                                                      ? "bg-violet-50 text-violet-700"
                                                      : course.rigor === "Advanced"
                                                      ? "bg-amber-50 text-amber-700"
                                                      : "bg-gray-50 text-gray-700"
                                              }`}
                                                  >
                                                    {course.rigor}
                                                  </span>
                                                </td>
                                              <td className="px-4 py-2 text-sm">
                                                {Object.entries(course.term_grades).map(([term, grade], i) => (
                                                  <span key={i} className="mr-2">
                                                      {term}: {grade}
                                                    </span>
                                                  ))}
                                                </td>
                                              <td className="px-4 py-2 text-sm">
                                                {course.credits_earned || "N/A"}
                                                </td>
                                              </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="info" className="mt-0">
                            <div className="h-[650px] overflow-y-auto pr-2 scrollbar-hide">
                              <div className="space-y-6">
                                <div className="bg-white/50 dark:bg-neutral-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Student Information</h2>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.student_info.full_name}
                                      </div>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.student_info.date_of_birth}
                                      </div>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Enrollment Date</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.student_info.enrollment_date}
                                      </div>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Graduation Date</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.student_info.graduation_date}
                                      </div>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Student ID</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.student_info.student_id || "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white/50 dark:bg-neutral-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">School Information</h2>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">School Name</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.school_info.school_name}
                                      </div>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">School Type</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.school_info.school_type}
                                      </div>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">CEEB Code</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.school_info.ceeb_code}
                                      </div>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.school_info.phone}
                                      </div>
                                    </div>
                                    <div className="col-span-2 bg-white dark:bg-neutral-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Address</div>
                                      <div className="text-base font-medium text-gray-900 dark:text-white">
                                        {currentTranscript?.school_info.school_address}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      )
                    )}
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
