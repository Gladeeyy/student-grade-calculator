// Grading Scale Definitions (Based on standard UGC / University 10-Point Grading System)
export const GRADE_SCALE = [
  { min: 90, max: 100, grade: 'O', point: 10, description: 'Outstanding', color: '#10b981' },
  { min: 80, max: 89, grade: 'A+', point: 9, description: 'Excellent', color: '#3b82f6' },
  { min: 70, max: 79, grade: 'A', point: 8, description: 'Very Good', color: '#6366f1' },
  { min: 60, max: 69, grade: 'B+', point: 7, description: 'Good', color: '#8b5cf6' },
  { min: 55, max: 59, grade: 'B', point: 6, description: 'Above Average', color: '#ec4899' },
  { min: 50, max: 54, grade: 'C', point: 5, description: 'Average (Pass)', color: '#f59e0b' },
  { min: 0, max: 49, grade: 'RA', point: 0, description: 'Re-appear (Fail)', color: '#ef4444' }
];

/**
 * Calculates grade and grade point for a specific mark out of 100
 */
export function getGradeForMark(mark) {
  const numericMark = parseFloat(mark);
  if (isNaN(numericMark) || numericMark < 0) {
    return { grade: 'N/A', point: 0, description: 'Invalid', color: '#9ca3af' };
  }
  const found = GRADE_SCALE.find(item => numericMark >= item.min && numericMark <= item.max);
  return found || { grade: 'RA', point: 0, description: 'Re-appear (Fail)', color: '#ef4444' };
}

/**
 * Computes overall totals, average, SGPA, letter grade, and honors distinction
 */
export function computeStudentResults(subjects = []) {
  if (!subjects || subjects.length === 0) {
    return {
      totalMarks: 0,
      maxPossibleMarks: 0,
      average: 0,
      sgpa: 0,
      overallGrade: 'N/A',
      overallGradeColor: '#9ca3af',
      status: 'Pending',
      classification: 'No subjects added',
      totalCredits: 0,
      passedSubjectsCount: 0,
      failedSubjectsCount: 0
    };
  }

  let totalMarks = 0;
  let maxPossibleMarks = 0;
  let totalCredits = 0;
  let weightedPointsSum = 0;
  let hasFailedSubject = false;
  let passedCount = 0;
  let failedCount = 0;

  subjects.forEach(sub => {
    const mark = parseFloat(sub.marks) || 0;
    const maxMark = parseFloat(sub.maxMarks) || 100;
    const credits = parseFloat(sub.credits) || 3;

    totalMarks += mark;
    maxPossibleMarks += maxMark;
    totalCredits += credits;

    const normalizedMark = maxMark > 0 ? (mark / maxMark) * 100 : 0;
    const gradeObj = getGradeForMark(normalizedMark);

    if (gradeObj.grade === 'RA' || normalizedMark < 50) {
      hasFailedSubject = true;
      failedCount++;
    } else {
      passedCount++;
    }

    weightedPointsSum += gradeObj.point * credits;
  });

  const average = maxPossibleMarks > 0 ? (totalMarks / maxPossibleMarks) * 100 : 0;
  const sgpa = totalCredits > 0 ? weightedPointsSum / totalCredits : 0;

  // Determine overall letter grade
  let overallGrade = 'RA';
  let overallGradeColor = '#ef4444';
  let status = 'Fail';
  let classification = 'Re-appear in one or more courses';

  if (!hasFailedSubject && average >= 50) {
    status = 'Pass';
    const gradeObj = getGradeForMark(average);
    overallGrade = gradeObj.grade;
    overallGradeColor = gradeObj.color;

    if (average >= 75) {
      classification = 'First Class with Distinction';
    } else if (average >= 60) {
      classification = 'First Class';
    } else {
      classification = 'Second Class';
    }
  } else if (hasFailedSubject) {
    status = 'Re-appear';
    overallGrade = 'RA';
    overallGradeColor = '#ef4444';
    classification = `Re-appear required in ${failedCount} subject(s)`;
  }

  return {
    totalMarks: Math.round(totalMarks * 100) / 100,
    maxPossibleMarks,
    average: Math.round(average * 100) / 100,
    sgpa: Math.round(sgpa * 100) / 100,
    overallGrade,
    overallGradeColor,
    status,
    classification,
    totalCredits,
    passedSubjectsCount: passedCount,
    failedSubjectsCount: failedCount
  };
}

/**
 * Validates a student record before saving
 */
export function validateStudentRecord(student, existingStudents = [], isEditing = false) {
  const errors = {};

  if (!student.name || student.name.trim().length < 2) {
    errors.name = 'Student Name is required (minimum 2 characters).';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(student.name.trim())) {
    errors.name = 'Student Name must contain only letters and spaces.';
  }

  if (!student.rollNo || student.rollNo.trim().length < 3) {
    errors.rollNo = 'Roll Number is required (minimum 3 characters).';
  } else {
    const duplicate = existingStudents.find(
      s => s.rollNo.trim().toLowerCase() === student.rollNo.trim().toLowerCase() &&
           (!isEditing || s.id !== student.id)
    );
    if (duplicate) {
      errors.rollNo = `Roll Number '${student.rollNo.trim()}' is already assigned to ${duplicate.name}.`;
    }
  }

  if (!student.semester) {
    errors.semester = 'Please select a semester.';
  }

  if (!student.department) {
    errors.department = 'Please select a department.';
  }

  if (!student.subjects || student.subjects.length === 0) {
    errors.subjects = 'At least one subject must be added.';
  } else {
    const subjectErrors = [];
    student.subjects.forEach((sub, idx) => {
      const subErr = {};
      if (!sub.name || sub.name.trim().length === 0) {
        subErr.name = 'Subject name is required.';
      }
      const mark = parseFloat(sub.marks);
      const maxMark = parseFloat(sub.maxMarks) || 100;
      if (isNaN(mark)) {
        subErr.marks = 'Marks required.';
      } else if (mark < 0 || mark > maxMark) {
        subErr.marks = `Marks must be between 0 and ${maxMark}.`;
      }
      const credits = parseFloat(sub.credits);
      if (isNaN(credits) || credits < 1 || credits > 8) {
        subErr.credits = 'Credits must be 1-8.';
      }

      if (Object.keys(subErr).length > 0) {
        subjectErrors[idx] = subErr;
      }
    });

    if (subjectErrors.length > 0) {
      errors.subjectDetails = subjectErrors;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Standard default subjects preset for quick testing
 */
export const DEFAULT_PRESET_SUBJECTS = [
  { id: 'sub-1', code: 'CS301', name: 'Web Development & React', credits: 4, marks: 88, maxMarks: 100 },
  { id: 'sub-2', code: 'CS302', name: 'Database Management Systems', credits: 4, marks: 92, maxMarks: 100 },
  { id: 'sub-3', code: 'CS303', name: 'Data Structures & Algorithms', credits: 4, marks: 78, maxMarks: 100 },
  { id: 'sub-4', code: 'CS304', name: 'Operating Systems', credits: 3, marks: 85, maxMarks: 100 },
  { id: 'sub-5', code: 'CS305', name: 'Full Stack Development Lab', credits: 2, marks: 95, maxMarks: 100 }
];

/**
 * Export student records as CSV
 */
export function exportToCSV(students = []) {
  if (students.length === 0) return;

  const headers = ['Roll No', 'Name', 'Department', 'Semester', 'Total Marks', 'Max Marks', 'Percentage', 'SGPA', 'Grade', 'Status', 'Classification'];
  const rows = students.map(s => [
    `"${s.rollNo}"`,
    `"${s.name}"`,
    `"${s.department}"`,
    `"Semester ${s.semester}"`,
    s.totalMarks,
    s.maxPossibleMarks,
    `${s.average}%`,
    s.sgpa,
    `"${s.overallGrade}"`,
    `"${s.status}"`,
    `"${s.classification}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Student_Grade_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
