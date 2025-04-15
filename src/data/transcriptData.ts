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
    academic_years: AcademicYear[];
    curriculum_overview: {
      subjects: {
        subject_name: string;
        courses_by_grade: {
          course_name: string;
          rigor?: string;
        }[][];
      }[];
      key_patterns: string[];
    };
    patterns: {
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
    };
    overview: {
      summary: string;
      strengths: string[];
      concerns: string;
      overall_impression: string;
    };
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
      curriculum_overview: {
        subjects: [
          {
            subject_name: "English",
            courses_by_grade: [
              [{ course_name: "English I Honors", rigor: "Honors" }],
              [{ course_name: "English II Honors", rigor: "Honors" }],
              [{ course_name: "AP English Language", rigor: "AP" }],
              [{ course_name: "AP English Literature", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Mathematics",
            courses_by_grade: [
              [{ course_name: "Precalculus Honors", rigor: "Honors" }],
              [{ course_name: "AP Calculus BC", rigor: "AP" }],
              [{ course_name: "Multivariable Calculus", rigor: "Post-AP" }],
              [
                { course_name: "Linear Algebra", rigor: "Post-AP" },
                { course_name: "AP Statistics", rigor: "AP" }
              ]
            ]
          },
          {
            subject_name: "Science",
            courses_by_grade: [
              [{ course_name: "Physics", rigor: "Standard" }],
              [{ course_name: "Chemistry Honors", rigor: "Honors" }],
              [
                { course_name: "Adv Biol - Anatomy & Physiology", rigor: "Advanced" },
                { course_name: "Adv Biol - Life's Origins", rigor: "Advanced" }
              ],
              [{ course_name: "AP Biology", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Language",
            courses_by_grade: [
              [{ course_name: "Spanish III", rigor: "Standard" }],
              [{ course_name: "Spanish IV Honors", rigor: "Honors" }],
              [{ course_name: "AP Spanish Language", rigor: "AP" }],
              [{ course_name: "—", rigor: "Standard" }]
            ]
          },
          {
            subject_name: "Social Studies",
            courses_by_grade: [
              [{ course_name: "Modern European History", rigor: "Standard" }],
              [{ course_name: "Contemporary World History II Honors", rigor: "Honors" }],
              [{ course_name: "AP U.S. History", rigor: "AP" }],
              [{ course_name: "AP Macroeconomics", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Other",
            courses_by_grade: [
              [
                { course_name: "Orchestra", rigor: "Standard" },
                { course_name: "Human Development", rigor: "Pass/Fail" }
              ],
              [{ course_name: "Computer Science I", rigor: "Standard" }],
              [{ course_name: "AP Computer Science A", rigor: "AP" }],
              []
            ]
          }
        ],
        key_patterns: [
          "Consistent progression in rigor across all core subjects",
          "Advanced mathematics track (2 years Post-AP)",
          "Strong STEM focus with additional AP courses",
          "Completed Spanish through AP level"
        ]
      },
      patterns: {
        rigor_progression: {
          title: "Course Rigor Progression",
          by_year: [
            {
              year: "9th Grade",
              courses: [
                { rigor: "Honors", count: 2 },
                { rigor: "Standard", count: 4 }
              ]
            },
            {
              year: "10th Grade",
              courses: [
                { rigor: "Honors", count: 3 },
                { rigor: "AP", count: 1 },
                { rigor: "Standard", count: 2 }
              ]
            },
            {
              year: "11th Grade",
              courses: [
                { rigor: "AP", count: 4 },
                { rigor: "Post-AP", count: 1 }
              ]
            },
            {
              year: "12th Grade",
              courses: [
                { rigor: "AP", count: 6 },
                { rigor: "Post-AP", count: 1 }
              ]
            }
          ]
        },
        strengths: {
          title: "Strengths",
          points: [
            "Accelerated math track",
            "Strong science progression",
            "Balanced humanities"
          ]
        },
        notable_patterns: {
          title: "Notable Patterns",
          points: [
            "Consistent honors/AP English",
            "Computer Science progression",
            "Spanish through AP level"
          ]
        },
        grade_anomalies: {
          title: "Grade Anomalies",
          anomalies: [
            {
              grade: "B+",
              course: "Spanish IV Honors (10th Grade, Sem 1)",
              improvement: "Improved to A in Sem 2"
            },
            {
              grade: "B+",
              course: "AP English Language (11th Grade, Sem 1)",
              improvement: "Improved to A- in Sem 2"
            }
          ]
        }
      },
      overview: {
        summary: "Thomas Qu has maintained consistently strong academic performance at Flint Hill School (VA), with a clear upward GPA trend each year (weighted GPAs of 4.08, 4.19, 4.59, and 4.86 in grades 9–12, culminating in a 4.43 cumulative average). He has taken a rigorous course load, including 10 total AP courses and additional honors/post-AP coursework in mathematics and other disciplines.",
        strengths: [
          "Demonstrated excellence in STEM courses, evidenced by strong performance in Precalculus Honors, AP Calculus BC, Multivariable Calculus (Post-AP), and Linear Algebra (Post-AP).",
          "Consistent success across English, history, and Spanish—highlighting balanced academic strengths.",
          "Upward trend from early high school years through senior year, indicating sustained growth."
        ],
        concerns: "No specific concerns: no failing, withdrawn, or repeated courses. Two pass/fail courses (Human Development, Senior Project) do not impact GPA but are completed with a Pass.",
        overall_impression: "This transcript shows a student with clear intellectual curiosity (especially in advanced mathematics and sciences), strong work ethic, and balanced achievement across multiple subject areas. The continuously rising GPA and successful completion of numerous AP/post-AP classes suggest excellent college preparedness."
      }
    },
  },
  texas: {
    student_info: {
      full_name: "Johnny Appleseed",
      date_of_birth: "2003-06-08",
      enrollment_date: "2018-08-20",
      graduation_date: "2022-06-06",
      student_id: "992772495",
    },
    school_info: {
      school_name: "The University of Texas at Austin High School",
      school_address: "1801 Rio Grande St, Austin, TX 78701, United States",
      ceeb_code: "440007",
      phone: "512-732-9280",
      school_type: "International (Mexico) - Texas Accredited",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "100-point scale (90-100=A, 80-89=B)",
        honors_weight: "+5 points",
        ap_weight: "+10 points",
        note_plus_minus: "No plus/minus grades used",
      },
      normalized_gpa: 3.69,
      gpas: {
        "9th_grade_weighted": 3.65,
        "10th_grade_weighted": 3.67,
        "11th_grade_weighted": 3.70,
        "12th_grade_weighted": 3.74,
        cumulative_weighted_gpa: 3.69,
        cumulative_unweighted_gpa: 3.43,
      },
      course_counts: {
        total_ap_courses: 7,
        total_honors_courses: 7,
        post_ap_or_advanced_courses: 0,
        notable_pass_fail: [],
      },
      academic_years: [
        {
          year_label: "2018-2019 (9th Grade)",
          weighted_gpa: 3.65,
          courses: [
            {
              course_name: "English I",
              term_grades: { Sem1: "87", Sem2: "90" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Geometry",
              term_grades: { Sem1: "89", Sem2: "90" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Biology",
              term_grades: { Sem1: "90", Sem2: "91" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "World Geography",
              term_grades: { Sem1: "88", Sem2: "93" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "French I",
              term_grades: { Sem1: "99", Sem2: "99" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Business",
              term_grades: { Sem1: "90", Sem2: "93" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
          ],
        },
        {
          year_label: "2019-2020 (10th Grade)",
          weighted_gpa: 3.67,
          courses: [
            {
              course_name: "English II",
              term_grades: { Sem1: "91", Sem2: "93" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Algebra II",
              term_grades: { Sem1: "93", Sem2: "93" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Chemistry",
              term_grades: { Sem1: "90", Sem2: "95" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "World History",
              term_grades: { Sem1: "95", Sem2: "98" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "French II",
              term_grades: { Sem1: "97", Sem2: "96" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Art History",
              term_grades: { Sem1: "96", Sem2: "97" },
              rigor: "AP",
              credits_earned: 1.0,
            },
          ],
        },
        {
          year_label: "2020-2021 (11th Grade)",
          weighted_gpa: 3.70,
          courses: [
            {
              course_name: "AP English Language and Composition",
              term_grades: { Sem1: "89", Sem2: "95" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Pre-Calculus",
              term_grades: { Sem1: "94", Sem2: "93" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Physics 1",
              term_grades: { Sem1: "94", Sem2: "92" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "US History",
              term_grades: { Sem1: "92", Sem2: "97" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "AP US Government",
              term_grades: { Final: "96" },
              rigor: "AP",
              credits_earned: 0.5,
            },
            {
              course_name: "Professional Communications",
              term_grades: { Final: "93" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Health Education",
              term_grades: { Final: "96" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Finance",
              term_grades: { Sem1: "97", Sem2: "98" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Economics",
              term_grades: { Final: "97" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Personal Financial Literacy",
              term_grades: { Final: "95" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
          ],
        },
        {
          year_label: "2021-2022 (12th Grade)",
          weighted_gpa: 3.74,
          courses: [
            {
              course_name: "AP English Literature and Composition",
              term_grades: { Sem1: "94", Sem2: "92" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Calculus AB",
              term_grades: { Sem1: "96", Sem2: "90" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Environmental Science",
              term_grades: { Sem1: "92", Sem2: "93" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Psychology",
              term_grades: { Final: "85" },
              rigor: "Dual Enrollment",
              credits_earned: 0.5,
            },
          ],
        },
      ],
      curriculum_overview: {
        subjects: [
          {
            subject_name: "Mathematics",
            courses_by_grade: [
              [{ course_name: "Geometry", rigor: "Honors" }],
              [{ course_name: "Algebra II", rigor: "Honors" }],
              [{ course_name: "Pre-Calculus", rigor: "Standard" }],
              [{ course_name: "AP Calculus AB", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Science",
            courses_by_grade: [
              [{ course_name: "Biology", rigor: "Honors" }],
              [{ course_name: "Chemistry", rigor: "Honors" }],
              [{ course_name: "AP Physics 1", rigor: "AP" }],
              [{ course_name: "AP Environmental Science", rigor: "AP" }]
            ]
          },
          {
            subject_name: "English",
            courses_by_grade: [
              [{ course_name: "English I", rigor: "Honors" }],
              [{ course_name: "English II", rigor: "Honors" }],
              [{ course_name: "AP English Language", rigor: "AP" }],
              [{ course_name: "AP English Literature", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Social Studies",
            courses_by_grade: [
              [{ course_name: "World Geography", rigor: "Standard" }],
              [{ course_name: "World History", rigor: "Standard" }],
              [
                { course_name: "US History", rigor: "Standard" },
                { course_name: "AP US Government", rigor: "AP" }
              ],
              [{ course_name: "Psychology", rigor: "Dual Enrollment" }]
            ]
          },
          {
            subject_name: "Language",
            courses_by_grade: [
              [{ course_name: "French I", rigor: "Standard" }],
              [{ course_name: "French II", rigor: "Standard" }],
              [{ course_name: "—", rigor: "Standard" }],
              [{ course_name: "—", rigor: "Standard" }]
            ]
          },
          {
            subject_name: "Other",
            courses_by_grade: [
              [
                { course_name: "Business", rigor: "Standard" }
              ],
              [{ course_name: "AP Art History", rigor: "AP" }],
              [
                { course_name: "Professional Communication", rigor: "Standard" },
                { course_name: "Finance", rigor: "Standard" },
                { course_name: "Economics", rigor: "Standard" },
                { course_name: "Personal Financial Literacy", rigor: "Standard" }
              ],
              []
            ]
          }
        ],
        key_patterns: [
          "Strong progression in STEM subjects",
          "Consistent honors and AP coursework",
          "Dual language focus (Spanish and French)",
          "Interest in business and finance"
        ]
      },
      patterns: {
        rigor_progression: {
          title: "Course Rigor Progression",
          by_year: [
            {
              year: "9th Grade (2018-2019)",
              courses: [
                { rigor: "Honors", count: 3 },
                { rigor: "Standard", count: 3 }
              ]
            },
            {
              year: "10th Grade (2019-2020)",
              courses: [
                { rigor: "AP", count: 1 },
                { rigor: "Honors", count: 3 },
                { rigor: "Standard", count: 2 }
              ]
            },
            {
              year: "11th Grade (2020-2021)",
              courses: [
                { rigor: "AP", count: 3 },
                { rigor: "Standard", count: 7 }
              ]
            },
            {
              year: "12th Grade (2021-2022)",
              courses: [
                { rigor: "AP", count: 3 },
                { rigor: "Dual Enrollment", count: 1 }
              ]
            }
          ]
        },
        strengths: {
          title: "Strengths",
          points: [
            "Strong STEM foundation with Honors math and science sequence",
            "Consistent progression to AP courses in core subjects",
            "Balanced curriculum with business/finance focus"
          ]
        },
        notable_patterns: {
          title: "Notable Patterns",
          points: [
            "Early completion of foreign language (French I & II)",
            "Comprehensive business/finance coursework in 11th grade",
            "Steady increase in course rigor, culminating in AP and Dual Enrollment courses"
          ]
        },
        grade_anomalies: {
          title: "Grade Anomalies",
          anomalies: [
            {
              grade: "85",
              course: "Psychology (Dual Enrollment, 12th Grade)",
              improvement: "Only grade below 87 in academic record"
            }
          ]
        }
      },
      overview: {
        summary: "The student demonstrates a strong academic trajectory with particular excellence in STEM subjects. Starting with Honors courses in 9th grade (English I, Geometry, Biology), progressing through AP courses, and culminating with Dual Enrollment coursework. The transcript shows thoughtful course selection with a clear focus on business and finance, while maintaining high achievement across core academic subjects.",
        strengths: [
          "Consistent performance in mathematics, progressing from Honors Geometry to AP Calculus AB",
          "Strong science sequence with Honors Biology, Honors Chemistry, AP Physics 1, and AP Environmental Science",
          "Comprehensive exploration of business and finance through multiple specialized courses"
        ],
        concerns: "While maintaining strong overall performance, the 85 in Dual Enrollment Psychology represents the lowest grade in the academic record. Additionally, there is a two-year gap in language studies after completing French II in 10th grade.",
        overall_impression: "The transcript reveals a student with strong academic capabilities and a clear interest in business and finance. The progression from Honors to AP courses demonstrates increasing academic rigor, while the addition of Dual Enrollment coursework shows college readiness. The student's balanced achievement across STEM, humanities, and specialized business courses suggests both academic versatility and focused career interests."
      }
    },
  },
  "new-york": {
    student_info: {
      full_name: "Johnny Appleseed",
      date_of_birth: "2004-09-16",
      enrollment_date: "2018-09-05",
      graduation_date: "2022-06-24",
      student_id: "104623",
    },
    school_info: {
      school_name: "Harrison High School",
      school_address: "255 Union Avenue, Harrison, NY 10528, United States",
      ceeb_code: "332275",
      phone: "914-630-3095",
      school_type: "Public, In-State (U.S.)",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "100-point scale (90-100=A, 80-89=B)",
        honors_weight: "+3 points",
        ap_weight: "+6 points",
        note_plus_minus: "IB courses weighted same as AP",
      },
      normalized_gpa: 3.98,
      gpas: {
        "9th_grade_weighted": 98.5,
        "10th_grade_weighted": 99.2,
        "11th_grade_weighted": 100.7,
        cumulative_weighted_gpa: 100.656,
        cumulative_unweighted_gpa: 97.544,
      },
      course_counts: {
        total_ap_courses: 2,
        total_honors_courses: 0,
        post_ap_or_advanced_courses: 6,
        notable_pass_fail: [],
      },
      academic_years: [
        {
          year_label: "2018-2019 (9th Grade)",
          weighted_gpa: 98.5,
          courses: [
            {
              course_name: "English 9",
              term_grades: { Final: "96" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Geometry",
              term_grades: { Final: "99" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Biology",
              term_grades: { Final: "96" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Global History 9",
              term_grades: { Final: "97" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Spanish II",
              term_grades: { Final: "96" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Studio in Art",
              term_grades: { Final: "96" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Topics in Pre Calc I",
              term_grades: { Final: "99" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Physical Education Fall",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Physical Education Spring",
              term_grades: { Final: "99" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
          ],
        },
        {
          year_label: "2019-2020 (10th Grade)",
          weighted_gpa: 99.2,
          courses: [
            {
              course_name: "English 10",
              term_grades: { Final: "97" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Common Core Algebra II",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Foundations in College Chemistry",
              term_grades: { Final: "98" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "AP World History",
              term_grades: { Final: "95" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Spanish III",
              term_grades: { Final: "98" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Computer Science II",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Topics in Pre Calc II",
              term_grades: { Final: "99" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Health",
              term_grades: { Final: "99" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Physical Education Fall",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Physical Education Spring",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
          ],
        },
        {
          year_label: "2020-2021 (11th Grade)",
          weighted_gpa: 100.7,
          courses: [
            {
              course_name: "IB English HL",
              term_grades: { Final: "95" },
              rigor: "IB",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Calc BC",
              term_grades: { Final: "98" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "IB Physics HL",
              term_grades: { Final: "95" },
              rigor: "IB",
              credits_earned: 1.0,
            },
            {
              course_name: "IB History of the Americas HL",
              term_grades: { Final: "100" },
              rigor: "IB",
              credits_earned: 1.0,
            },
            {
              course_name: "IB Spanish SL",
              term_grades: { Final: "99" },
              rigor: "IB",
              credits_earned: 1.0,
            },
            {
              course_name: "IB Theory of Knowledge",
              term_grades: { Final: "100" },
              rigor: "IB",
              credits_earned: 1.0,
            },
            {
              course_name: "Web Design & Management",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Physical Education Fall",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Physical Education Spring",
              term_grades: { Final: "100" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
          ],
        },
      ],
      curriculum_overview: {
        subjects: [
          {
            subject_name: "English",
            courses_by_grade: [
              [{ course_name: "English 9", rigor: "Standard" }],
              [{ course_name: "English 10", rigor: "Standard" }],
              [{ course_name: "IB English HL", rigor: "IB" }],
              [{ course_name: "—" }]
            ]
          },
          {
            subject_name: "Mathematics",
            courses_by_grade: [
              [
                { course_name: "Geometry", rigor: "Standard" },
                { course_name: "Topics in Pre Calc I", rigor: "Standard" }
              ],
              [
                { course_name: "Common Core Algebra II", rigor: "Standard" },
                { course_name: "Topics in Pre Calc II", rigor: "Standard" }
              ],
              [{ course_name: "AP Calc BC", rigor: "AP" }],
              [{ course_name: "—" }]
            ]
          },
          {
            subject_name: "Science",
            courses_by_grade: [
              [{ course_name: "Biology", rigor: "Standard" }],
              [{ course_name: "Foundations in College Chemistry", rigor: "Standard" }],
              [{ course_name: "IB Physics HL", rigor: "IB" }],
              [{ course_name: "—" }]
            ]
          },
          {
            subject_name: "Social Studies",
            courses_by_grade: [
              [{ course_name: "Global History 9", rigor: "Standard" }],
              [{ course_name: "AP World History", rigor: "AP" }],
              [{ course_name: "IB History of the Americas HL", rigor: "IB" }],
              [{ course_name: "—" }]
            ]
          },
          {
            subject_name: "Language",
            courses_by_grade: [
              [{ course_name: "Spanish II", rigor: "Standard" }],
              [{ course_name: "Spanish III", rigor: "Standard" }],
              [{ course_name: "IB Spanish SL", rigor: "IB" }],
              [{ course_name: "—" }]
            ]
          },
          {
            subject_name: "Other",
            courses_by_grade: [
              [
                { course_name: "Studio in Art", rigor: "Standard" },
                { course_name: "Physical Education", rigor: "Standard" }
              ],
              [
                { course_name: "Computer Science II", rigor: "Standard" },
                { course_name: "Health", rigor: "Standard" },
                { course_name: "Physical Education", rigor: "Standard" }
              ],
              [
                { course_name: "Web Design & Management", rigor: "Standard" },
                { course_name: "IB Theory of Knowledge", rigor: "IB" },
                { course_name: "Physical Education", rigor: "Standard" }
              ],
              [{ course_name: "—" }]
            ]
          }
        ],
        key_patterns: [
          "Accelerated mathematics track with early Pre-Calculus",
          "Strong progression to IB curriculum in 11th grade",
          "Consistent excellence across all subjects",
          "Complete Spanish language sequence through IB"
        ]
      },
      patterns: {
        rigor_progression: {
          title: "Course Rigor Progression",
          by_year: [
            {
              year: "9th Grade (2018-2019)",
              courses: [
                { rigor: "Advanced", count: 1 },
                { rigor: "Standard", count: 8 }
              ]
            },
            {
              year: "10th Grade (2019-2020)",
              courses: [
                { rigor: "AP", count: 1 },
                { rigor: "Advanced", count: 1 },
                { rigor: "Standard", count: 8 }
              ]
            },
            {
              year: "11th Grade (2020-2021)",
              courses: [
                { rigor: "IB", count: 6 },
                { rigor: "AP", count: 1 },
                { rigor: "Standard", count: 2 }
              ]
            }
          ]
        },
        strengths: {
          title: "Strengths",
          points: [
            "Exceptional performance across all subjects with no grade below 95",
            "Advanced mathematics progression starting in 9th grade",
            "Strong commitment to IB curriculum with six IB courses"
          ]
        },
        notable_patterns: {
          title: "Notable Patterns",
          points: [
            "Early start in advanced mathematics with Topics in Pre Calc I & II",
            "Comprehensive IB program participation in junior year",
            "Perfect scores in all Physical Education courses"
          ]
        },
        grade_anomalies: {
          title: "Grade Anomalies",
          anomalies: []
        }
      },
      overview: {
        summary: "The student demonstrates exceptional academic achievement with a remarkable consistency in performance. Starting with advanced mathematics in 9th grade and progressing through AP and IB coursework, the transcript shows both academic excellence and increasing rigor. The student maintains outstanding grades across all subjects while taking on challenging IB curriculum.",
        strengths: [
          "Exceptional mathematics sequence, starting with advanced topics and culminating in AP Calculus BC",
          "Strong commitment to academic rigor through IB program participation",
          "Perfect or near-perfect scores in most courses, demonstrating consistent excellence"
        ],
        concerns: "No significant academic concerns. The student has maintained excellent grades throughout all years and across all subject areas.",
        overall_impression: "The transcript reveals a student of exceptional academic caliber with outstanding performance across a challenging curriculum. The progression from advanced courses to AP and IB demonstrates both intellectual capability and academic ambition. The student's consistent excellence across all subjects, particularly in mathematics and IB coursework, suggests superior college preparedness."
      }
    },
  },
  connecticut: {
    student_info: {
      full_name: "Johnny Appleseed",
      date_of_birth: "2004-03-15",
      enrollment_date: "2019-09",
      graduation_date: "2022-05-29",
      student_id: null,
    },
    school_info: {
      school_name: "The Taft School",
      school_address: "110 Woodbury Road, Watertown, Connecticut 06795",
      ceeb_code: "070880",
      phone: "860-945-7703",
      school_type: "Private, In-State (U.S.)",
    },
    transcript_summary: {
      grading_scale: {
        base_scale: "Letter & Numeric Grades (A-F & 0-100)",
        honors_weight: "Not specified",
        ap_weight: "Not specified",
        note_plus_minus: "Pass/Fail used for select courses",
      },
      normalized_gpa: 3.89,
      gpas: {
        "10th_grade_weighted": 91.8,
        "11th_grade_weighted": 95.6,
        "12th_grade_weighted": 96.4,
        cumulative_weighted_gpa: 95.1,
        cumulative_unweighted_gpa: 91.8,
      },
      course_counts: {
        total_ap_courses: 4,
        total_honors_courses: 6,
        post_ap_or_advanced_courses: 1,
        notable_pass_fail: ["Health and Life Skills 9", "Physical Education 9", "Accelerated Physics"],
      },
      academic_years: [
        {
          year_label: "2018-19 (9th Grade)",
          weighted_gpa: 0,
          courses: [
            {
              course_name: "Arts: Ceramics",
              term_grades: { Final: "A" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Arts: Digital Photography",
              term_grades: { Final: "A" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Arts: Short Film",
              term_grades: { Final: "A-" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "English 9",
              term_grades: { Final: "A-" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Health and Life Skills 9",
              term_grades: { Final: "Pass" },
              rigor: "Pass/Fail",
              credits_earned: 0.5,
            },
            {
              course_name: "Honors Biology",
              term_grades: { Final: "A-" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Honors Geometry",
              term_grades: { Final: "B+" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Modern World History",
              term_grades: { Final: "A" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Physical Education 9",
              term_grades: { Final: "Pass" },
              rigor: "Pass/Fail",
              credits_earned: 0.5,
            },
            {
              course_name: "Spanish 9",
              term_grades: { Final: "A-" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
          ],
        },
        {
          year_label: "2019-20 (10th Grade)",
          weighted_gpa: 91.8,
          courses: [
            {
              course_name: "Mid English",
              term_grades: { Sem1: "88", Sem2: "P" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Honors Algebra II & Trigonometry",
              term_grades: { Sem1: "95", Sem2: "P" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "World History II: Revolutions",
              term_grades: { Sem1: "91", Sem2: "P" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Honors Spanish II",
              term_grades: { Sem1: "95", Sem2: "P" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Accelerated Physics",
              term_grades: { Sem2: "P" },
              rigor: "Advanced",
              credits_earned: 0.5,
            },
            {
              course_name: "Honors Physics",
              term_grades: { Sem1: "87" },
              rigor: "Honors",
              credits_earned: 0.5,
            },
            {
              course_name: "Beginning Ceramics",
              term_grades: { Sem1: "95" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
            {
              course_name: "Intermediate Ceramics",
              term_grades: { Sem2: "P" },
              rigor: "Standard",
              credits_earned: 0.5,
            },
          ],
        },
        {
          year_label: "2020-21 (11th Grade)",
          weighted_gpa: 95.6,
          courses: [
            {
              course_name: "UM English",
              term_grades: { Sem1: "92", Sem2: "93" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Honors Precalculus",
              term_grades: { Sem1: "98", Sem2: "98" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "AP U.S. History",
              term_grades: { Sem1: "96", Sem2: "97" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "Honors Spanish III",
              term_grades: { Sem1: "96", Sem2: "98" },
              rigor: "Honors",
              credits_earned: 1.0,
            },
            {
              course_name: "Accelerated Chemistry",
              term_grades: { Sem1: "93", Sem2: "96" },
              rigor: "Advanced",
              credits_earned: 1.0,
            },
            {
              course_name: "Advanced Ceramics",
              term_grades: { Final: "95" },
              rigor: "Advanced",
              credits_earned: 1.0,
            },
          ],
        },
        {
          year_label: "2021-22 (12th Grade)",
          weighted_gpa: 96.4,
          courses: [
            {
              course_name: "Media and Identity",
              term_grades: { Final: "95" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "Race and Gender in Hollywood Film",
              term_grades: { Final: "93" },
              rigor: "Standard",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Calculus AB",
              term_grades: { Sem1: "96", Sem2: "91" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Chemistry",
              term_grades: { Sem1: "100", Sem2: "98" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Psychology",
              term_grades: { Sem1: "100", Sem2: "103" },
              rigor: "AP",
              credits_earned: 1.0,
            },
            {
              course_name: "AP Spanish Language",
              term_grades: { Sem1: "94", Sem2: "94" },
              rigor: "AP",
              credits_earned: 1.0,
            },
          ],
        },
      ],
      curriculum_overview: {
        subjects: [
          {
            subject_name: "English",
            courses_by_grade: [
              [{ course_name: "English 9", rigor: "Standard" }],
              [{ course_name: "Mid English", rigor: "Standard" }],
              [{ course_name: "UM English", rigor: "Standard" }],
              [
                { course_name: "Media and Identity", rigor: "Standard" },
                { course_name: "Race and Gender in Hollywood Film", rigor: "Standard" }
              ]
            ]
          },
          {
            subject_name: "Mathematics",
            courses_by_grade: [
              [{ course_name: "Honors Geometry", rigor: "Honors" }],
              [{ course_name: "Honors Algebra II & Trigonometry", rigor: "Honors" }],
              [{ course_name: "Honors Precalculus", rigor: "Honors" }],
              [{ course_name: "AP Calculus AB", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Science",
            courses_by_grade: [
              [{ course_name: "Honors Biology", rigor: "Honors" }],
              [
                { course_name: "Accelerated Physics", rigor: "Advanced" },
                { course_name: "Honors Physics", rigor: "Honors" }
              ],
              [{ course_name: "Accelerated Chemistry", rigor: "Advanced" }],
              [{ course_name: "AP Chemistry", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Social Studies",
            courses_by_grade: [
              [{ course_name: "Modern World History", rigor: "Standard" }],
              [{ course_name: "World History II: Revolutions", rigor: "Standard" }],
              [{ course_name: "AP U.S. History", rigor: "AP" }],
              [{ course_name: "AP Psychology", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Language",
            courses_by_grade: [
              [{ course_name: "Spanish 9", rigor: "Standard" }],
              [{ course_name: "Honors Spanish II", rigor: "Honors" }],
              [{ course_name: "Honors Spanish III", rigor: "Honors" }],
              [{ course_name: "AP Spanish Language", rigor: "AP" }]
            ]
          },
          {
            subject_name: "Arts",
            courses_by_grade: [
              [
                { course_name: "Ceramics", rigor: "Standard" },
                { course_name: "Digital Photography", rigor: "Standard" },
                { course_name: "Short Film", rigor: "Standard" }
              ],
              [
                { course_name: "Beginning Ceramics", rigor: "Standard" },
                { course_name: "Intermediate Ceramics", rigor: "Standard" }
              ],
              [{ course_name: "Advanced Ceramics", rigor: "Advanced" }],
              [{ course_name: "—", rigor: "Standard" }]
            ]
          }
        ],
        key_patterns: [
          "Strong progression in mathematics through AP Calculus AB",
          "Comprehensive science sequence with advanced and AP courses",
          "Consistent honors and AP Spanish language progression",
          "Significant arts focus, particularly in ceramics"
        ]
      },
      patterns: {
        rigor_progression: {
          title: "Course Rigor Progression",
          by_year: [
            {
              year: "9th Grade",
              courses: [
                { rigor: "Honors", count: 2 },
                { rigor: "Standard", count: 6 },
                { rigor: "Pass/Fail", count: 2 }
              ]
            },
            {
              year: "10th Grade",
              courses: [
                { rigor: "Honors", count: 3 },
                { rigor: "Advanced", count: 1 },
                { rigor: "Standard", count: 4 }
              ]
            },
            {
              year: "11th Grade",
              courses: [
                { rigor: "AP", count: 1 },
                { rigor: "Honors", count: 2 },
                { rigor: "Advanced", count: 2 },
                { rigor: "Standard", count: 1 }
              ]
            },
            {
              year: "12th Grade",
              courses: [
                { rigor: "AP", count: 4 },
                { rigor: "Standard", count: 2 }
              ]
            }
          ]
        },
        strengths: {
          title: "Strengths",
          points: [
            "Strong upward grade trajectory with significant improvement each year",
            "Excellence in advanced science courses, particularly AP Chemistry",
            "Consistent high achievement in Spanish language sequence",
            "Balanced humanities and STEM course load"
          ]
        },
        notable_patterns: {
          title: "Notable Patterns",
          points: [
            "Steady increase in course rigor, culminating in 4 AP courses senior year",
            "Maintained strong performance in mathematics through AP Calculus AB",
            "Significant commitment to arts, especially ceramics progression",
            "Diverse English curriculum with specialized senior courses"
          ]
        },
        grade_anomalies: {
          title: "Grade Anomalies",
          anomalies: [
            {
              grade: "B+",
              course: "Honors Geometry (9th Grade)",
              improvement: "Improved to consistent A/A- range in later math courses"
            },
            {
              grade: "87",
              course: "Honors Physics (10th Grade)",
              improvement: "Showed significant improvement in later science courses"
            }
          ]
        }
      },
      overview: {
        summary: "The student demonstrates a strong academic trajectory with consistent improvement over four years, culminating in a 96.4 GPA in senior year. The transcript shows particular strength in sciences and mathematics, with notable achievement in AP Chemistry and a successful progression through AP Calculus AB. The student maintained a balanced course load while taking increasingly challenging classes, including multiple AP courses in the final two years.",
        strengths: [
          "Exceptional performance in science courses, particularly in chemistry",
          "Strong language skills demonstrated through Spanish progression",
          "Significant improvement in mathematics after initial B+ in Geometry",
          "Balanced course selection across STEM and humanities"
        ],
        concerns: "No significant academic concerns. Early B+ in Honors Geometry and 87 in Honors Physics were followed by consistent improvement and excellent performance in subsequent courses.",
        overall_impression: "The transcript reveals a student who has shown remarkable growth and academic maturity. Starting with solid but mixed performance in 9th grade, the student demonstrated consistent improvement, culminating in exceptional performance in advanced and AP courses. The balance of STEM and humanities, combined with significant arts involvement, suggests a well-rounded student prepared for rigorous college academics."
      }
    },
  },
}; 