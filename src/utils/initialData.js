import { computeStudentResults } from './gradeUtils';

const rawSampleStudents = [
  {
    id: 'rec-001',
    rollNo: '23CS101',
    name: 'Aarav Sharma',
    department: 'Computer Science & Engineering',
    semester: '5',
    academicYear: '2025-2026',
    dateAdded: '2026-09-10',
    subjects: [
      { id: 's1', code: 'CS501', name: 'Full Stack Web Dev', credits: 4, marks: 94, maxMarks: 100 },
      { id: 's2', code: 'CS502', name: 'Software Engineering', credits: 4, marks: 89, maxMarks: 100 },
      { id: 's3', code: 'CS503', name: 'Computer Networks', credits: 3, marks: 91, maxMarks: 100 },
      { id: 's4', code: 'CS504', name: 'Cloud Computing', credits: 3, marks: 95, maxMarks: 100 },
      { id: 's5', code: 'CS505', name: 'Web Dev Mini Project', credits: 2, marks: 98, maxMarks: 100 }
    ]
  },
  {
    id: 'rec-002',
    rollNo: '23CS102',
    name: 'Priya Narayanan',
    department: 'Computer Science & Engineering',
    semester: '5',
    academicYear: '2025-2026',
    dateAdded: '2026-09-11',
    subjects: [
      { id: 's1', code: 'CS501', name: 'Full Stack Web Dev', credits: 4, marks: 82, maxMarks: 100 },
      { id: 's2', code: 'CS502', name: 'Software Engineering', credits: 4, marks: 85, maxMarks: 100 },
      { id: 's3', code: 'CS503', name: 'Computer Networks', credits: 3, marks: 88, maxMarks: 100 },
      { id: 's4', code: 'CS504', name: 'Cloud Computing', credits: 3, marks: 80, maxMarks: 100 },
      { id: 's5', code: 'CS505', name: 'Web Dev Mini Project', credits: 2, marks: 90, maxMarks: 100 }
    ]
  },
  {
    id: 'rec-003',
    rollNo: '23CS103',
    name: 'Rohan Verma',
    department: 'Information Technology',
    semester: '5',
    academicYear: '2025-2026',
    dateAdded: '2026-09-12',
    subjects: [
      { id: 's1', code: 'CS501', name: 'Full Stack Web Dev', credits: 4, marks: 74, maxMarks: 100 },
      { id: 's2', code: 'CS502', name: 'Software Engineering', credits: 4, marks: 76, maxMarks: 100 },
      { id: 's3', code: 'CS503', name: 'Computer Networks', credits: 3, marks: 71, maxMarks: 100 },
      { id: 's4', code: 'CS504', name: 'Cloud Computing', credits: 3, marks: 79, maxMarks: 100 },
      { id: 's5', code: 'CS505', name: 'Web Dev Mini Project', credits: 2, marks: 85, maxMarks: 100 }
    ]
  },
  {
    id: 'rec-004',
    rollNo: '23CS104',
    name: 'Ananya Deshmukh',
    department: 'Computer Science & Engineering',
    semester: '5',
    academicYear: '2025-2026',
    dateAdded: '2026-09-14',
    subjects: [
      { id: 's1', code: 'CS501', name: 'Full Stack Web Dev', credits: 4, marks: 66, maxMarks: 100 },
      { id: 's2', code: 'CS502', name: 'Software Engineering', credits: 4, marks: 68, maxMarks: 100 },
      { id: 's3', code: 'CS503', name: 'Computer Networks', credits: 3, marks: 63, maxMarks: 100 },
      { id: 's4', code: 'CS504', name: 'Cloud Computing', credits: 3, marks: 65, maxMarks: 100 },
      { id: 's5', code: 'CS505', name: 'Web Dev Mini Project', credits: 2, marks: 75, maxMarks: 100 }
    ]
  },
  {
    id: 'rec-005',
    rollNo: '23CS105',
    name: 'Karthik Raja',
    department: 'Computer Science & Engineering',
    semester: '5',
    academicYear: '2025-2026',
    dateAdded: '2026-09-15',
    subjects: [
      { id: 's1', code: 'CS501', name: 'Full Stack Web Dev', credits: 4, marks: 56, maxMarks: 100 },
      { id: 's2', code: 'CS502', name: 'Software Engineering', credits: 4, marks: 58, maxMarks: 100 },
      { id: 's3', code: 'CS503', name: 'Computer Networks', credits: 3, marks: 42, maxMarks: 100 }, // Arrear in one subject
      { id: 's4', code: 'CS504', name: 'Cloud Computing', credits: 3, marks: 54, maxMarks: 100 },
      { id: 's5', code: 'CS505', name: 'Web Dev Mini Project', credits: 2, marks: 70, maxMarks: 100 }
    ]
  }
];

export const INITIAL_STUDENTS = rawSampleStudents.map(student => {
  const calc = computeStudentResults(student.subjects);
  return {
    ...student,
    ...calc
  };
});
