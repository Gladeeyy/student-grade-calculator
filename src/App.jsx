import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import CalculatorForm from './components/CalculatorForm';
import LivePreviewCard from './components/LivePreviewCard';
import RecordsList from './components/RecordsList';
import AnalyticsView from './components/AnalyticsView';
import GradingScaleView from './components/GradingScaleView';
import ScorecardModal from './components/ScorecardModal';
import Toast from './components/Toast';
import { 
  computeStudentResults, 
  validateStudentRecord, 
  DEFAULT_PRESET_SUBJECTS 
} from './utils/gradeUtils';
import { INITIAL_STUDENTS } from './utils/initialData';
import './App.css';

const LOCAL_STORAGE_KEY = 'edugrade_students_v1';

export default function App() {
  // Navigation tab: 'calculator' | 'records' | 'analytics' | 'scale'
  const [activeTab, setActiveTab] = useState('calculator');

  // Students list with LocalStorage persistence
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to parse saved students:', err);
    }
    return INITIAL_STUDENTS;
  });

  // Save to LocalStorage whenever students change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [students]);

  // Initial blank form data
  const createBlankForm = () => ({
    id: `rec-${Date.now()}`,
    rollNo: '',
    name: '',
    department: 'Computer Science & Engineering',
    semester: '5',
    academicYear: '2025-2026',
    subjects: [
      { id: 'sub-1', code: 'CS501', name: 'Full Stack Web Dev', credits: 4, marks: '', maxMarks: 100 },
      { id: 'sub-2', code: 'CS502', name: 'Software Engineering', credits: 4, marks: '', maxMarks: 100 },
      { id: 'sub-3', code: 'CS503', name: 'Computer Networks', credits: 3, marks: '', maxMarks: 100 },
      { id: 'sub-4', code: 'CS504', name: 'Cloud Computing', credits: 3, marks: '', maxMarks: 100 }
    ]
  });

  const [formData, setFormData] = useState(createBlankForm);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedScorecardStudent, setSelectedScorecardStudent] = useState(null);
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Real-time calculation using useEffect & useMemo
  const currentCalculation = useMemo(() => {
    return computeStudentResults(formData.subjects);
  }, [formData.subjects]);

  // Handle saving (Add or Edit)
  const handleSaveStudent = (e) => {
    e.preventDefault();

    const validation = validateStudentRecord(formData, students, isEditing);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setToast({
        type: 'error',
        message: 'Please resolve form validation errors before saving.'
      });
      return;
    }

    const computed = computeStudentResults(formData.subjects);
    const completeStudentRecord = {
      ...formData,
      ...computed,
      dateModified: new Date().toISOString().split('T')[0]
    };

    if (isEditing) {
      setStudents(prev => prev.map(s => s.id === formData.id ? completeStudentRecord : s));
      setIsEditing(false);
      setToast({
        type: 'success',
        message: `Updated student record for ${formData.name} (${formData.rollNo}) successfully!`
      });
    } else {
      setStudents(prev => [completeStudentRecord, ...prev]);
      setToast({
        type: 'success',
        message: `Saved student record for ${formData.name} (${formData.rollNo})!`
      });

      // Confetti celebration if high grade scored!
      if (computed.overallGrade === 'O' || computed.overallGrade === 'A+') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }

    // Reset form to blank
    setFormData(createBlankForm());
    setErrors({});
    setActiveTab('records');
  };

  // Edit existing student
  const handleEditStudent = (student) => {
    setFormData({
      id: student.id,
      rollNo: student.rollNo,
      name: student.name,
      department: student.department,
      semester: student.semester,
      academicYear: student.academicYear || '2025-2026',
      subjects: student.subjects.map(s => ({ ...s }))
    });
    setIsEditing(true);
    setErrors({});
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(createBlankForm());
    setErrors({});
  };

  // Delete student
  const handleDeleteStudent = (id, studentName) => {
    if (window.confirm(`Are you sure you want to delete the record for ${studentName}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setToast({
        type: 'info',
        message: `Deleted record for ${studentName}.`
      });
    }
  };

  // Quick Preset subjects loader
  const handleLoadPreset = () => {
    setFormData(prev => ({
      ...prev,
      subjects: DEFAULT_PRESET_SUBJECTS.map(s => ({ ...s }))
    }));
    setToast({
      type: 'info',
      message: 'Loaded standard 5-course CSE curriculum preset with sample marks.'
    });
  };

  // Reset to initial demo data
  const handleResetData = () => {
    if (window.confirm('Reset all records back to the default sample classroom dataset?')) {
      setStudents(INITIAL_STUDENTS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
      setToast({
        type: 'info',
        message: 'Reset to initial demonstration dataset.'
      });
    }
  };

  // Open a fresh calculation
  const handleOpenNewCalculation = () => {
    setIsEditing(false);
    setFormData(createBlankForm());
    setErrors({});
  };

  return (
    <div className="app-container">
      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        recordsCount={students.length}
        onResetData={handleResetData}
        onOpenNewCalculation={handleOpenNewCalculation}
      />

      {/* Main Content Pages / Views */}
      <main className="main-content">
        {activeTab === 'calculator' && (
          <div className="calculator-view-grid">
            <div className="calculator-form-column">
              <CalculatorForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                onSave={handleSaveStudent}
                isEditing={isEditing}
                onCancelEdit={handleCancelEdit}
                onLoadPreset={handleLoadPreset}
              />
            </div>

            <div className="calculator-preview-column">
              <div className="sticky-preview-wrapper">
                <LivePreviewCard 
                  student={formData} 
                  calculation={currentCalculation} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <RecordsList
            students={students}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onViewScorecard={setSelectedScorecardStudent}
            onNavigateToCalculator={() => {
              handleOpenNewCalculation();
              setActiveTab('calculator');
            }}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView 
            students={students} 
            onViewScorecard={setSelectedScorecardStudent}
          />
        )}

        {activeTab === 'scale' && (
          <GradingScaleView />
        )}
      </main>

      {/* Official Scorecard Transcript Modal */}
      {selectedScorecardStudent && (
        <ScorecardModal
          student={selectedScorecardStudent}
          onClose={() => setSelectedScorecardStudent(null)}
        />
      )}

      {/* Footer */}
      <footer className="app-footer no-print">
        <div className="footer-content">
          <p>
            <strong>Task 2: Interactive JavaScript and ReactJS Application Development</strong>
          </p>
          <p className="footer-sub">
            Full Stack Web Development (III CSE — F Section) • Individual Self-Learning Project: Student Grade Calculator
          </p>
        </div>
      </footer>
    </div>
  );
}
