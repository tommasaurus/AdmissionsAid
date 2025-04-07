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

  const hardcodedData = {
    student_info: {
      full_name: "Qu, Thomas Shen",
      date_of_birth: "2003-01-07",
      enrollment_date: "2017-04-10",
      graduation_date: "2021-06-11",
      student_id: null,
    },
    school_info: {
      school_name: "Flint Hill School",
      school_address:
        "3320 Jermantown Road, Oakton, VA 22124-1755, United States",
      ceeb_code: "471648",
      phone: "703-584-2300",
      school_type: "Private, In-State (U.S.)",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "4.0 = A (90-100), 3.0 = B (80-89), etc.",
        honors_weight: "+0.33",
        ap_weight: "+0.67",
        note_plus_minus:
          "A+ treated as 4.3 unweighted; other plus/minus values likewise adjusted.",
      },
      normalized_gpa: 3.94,
      gpas: {
        "9th_grade_weighted": 4.08,
        "10th_grade_weighted": 4.19,
        "11th_grade_weighted": 4.59,
        "12th_grade_weighted": 4.86,
        cumulative_weighted_gpa: 4.43,
        cumulative_unweighted_gpa: 4.01,
      },
      course_counts: {
        total_ap_courses: 10,
        total_honors_courses: 6,
        post_ap_or_advanced_courses: 2,
        notable_pass_fail: [
          "Human Development (Pass)",
          "Senior Project (Pass)",
        ],
      },
      academic_years: [
        {
          year_label: "2017-2018 (9th Grade)",
          weighted_gpa: 4.08,
          courses: [
            {
              course_name: "English I Honors",
              term_grades: { Sem1: "A-", Sem2: "A-" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Orchestra",
              term_grades: { Sem1: "A", Sem2: "A+" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Modern European History",
              term_grades: { Sem1: "A-", Sem2: "A-" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Spanish III",
              term_grades: { Sem1: "A", Sem2: "A" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Precalculus Honors",
              term_grades: { Sem1: "A+", Sem2: "A+" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Physics",
              term_grades: { Sem1: "A", Sem2: "A" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Human Development",
              term_grades: { Final: "Pass" },
              rigor: "Pass/Fail",
              credits_earned: 0.25,
            },
          ],
        },
        {
          year_label: "2018-2019 (10th Grade)",
          weighted_gpa: 4.19,
          courses: [
            {
              course_name: "English II Honors",
              term_grades: { Sem1: "A-", Sem2: "A-" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Contemporary World History II Honors",
              term_grades: { Sem1: "A-", Sem2: "A" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Spanish IV Honors",
              term_grades: { Sem1: "B+", Sem2: "A" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Calculus BC",
              term_grades: { Sem1: "A", Sem2: "A" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Computer Science I",
              term_grades: { Sem1: "A", Sem2: "A+" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Chemistry Honors",
              term_grades: { Sem1: "A-", Sem2: "A" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
          ],
        },
        {
          year_label: "2019-2020 (11th Grade)",
          weighted_gpa: 4.59,
          courses: [
            {
              course_name: "AP Computer Science A",
              term_grades: { Sem1: "A-", Sem2: "A+" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP English Language and Composition",
              term_grades: { Sem1: "B+", Sem2: "A-" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP U.S. History",
              term_grades: { Sem1: "A", Sem2: "A" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Spanish Language & Culture",
              term_grades: { Sem1: "A", Sem2: "A+" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Multivariable Calculus: Post-AP",
              term_grades: { Sem1: "A+", Sem2: "A+" },
              rigor: "Post-AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Adv Biol - Anatomy & Physiology of Animals",
              term_grades: { Final: "A" },
              rigor: "Advanced / Elective",
              credits_earned: 0.5,
            },
            {
              course_name: "Adv Biol - Life's Origins and Transitions",
              term_grades: { Final: "A+" },
              rigor: "Advanced / Elective",
              credits_earned: 0.5,
            },
          ],
        },
        {
          year_label: "2020-2021 (12th Grade)",
          weighted_gpa: 4.86,
          courses: [
            {
              course_name: "AP English Literature and Composition",
              term_grades: { Sem1: "A", Sem2: "A+" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Macroeconomics",
              term_grades: { Sem1: "A+", Sem2: "A" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Psychology",
              term_grades: { Sem1: "A+", Sem2: "A" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Statistics",
              term_grades: { Sem1: "A+", Sem2: "A+" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Linear Algebra: Post-AP",
              term_grades: { Sem1: "A+", Sem2: "A+" },
              rigor: "Post-AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Biology",
              term_grades: { Sem1: "A", Sem2: "A" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Senior Project",
              term_grades: { Final: "Pass" },
              rigor: "Pass/Fail",
              credits_earned: null,
            },
          ],
        },
      ],
    },
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
            <div className="relative isolate">
              {uploadedFile ? (
                <motion.div
                  layoutId="file-upload"
                  className="relative z-10 flex flex-col items-start justify-start p-4 mt-4 w-full bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <DocumentIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />
                      <p className="text-base text-gray-900 dark:text-gray-300 truncate">
                        {uploadedFile.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  </div>

                  <div className="flex text-sm items-center w-full mt-2 justify-between text-gray-600 dark:text-gray-400">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 px-2 py-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                    >
                      Remove
                    </Button>

                    <p>
                      modified{" "}
                      {new Date(uploadedFile.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div
                  className="relative z-10 h-[220px] p-[1px] overflow-hidden rounded-3xl bg-transparent"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleClick}
                >
                  <div className="absolute inset-0">
                    <MovingBorder duration={4000} rx="24px" ry="24px">
                      <div className="h-40 w-40 opacity-[0.8] blur-[60px] bg-[radial-gradient(circle_at_center,var(--orange-500)_30%,var(--amber-500)_50%,transparent_70%)]" />
                    </MovingBorder>
                  </div>

                  <div className="relative bg-white/[0.3] dark:bg-black/[0.5] border-1 border-gray-400/30 dark:border-gray-600/30 flex flex-col items-center justify-center w-full h-full rounded-[1.4rem] cursor-pointer">
                    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                      <GridPattern />
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileInput}
                      accept=".pdf,.doc,.docx,.txt"
                      multiple={false}
                    />

                    <div className="relative z-20 flex flex-col items-center gap-2">
                      <ArrowUpTrayIcon className="w-10 h-10 text-gray-600 dark:text-gray-400 group-hover/upload:text-gray-800 dark:group-hover/upload:text-gray-200 transition-colors" />
                      <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                        {isDragging
                          ? "Drop your file here"
                          : "Upload your transcript"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Generate button that appears after file upload */}
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 relative flex justify-center"
              >
                <Button
                  onClick={scrollDown}
                  className="relative py-2.5 px-8 text-base font-medium bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-200"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                      <span>Analyzing Transcript...</span>
                    </div>
                  ) : (
                    "Generate Analysis"
                  )}
                </Button>
              </motion.div>
            )}
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
                      {hardcodedData.student_info.full_name}
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
                      showAnalysis && (
                        <Tabs defaultValue="curriculum" className="w-full">
                          <TabsList className="grid w-full grid-cols-5 mb-4">
                            <TabsTrigger value="curriculum">
                              Curriculum
                            </TabsTrigger>
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
                                      <tr>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                          English
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            English I Honors
                                          </div>
                                          <div className="text-xs text-emerald-600">
                                            Honors
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            English II Honors
                                          </div>
                                          <div className="text-xs text-emerald-600">
                                            Honors
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            AP English Language
                                          </div>
                                          <div className="text-xs text-blue-600">
                                            AP
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            AP English Literature
                                          </div>
                                          <div className="text-xs text-blue-600">
                                            AP
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                          Mathematics
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Precalculus Honors
                                          </div>
                                          <div className="text-xs text-emerald-600">
                                            Honors
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            AP Calculus BC
                                          </div>
                                          <div className="text-xs text-blue-600">
                                            AP
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Multivariable Calculus
                                          </div>
                                          <div className="text-xs text-violet-600">
                                            Post-AP
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="space-y-3">
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                Linear Algebra
                                              </div>
                                              <div className="text-xs text-violet-600">
                                                Post-AP
                                              </div>
                                            </div>
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                AP Statistics
                                              </div>
                                              <div className="text-xs text-blue-600">
                                                AP
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                          Science
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Physics
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            Standard
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Chemistry Honors
                                          </div>
                                          <div className="text-xs text-emerald-600">
                                            Honors
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="space-y-3">
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                Adv Biol - Anatomy & Physiology
                                              </div>
                                              <div className="text-xs text-amber-600">
                                                Advanced
                                              </div>
                                            </div>
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                Adv Biol - Life's Origins
                                              </div>
                                              <div className="text-xs text-amber-600">
                                                Advanced
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            AP Biology
                                          </div>
                                          <div className="text-xs text-blue-600">
                                            AP
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                          Language
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Spanish III
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            Standard
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Spanish IV Honors
                                          </div>
                                          <div className="text-xs text-emerald-600">
                                            Honors
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            AP Spanish Language
                                          </div>
                                          <div className="text-xs text-blue-600">
                                            AP
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            —
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                          Social Studies
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Modern European History
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            Standard
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Contemporary World History II Honors
                                          </div>
                                          <div className="text-xs text-emerald-600">
                                            Honors
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            AP U.S. History
                                          </div>
                                          <div className="text-xs text-blue-600">
                                            AP
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            AP Macroeconomics
                                          </div>
                                          <div className="text-xs text-blue-600">
                                            AP
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                          Other
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="space-y-3">
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                Orchestra
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                Standard
                                              </div>
                                            </div>
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                Human Development
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                Pass/Fail
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="text-sm text-gray-900">
                                            Computer Science I
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            Standard
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="space-y-3">
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                AP Computer Science A
                                              </div>
                                              <div className="text-xs text-blue-600">
                                                AP
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="space-y-3">
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                AP Psychology
                                              </div>
                                              <div className="text-xs text-blue-600">
                                                AP
                                              </div>
                                            </div>
                                            <div>
                                              <div className="text-sm text-gray-900">
                                                Senior Project
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                Pass/Fail
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div className="mt-8 space-y-4">
                                  <div className="bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                                      Key Patterns
                                    </h3>
                                    <ul className="space-y-2 text-amber-800">
                                      <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                        Consistent progression in rigor across
                                        all core subjects
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                        Advanced mathematics track (2 years
                                        Post-AP)
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                        Strong STEM focus with additional AP
                                        courses
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                        Completed Spanish through AP level
                                      </li>
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
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-600">
                                            9th Grade
                                          </span>
                                          <span className="text-sm text-gray-600">
                                            2 Honors, 4 Standard
                                          </span>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                          <div
                                            className="h-full bg-emerald-400"
                                            style={{ width: "33%" }}
                                          ></div>
                                          <div
                                            className="h-full bg-gray-300"
                                            style={{ width: "67%" }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-600">
                                            10th Grade
                                          </span>
                                          <span className="text-sm text-gray-600">
                                            3 Honors, 1 AP, 2 Standard
                                          </span>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                          <div
                                            className="h-full bg-emerald-400"
                                            style={{ width: "50%" }}
                                          ></div>
                                          <div
                                            className="h-full bg-blue-400"
                                            style={{ width: "17%" }}
                                          ></div>
                                          <div
                                            className="h-full bg-gray-300"
                                            style={{ width: "33%" }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-600">
                                            11th Grade
                                          </span>
                                          <span className="text-sm text-gray-600">
                                            4 AP, 1 Post-AP
                                          </span>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                          <div
                                            className="h-full bg-blue-400"
                                            style={{ width: "80%" }}
                                          ></div>
                                          <div
                                            className="h-full bg-violet-400"
                                            style={{ width: "20%" }}
                                          ></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-600">
                                            12th Grade
                                          </span>
                                          <span className="text-sm text-gray-600">
                                            6 AP, 1 Post-AP
                                          </span>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                                          <div
                                            className="h-full bg-blue-400"
                                            style={{ width: "86%" }}
                                          ></div>
                                          <div
                                            className="h-full bg-violet-400"
                                            style={{ width: "14%" }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-green-50/80 dark:bg-green-900/20 p-6 rounded-xl border border-green-200/50 dark:border-green-800/50">
                                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                                        Strengths
                                      </h3>
                                      <ul className="space-y-2 text-green-800">
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                          Accelerated math track
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                          Strong science progression
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                          Balanced humanities
                                        </li>
                                      </ul>
                                    </div>

                                    <div className="bg-blue-50/80 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                                      <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                        Notable Patterns
                                      </h3>
                                      <ul className="space-y-2 text-blue-800">
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                          Consistent honors/AP English
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                          Computer Science progression
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                          Spanish through AP level
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="bg-gray-50/80 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                      Grade Anomalies
                                    </h3>
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-4">
                                        <span className="text-amber-600">
                                          B+
                                        </span>
                                        <span className="text-gray-600">
                                          Spanish IV Honors (10th Grade, Sem 1)
                                        </span>
                                        <span className="text-green-600">
                                          → Improved to A in Sem 2
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <span className="text-amber-600">
                                          B+
                                        </span>
                                        <span className="text-gray-600">
                                          AP English Language (11th Grade, Sem
                                          1)
                                        </span>
                                        <span className="text-green-600">
                                          → Improved to A- in Sem 2
                                        </span>
                                      </div>
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
                                      Thomas Qu has maintained consistently
                                      strong academic performance at Flint Hill
                                      School (VA), with a clear upward GPA trend
                                      each year (weighted GPAs of 4.08, 4.19,
                                      4.59, and 4.86 in grades 9–12, culminating
                                      in a 4.43 cumulative average). He has
                                      taken a rigorous course load, including 10
                                      total AP courses and additional
                                      honors/post-AP coursework in mathematics
                                      and other disciplines.
                                    </p>

                                    <div className="mb-6">
                                      <h3 className="text-xl font-semibold mb-3 text-indigo-900">
                                        Strengths
                                      </h3>
                                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                        <li className="leading-relaxed">
                                          Demonstrated excellence in STEM
                                          courses, evidenced by strong
                                          performance in Precalculus Honors, AP
                                          Calculus BC, Multivariable Calculus
                                          (Post-AP), and Linear Algebra
                                          (Post-AP).
                                        </li>
                                        <li className="leading-relaxed">
                                          Consistent success across English,
                                          history, and Spanish—highlighting
                                          balanced academic strengths.
                                        </li>
                                        <li className="leading-relaxed">
                                          Upward trend from early high school
                                          years through senior year, indicating
                                          sustained growth.
                                        </li>
                                      </ul>
                                    </div>

                                    <div className="mb-6">
                                      <h3 className="text-xl font-semibold mb-3 text-indigo-900">
                                        Potential Concerns
                                      </h3>
                                      <p className="text-gray-700 leading-relaxed">
                                        No specific concerns: no failing,
                                        withdrawn, or repeated courses. Two
                                        pass/fail courses (Human Development,
                                        Senior Project) do not impact GPA but
                                        are completed with a Pass.
                                      </p>
                                    </div>

                                    <div>
                                      <h3 className="text-xl font-semibold mb-3 text-indigo-900">
                                        Overall Impression
                                      </h3>
                                      <p className="text-gray-700 leading-relaxed">
                                        This transcript shows a student with
                                        clear intellectual curiosity (especially
                                        in advanced mathematics and sciences),
                                        strong work ethic, and balanced
                                        achievement across multiple subject
                                        areas. The continuously rising GPA and
                                        successful completion of numerous
                                        AP/post-AP classes suggest excellent
                                        college preparedness.
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
                                      {
                                        hardcodedData.transcript_summary
                                          .grading_scale.base_scale
                                      }
                                    </p>
                                    <p>
                                      <span className="font-medium">
                                        Honors Weight:
                                      </span>{" "}
                                      {
                                        hardcodedData.transcript_summary
                                          .grading_scale.honors_weight
                                      }
                                    </p>
                                    <p>
                                      <span className="font-medium">
                                        AP Weight:
                                      </span>{" "}
                                      {
                                        hardcodedData.transcript_summary
                                          .grading_scale.ap_weight
                                      }
                                    </p>
                                    <p>
                                      <span className="font-medium">Note:</span>{" "}
                                      {
                                        hardcodedData.transcript_summary
                                          .grading_scale.note_plus_minus
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="courses" className="mt-0">
                            <div className="space-y-6 h-[650px] overflow-y-auto pr-2 scrollbar-hide">
                              {hardcodedData.transcript_summary.academic_years.map(
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
                                          {year.courses.map(
                                            (course, courseIndex) => (
                                              <tr
                                                key={courseIndex}
                                                className="hover:bg-gray-50"
                                              >
                                                <td className="px-4 py-2 text-sm">
                                                  {course.course_name}
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                  <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                              ${
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
                                                  {Object.entries(
                                                    course.term_grades
                                                  ).map(([term, grade], i) => (
                                                    <span
                                                      key={i}
                                                      className="mr-2"
                                                    >
                                                      {term}: {grade}
                                                    </span>
                                                  ))}
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                  {course.credits_earned || "-"}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </TabsContent>

                          <TabsContent value="info">
                            <div className="h-[650px] overflow-y-auto pr-2 scrollbar-hide">
                              <div className="grid grid-cols-2 gap-6">
                                {Object.entries(hardcodedData.student_info).map(
                                  ([key, value]) => (
                                    <div
                                      key={key}
                                      className="bg-gray-50 p-4 rounded-lg"
                                    >
                                      <div className="text-sm text-gray-500 mb-1">
                                        {key
                                          .split("_")
                                          .map(
                                            (word) =>
                                              word.charAt(0).toUpperCase() +
                                              word.slice(1)
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
