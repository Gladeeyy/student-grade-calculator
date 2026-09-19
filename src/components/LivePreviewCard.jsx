import React from 'react';
import { Award, CheckCircle2, AlertTriangle, BookOpen, Percent, Flame } from 'lucide-react';

export default function LivePreviewCard({ student, calculation }) {
  const {
    totalMarks,
    maxPossibleMarks,
    average,
    sgpa,
    overallGrade,
    overallGradeColor,
    status,
    classification,
    totalCredits,
    passedSubjectsCount,
    failedSubjectsCount
  } = calculation;

  const isPass = status === 'Pass';

  return (
    <div className="live-preview-card">
      <div className="card-header-badge">
        <span className="pulse-indicator"></span>
        <span>Real-Time Computation Preview</span>
      </div>

      <div className="preview-student-info">
        <h3 className="preview-name">{student.name.trim() || 'Student Name'}</h3>
        <p className="preview-meta">
          <span>{student.rollNo.trim() ? `Roll: ${student.rollNo.trim()}` : 'Roll: ---'}</span>
          <span>•</span>
          <span>{student.semester ? `Semester ${student.semester}` : 'Semester --'}</span>
          <span>•</span>
          <span>{student.department || 'Department'}</span>
        </p>
      </div>

      <div className="preview-grade-hero" style={{ borderColor: overallGradeColor }}>
        <div className="grade-badge-circle" style={{ backgroundColor: overallGradeColor }}>
          <span className="grade-letter">{overallGrade}</span>
          <span className="grade-label">Grade</span>
        </div>

        <div className="grade-stats-inline">
          <div className="stat-unit">
            <span className="stat-unit-label">Calculated SGPA</span>
            <span className="stat-unit-val" style={{ color: overallGradeColor }}>
              {sgpa.toFixed(2)}
              <span className="stat-max">/10.0</span>
            </span>
          </div>

          <div className="stat-unit">
            <span className="stat-unit-label">Overall Percentage</span>
            <span className="stat-unit-val">
              {average.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="score-progress-container">
        <div className="score-progress-labels">
          <span>Total Marks: <strong>{totalMarks}</strong> / {maxPossibleMarks}</span>
          <span>{average.toFixed(1)}%</span>
        </div>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${Math.min(100, Math.max(0, average))}%`,
              backgroundColor: overallGradeColor 
            }}
          ></div>
        </div>
      </div>

      {/* Status & Classification Badges */}
      <div className="preview-badges-grid">
        <div className={`status-pill ${isPass ? 'status-pass' : 'status-fail'}`}>
          {isPass ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>{status}</span>
        </div>

        <div className="classification-pill" title="University Academic Classification">
          <Award size={16} />
          <span>{classification}</span>
        </div>
      </div>

      {/* Breakdown Pills */}
      <div className="preview-sub-metrics">
        <div className="metric-pill">
          <BookOpen size={14} />
          <span>{student.subjects?.length || 0} Subjects</span>
        </div>
        <div className="metric-pill">
          <Flame size={14} />
          <span>{totalCredits} Credits</span>
        </div>
        <div className="metric-pill text-emerald">
          <span>✓ {passedSubjectsCount} Cleared</span>
        </div>
        {failedSubjectsCount > 0 && (
          <div className="metric-pill text-rose">
            <span>✗ {failedSubjectsCount} Arrear</span>
          </div>
        )}
      </div>

      <div className="preview-footer-note">
        <small>* Calculations update instantly with credit weights as marks are entered.</small>
      </div>
    </div>
  );
}
