import React from 'react';
import { X, Printer, Award, CheckCircle, AlertTriangle, GraduationCap } from 'lucide-react';
import { getGradeForMark } from '../utils/gradeUtils';

export default function ScorecardModal({ student, onClose }) {
  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  const isPass = student.status === 'Pass';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container print-area" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <GraduationCap className="modal-header-icon" size={24} />
            <div>
              <h3>Official Academic Transcript & Scorecard</h3>
              <p className="text-muted font-sm">Department Examination Evaluation Record</p>
            </div>
          </div>
          <div className="modal-header-actions no-print">
            <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button className="btn-icon" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="scorecard-body">
          {/* Institutional Watermark / Banner */}
          <div className="transcript-banner">
            <h2>NATIONAL INSTITUTE OF TECHNOLOGY & ADVANCED STUDIES</h2>
            <p>Office of the Controller of Examinations • Grade Report Card</p>
          </div>

          {/* Student Info Box */}
          <div className="transcript-meta-grid">
            <div className="meta-item">
              <span className="meta-label">STUDENT NAME:</span>
              <span className="meta-value font-bold">{student.name}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">REGISTER NUMBER:</span>
              <span className="meta-value font-mono font-bold">{student.rollNo}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">DEPARTMENT / PROGRAM:</span>
              <span className="meta-value">{student.department}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SEMESTER & YEAR:</span>
              <span className="meta-value">Semester {student.semester} ({student.academicYear || '2025-2026'})</span>
            </div>
          </div>

          {/* Detailed Course Marks Table */}
          <div className="transcript-table-wrapper">
            <table className="transcript-table">
              <thead>
                <tr>
                  <th style={{ width: '45px' }}>S.No</th>
                  <th style={{ width: '90px' }}>Course Code</th>
                  <th>Course Title</th>
                  <th style={{ width: '70px', textAlign: 'center' }}>Credits</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Marks</th>
                  <th style={{ width: '75px', textAlign: 'center' }}>Grade</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Points (G)</th>
                  <th style={{ width: '85px', textAlign: 'center' }}>Credit Pts (C×G)</th>
                </tr>
              </thead>
              <tbody>
                {student.subjects?.map((sub, idx) => {
                  const gradeObj = getGradeForMark(sub.marks);
                  const credit = parseFloat(sub.credits) || 3;
                  const mark = parseFloat(sub.marks) || 0;
                  const creditPoints = gradeObj.point * credit;

                  return (
                    <tr key={sub.id || idx}>
                      <td className="text-center text-muted">{idx + 1}</td>
                      <td className="font-mono">{sub.code || `CS${idx + 101}`}</td>
                      <td className="font-semibold">{sub.name}</td>
                      <td className="text-center">{credit}</td>
                      <td className="text-center font-mono">{mark}</td>
                      <td className="text-center">
                        <span 
                          className="badge-grade" 
                          style={{ 
                            backgroundColor: `${gradeObj.color}20`, 
                            color: gradeObj.color,
                            borderColor: gradeObj.color
                          }}
                        >
                          {gradeObj.grade}
                        </span>
                      </td>
                      <td className="text-center font-mono">{gradeObj.point}</td>
                      <td className="text-center font-mono font-semibold">{creditPoints}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Consolidated Academic Result Summary */}
          <div className="transcript-summary-grid">
            <div className="summary-stat-box">
              <span className="sum-label">Total Marks</span>
              <span className="sum-value">{student.totalMarks} / {student.maxPossibleMarks}</span>
            </div>

            <div className="summary-stat-box">
              <span className="sum-label">Percentage</span>
              <span className="sum-value">{student.average}%</span>
            </div>

            <div className="summary-stat-box">
              <span className="sum-label">SGPA</span>
              <span className="sum-value font-bold" style={{ color: student.overallGradeColor }}>
                {student.sgpa.toFixed(2)}
              </span>
            </div>

            <div className="summary-stat-box">
              <span className="sum-label">Final Letter Grade</span>
              <span className="sum-value font-bold" style={{ color: student.overallGradeColor }}>
                {student.overallGrade}
              </span>
            </div>

            <div className="summary-stat-box">
              <span className="sum-label">Final Result</span>
              <span className={`sum-value font-bold ${isPass ? 'text-emerald' : 'text-rose'}`}>
                {student.status}
              </span>
            </div>
          </div>

          <div className="transcript-honors-card">
            <Award size={20} style={{ color: student.overallGradeColor }} />
            <div>
              <strong>Academic Classification:</strong> {student.classification}
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="transcript-signature-row">
            <div className="sig-block">
              <div className="sig-line"></div>
              <span>Evaluator Signature</span>
            </div>
            <div className="sig-block seal-block">
              <div className="official-seal">OFFICIAL TRANSCRIPT SEAL</div>
            </div>
            <div className="sig-block">
              <div className="sig-line"></div>
              <span>Controller of Examinations</span>
            </div>
          </div>
        </div>

        <div className="modal-footer no-print">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Scorecard
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Student Scorecard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
