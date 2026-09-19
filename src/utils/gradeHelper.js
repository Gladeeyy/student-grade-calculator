// Helper functions for Student Grade Calculator
// These functions are pure JavaScript functions that are easy to explain in evaluation.

// 1. Calculate Total Marks
export function calculateTotal(marks) {
  const m1 = Number(marks.subject1) || 0;
  const m2 = Number(marks.subject2) || 0;
  const m3 = Number(marks.subject3) || 0;
  const m4 = Number(marks.subject4) || 0;
  const m5 = Number(marks.subject5) || 0;
  return m1 + m2 + m3 + m4 + m5;
}

// 2. Calculate Average Percentage
export function calculateAverage(total, numberOfSubjects = 5) {
  if (numberOfSubjects === 0) return 0;
  const avg = total / numberOfSubjects;
  return Number(avg.toFixed(2));
}

// 3. Assign Letter Grade based on average marks
export function calculateGrade(average) {
  if (average >= 90) return 'A+';
  if (average >= 80) return 'A';
  if (average >= 70) return 'B';
  if (average >= 60) return 'C';
  if (average >= 50) return 'D';
  return 'F';
}

// 4. Determine Pass or Fail
// A student passes if every individual subject has at least 50 marks.
export function checkPassStatus(marks) {
  const subjectList = [
    Number(marks.subject1) || 0,
    Number(marks.subject2) || 0,
    Number(marks.subject3) || 0,
    Number(marks.subject4) || 0,
    Number(marks.subject5) || 0
  ];

  // If any subject is less than 50, status is Fail
  const hasFailedSubject = subjectList.some(m => m < 50);
  return hasFailedSubject ? 'Fail' : 'Pass';
}

// 5. Initial sample student records for demonstration
export const sampleStudents = [
  {
    id: 1,
    rollNo: '23CS101',
    name: 'Aarav Sharma',
    marks: { subject1: 85, subject2: 90, subject3: 78, subject4: 92, subject5: 88 },
    total: 433,
    average: 86.6,
    grade: 'A',
    status: 'Pass'
  },
  {
    id: 2,
    rollNo: '23CS102',
    name: 'Priya Patel',
    marks: { subject1: 92, subject2: 95, subject3: 91, subject4: 94, subject5: 96 },
    total: 468,
    average: 93.6,
    grade: 'A+',
    status: 'Pass'
  },
  {
    id: 3,
    rollNo: '23CS103',
    name: 'Rahul Kumar',
    marks: { subject1: 45, subject2: 60, subject3: 55, subject4: 50, subject5: 58 },
    total: 268,
    average: 53.6,
    grade: 'D',
    status: 'Fail'
  }
];
