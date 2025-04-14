export type TranscriptStatus = "pending" | "processing" | "complete" | "error";

export interface Course {
  id: string;
  name: string;
  category: string;
  credits: number;
  grade: string;
  gradeValue: number;
  normalizedValue: number;
  weight: number;
  confidence: number;
}

export interface Term {
  id: string;
  name: string;
  courses: Course[];
  termGPA: number;
}

export interface AcademicPatterns {
  strengths: {
    title: string;
    points: string[];
  };
  notable_patterns: {
    title: string;
    points: string[];
  };
  grade_anomalies: {
    title: string;
    anomalies: {
      grade: string;
      course: string;
      improvement?: string;
    }[];
  };
}

export interface TranscriptAnalysis {
  patterns: AcademicPatterns;
  rigor_progression: {
    title: string;
    description?: string;
    by_year: {
      year: string;
      courses: {
        rigor: string;
        count: number;
      }[];
    }[];
  };
}

export interface Transcript {
  id: string;
  studentName: string;
  schoolName: string;
  rawGPA: number;
  normalizedGPA: number;
  terms: Term[];
  status: TranscriptStatus;
  uploadDate: string;
  originalFile: string;
  confidence: number;
  analysis?: TranscriptAnalysis;
}

export interface School {
  id: string;
  name: string;
  gradingScale: GradingScale;
  rigorFactor: number;
  courseCatalog: CourseCatalog;
}

export interface GradingScale {
  [key: string]: number; // e.g., { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, ... }
}

export interface CourseCatalog {
  [category: string]: {
    weights: {
      regular: number;
      honors: number;
      ap: number;
      ib: number;
    };
  };
}

export interface TranscriptUpload {
  file: File;
  progress: number;
  status: TranscriptStatus;
  error?: string;
}
