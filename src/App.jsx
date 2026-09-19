import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GradeCalculator from './components/GradeCalculator';
import StudentRecords from './components/StudentRecords';
import GradingScale from './components/GradingScale';
import { 
  calculateTotal, 
  calculateAverage, 
  calculateGrade, 
  checkPassStatus,
  sampleStudents 
} from './utils/gradeHelper';
import './App.css';

export default function App() {
  // 1. Navigation State: Which page is active ('calculator', 'records', 'scale')
  const [activePage, setActivePage] = useState('calculator');

  // 2. Student Records State: Load from localStorage or use initial sample data
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('grade_calculator_students');
    return saved ? JSON.parse(saved) : sampleStudents;
  });

  // 3. Form Input State
  const [studentData, setStudentData] = useState({
    id: null,
    name: '',
    rollNo: '',
    marks: {
      subject1: '',
      subject2: '',
      subject3: '',
      subject4: '',
      subject5: ''
    }
  });

  // 4. Editing State & Error State
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 5. Live Calculation State
  const [liveTotal, setLiveTotal] = useState(0);
  const [liveAverage, setLiveAverage] = useState(0);
  const [liveGrade, setLiveGrade] = useState('F');
  const [liveStatus, setLiveStatus] = useState('Pending');

  // useEffect 1: Save students to localStorage whenever students list changes
  useEffect(() => {
    localStorage.setItem('grade_calculator_students', JSON.stringify(students));
  }, [students]);

  // useEffect 2: Automatically calculate total, average, and grade whenever marks change
  useEffect(() => {
    const total = calculateTotal(studentData.marks);
    const average = calculateAverage(total, 5);
    const grade = calculateGrade(average);
    const status = checkPassStatus(studentData.marks);

    setLiveTotal(total);
    setLiveAverage(average);
    setLiveGrade(grade);
    setLiveStatus(status);
  }, [studentData.marks]);

  // Handle Form Submission (Save or Update)
  const handleSaveStudent = (e) => {
    e.preventDefault();

    // Client-side Validation: Name check
    if (!studentData.name.trim()) {
      setErrorMessage('Please enter the student name.');
      return;
    }

    // Client-side Validation: Roll Number check
    if (!studentData.rollNo.trim()) {
      setErrorMessage('Please enter the roll number.');
      return;
    }

    // Client-side Validation: Marks range check (0 to 100)
    const marksValues = [
      studentData.marks.subject1,
      studentData.marks.subject2,
      studentData.marks.subject3,
      studentData.marks.subject4,
      studentData.marks.subject5
    ];

    for (let i = 0; i < marksValues.length; i++) {
      const val = marksValues[i];
      if (val === '' || val === null) {
        setErrorMessage(`Please enter marks for Subject ${i + 1}.`);
        return;
      }
      const num = Number(val);
      if (isNaN(num) || num < 0 || num > 100) {
        setErrorMessage(`Marks for Subject ${i + 1} must be a number between 0 and 100.`);
        return;
      }
    }

    // Clear error message if validation passes
    setErrorMessage('');

    // Prepare complete record
    const newRecord = {
      id: isEditing ? studentData.id : Date.now(),
      name: studentData.name.trim(),
      rollNo: studentData.rollNo.trim().toUpperCase(),
      marks: {
        subject1: Number(studentData.marks.subject1),
        subject2: Number(studentData.marks.subject2),
        subject3: Number(studentData.marks.subject3),
        subject4: Number(studentData.marks.subject4),
        subject5: Number(studentData.marks.subject5)
      },
      total: liveTotal,
      average: liveAverage,
      grade: liveGrade,
      status: liveStatus
    };

    if (isEditing) {
      // Update existing student
      setStudents(prev => prev.map(s => s.id === studentData.id ? newRecord : s));
      setIsEditing(false);
    } else {
      // Add new student to the list
      setStudents(prev => [newRecord, ...prev]);
    }

    // Reset form fields
    setStudentData({
      id: null,
      name: '',
      rollNo: '',
      marks: { subject1: '', subject2: '', subject3: '', subject4: '', subject5: '' }
    });

    // Navigate to Records page to see the saved result
    setActivePage('records');
  };

  // Handle Edit: Load student data into calculator
  const handleEditStudent = (student) => {
    setStudentData({
      id: student.id,
      name: student.name,
      rollNo: student.rollNo,
      marks: { ...student.marks }
    });
    setIsEditing(true);
    setErrorMessage('');
    setActivePage('calculator');
  };

  // Handle Delete: Remove student by id
  const handleDeleteStudent = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMessage('');
    setStudentData({
      id: null,
      name: '',
      rollNo: '',
      marks: { subject1: '', subject2: '', subject3: '', subject4: '', subject5: '' }
    });
  };

  return (
    <div className="container">
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        recordCount={students.length}
      />

      {/* Main Content Area */}
      <main className="content">
        {/* Page 1: Grade Calculator */}
        {activePage === 'calculator' && (
          <GradeCalculator
            studentData={studentData}
            setStudentData={setStudentData}
            onSaveStudent={handleSaveStudent}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
            liveTotal={liveTotal}
            liveAverage={liveAverage}
            liveGrade={liveGrade}
            liveStatus={liveStatus}
            errorMessage={errorMessage}
          />
        )}

        {/* Page 2: Student Records */}
        {activePage === 'records' && (
          <StudentRecords
            students={students}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onGoToCalculator={() => {
              handleCancelEdit();
              setActivePage('calculator');
            }}
          />
        )}

        {/* Page 3: Grading Scale */}
        {activePage === 'scale' && (
          <GradingScale />
        )}
      </main>


    </div>
  );
}
