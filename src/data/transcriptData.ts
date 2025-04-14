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
          rigor: string;
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
      academic_years: [],
      curriculum_overview: {
        subjects: [],
        key_patterns: []
      },
      patterns: {
        rigor_progression: {
          title: "Course Rigor Progression",
          by_year: []
        },
        strengths: {
          title: "Strengths",
          points: []
        },
        notable_patterns: {
          title: "Notable Patterns",
          points: []
        },
        grade_anomalies: {
          title: "Grade Anomalies",
          anomalies: []
        }
      },
      overview: {
        summary: "",
        strengths: [],
        concerns: "",
        overall_impression: ""
      }
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
      academic_years: [],
      curriculum_overview: {
        subjects: [],
        key_patterns: []
      },
      patterns: {
        rigor_progression: {
          title: "Course Rigor Progression",
          by_year: []
        },
        strengths: {
          title: "Strengths",
          points: []
        },
        notable_patterns: {
          title: "Notable Patterns",
          points: []
        },
        grade_anomalies: {
          title: "Grade Anomalies",
          anomalies: []
        }
      },
      overview: {
        summary: "",
        strengths: [],
        concerns: "",
        overall_impression: ""
      }
    },
  },
}; 