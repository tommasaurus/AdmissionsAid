export interface TranscriptData {
  student_info: {
    full_name: string;
    date_of_birth: string;
    enrollment_date: string;
    graduation_date: string;
    student_id: string | null;
  };
  school_info: {
    school_name: string;
    school_address: string;
    ceeb_code: string;
    phone: string;
    school_type: string;
  };
  transcript_summary: {
    grading_scale: {
      base_scale: string;
      honors_weight: string;
      ap_weight: string;
      note_plus_minus: string;
    };
    normalized_gpa: number;
    gpas: {
      [key: string]: number;
    };
    course_counts: {
      total_ap_courses: number;
      total_honors_courses: number;
      post_ap_or_advanced_courses: number;
      notable_pass_fail: string[];
    };
    academic_years: {
      year_label: string;
      weighted_gpa: number;
      courses: {
        course_name: string;
        term_grades: { [key: string]: string };
        rigor: string;
        credits_earned: number | null;
      }[];
    }[];
  };
}

export interface AcademicYear {
  year_label: string;
  weighted_gpa: number;
  courses: Course[];
}

export interface Course {
  course_name: string;
  rigor: string;
  term_grades: Record<string, string>;
  credits_earned: number | null;
}

export const transcriptDataMap: { [key: string]: TranscriptData } = {
  virginia: {
    student_info: {
      full_name: "Qu, Thomas Shen",
      date_of_birth: "2003-01-07",
      enrollment_date: "2017-04-10",
      graduation_date: "2021-06-11",
      student_id: null,
    },
    school_info: {
      school_name: "Flint Hill School",
      school_address: "3320 Jermantown Road, Oakton, VA 22124-1755, United States",
      ceeb_code: "471648",
      phone: "703-584-2300",
      school_type: "Private, In-State (U.S.)",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "4.0 = A (90-100), 3.0 = B (80-89), etc.",
        honors_weight: "+0.33",
        ap_weight: "+0.67",
        note_plus_minus: "A+ treated as 4.3 unweighted; other plus/minus values likewise adjusted.",
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
        notable_pass_fail: ["Human Development (Pass)", "Senior Project (Pass)"],
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
  },
  texas: {
    // Placeholder for Texas transcript data
    student_info: {
      full_name: "Rodriguez, Maria Elena",
      date_of_birth: "2003-03-15",
      enrollment_date: "2017-08-20",
      graduation_date: "2021-05-28",
      student_id: "TX2021456",
    },
    school_info: {
      school_name: "Westlake High School",
      school_address: "4100 Westbank Dr, Austin, TX 78746, United States",
      ceeb_code: "440007",
      phone: "512-732-9280",
      school_type: "Public, In-State (U.S.)",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "100-point scale (90-100=A, 80-89=B)",
        honors_weight: "+5 points",
        ap_weight: "+10 points",
        note_plus_minus: "No plus/minus grades used",
      },
      normalized_gpa: 3.92,
      gpas: {
        "9th_grade_weighted": 4.1,
        "10th_grade_weighted": 4.3,
        "11th_grade_weighted": 4.5,
        "12th_grade_weighted": 4.7,
        cumulative_weighted_gpa: 4.4,
        cumulative_unweighted_gpa: 3.9,
      },
      course_counts: {
        total_ap_courses: 8,
        total_honors_courses: 7,
        post_ap_or_advanced_courses: 1,
        notable_pass_fail: [],
      },
      academic_years: [] // To be filled with actual course data
    },
  },
  "new-york": {
    // Placeholder for New York transcript data
    student_info: {
      full_name: "Cohen, Sarah Rachel",
      date_of_birth: "2003-06-22",
      enrollment_date: "2017-09-05",
      graduation_date: "2021-06-25",
      student_id: "NY789012",
    },
    school_info: {
      school_name: "Stuyvesant High School",
      school_address: "345 Chambers St, New York, NY 10282, United States",
      ceeb_code: "334410",
      phone: "212-312-4800",
      school_type: "Public, Specialized High School",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "100-point scale converted to 4.0",
        honors_weight: "+0.5",
        ap_weight: "+1.0",
        note_plus_minus: "Numerical grades converted to letter grades",
      },
      normalized_gpa: 3.95,
      gpas: {
        "9th_grade_weighted": 4.2,
        "10th_grade_weighted": 4.3,
        "11th_grade_weighted": 4.6,
        "12th_grade_weighted": 4.7,
        cumulative_weighted_gpa: 4.45,
        cumulative_unweighted_gpa: 3.95,
      },
      course_counts: {
        total_ap_courses: 9,
        total_honors_courses: 5,
        post_ap_or_advanced_courses: 2,
        notable_pass_fail: [],
      },
      academic_years: [] // To be filled with actual course data
    },
  },
  connecticut: {
    // Placeholder for Connecticut transcript data
    student_info: {
      full_name: "Smith, Emily Grace",
      date_of_birth: "2003-09-12",
      enrollment_date: "2017-08-28",
      graduation_date: "2021-06-15",
      student_id: "CT345678",
    },
    school_info: {
      school_name: "Greenwich High School",
      school_address: "10 Hillside Rd, Greenwich, CT 06830, United States",
      ceeb_code: "070240",
      phone: "203-625-8000",
      school_type: "Public, In-State (U.S.)",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "4.0 scale with plus/minus",
        honors_weight: "+0.5",
        ap_weight: "+1.0",
        note_plus_minus: "Plus adds 0.3, minus subtracts 0.3",
      },
      normalized_gpa: 3.91,
      gpas: {
        "9th_grade_weighted": 4.0,
        "10th_grade_weighted": 4.2,
        "11th_grade_weighted": 4.4,
        "12th_grade_weighted": 4.6,
        cumulative_weighted_gpa: 4.3,
        cumulative_unweighted_gpa: 3.85,
      },
      course_counts: {
        total_ap_courses: 7,
        total_honors_courses: 8,
        post_ap_or_advanced_courses: 1,
        notable_pass_fail: [],
      },
      academic_years: [] // To be filled with actual course data
    },
  },
}; 