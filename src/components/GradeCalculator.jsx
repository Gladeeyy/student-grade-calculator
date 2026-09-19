import React from 'react';

export default function GradeCalculator({
  studentData,
  setStudentData,
  onSaveStudent,
  isEditing,
  onCancelEdit,
  liveTotal,
  liveAverage,
  liveGrade,
  liveStatus,
  errorMessage
}) {
  // Handle change for Name and Roll Number
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle change for Subject Marks
  const handleMarkChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      marks: {
        ...prev.marks,
        [name]: value
      }
    }));
  };

  // Clear all fields
  const handleClear = () => {
    setStudentData({
      id: null,
      name: '',
      rollNo: '',
      marks: { subject1: '', subject2: '', subject3: '', subject4: '', subject5: '' }
    });
  };

  return (
    <div className="calculator-container">
      <div className="card">
        <h3>{isEditing ? 'Edit Student Marks' : 'Enter Student Marks'}</h3>
        <p className="subtitle">Fill in student details and subject marks (0 - 100).</p>

        {/* Error message display */}
        {errorMessage && (
          <div className="error-box">
            {errorMessage}
          </div>
        )}

        <form onSubmit={onSaveStudent}>
          {/* Student Info Inputs */}
          <div className="form-row">
            <div className="form-group">
              <label>Student Name:</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                value={studentData.name}
                onChange={handleTextChange}
              />
            </div>

            <div className="form-group">
              <label>Roll Number:</label>
              <input
                type="text"
                name="rollNo"
                placeholder="e.g. 23CS105"
                value={studentData.rollNo}
                onChange={handleTextChange}
              />
            </div>
          </div>

          {/* 5 Subject Mark Inputs */}
          <div className="subjects-section">
            <h4>Subject Marks (Out of 100)</h4>

            <div className="subject-input-row">
              <label>Subject 1 (Web Development):</label>
              <input
                type="number"
                name="subject1"
                min="0"
                max="100"
                placeholder="Enter marks"
                value={studentData.marks.subject1}
                onChange={handleMarkChange}
              />
            </div>

            <div className="subject-input-row">
              <label>Subject 2 (Database Systems):</label>
              <input
                type="number"
                name="subject2"
                min="0"
                max="100"
                placeholder="Enter marks"
                value={studentData.marks.subject2}
                onChange={handleMarkChange}
              />
            </div>

            <div className="subject-input-row">
              <label>Subject 3 (Data Structures):</label>
              <input
                type="number"
                name="subject3"
                min="0"
                max="100"
                placeholder="Enter marks"
                value={studentData.marks.subject3}
                onChange={handleMarkChange}
              />
            </div>

            <div className="subject-input-row">
              <label>Subject 4 (Operating Systems):</label>
              <input
                type="number"
                name="subject4"
                min="0"
                max="100"
                placeholder="Enter marks"
                value={studentData.marks.subject4}
                onChange={handleMarkChange}
              />
            </div>

            <div className="subject-input-row">
              <label>Subject 5 (Computer Networks):</label>
              <input
                type="number"
                name="subject5"
                min="0"
                max="100"
                placeholder="Enter marks"
                value={studentData.marks.subject5}
                onChange={handleMarkChange}
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Record' : 'Calculate & Save Record'}
            </button>

            {isEditing ? (
              <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
                Cancel Edit
              </button>
            ) : (
              <button type="button" className="btn btn-secondary" onClick={handleClear}>
                Clear Form
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Live Results Card */}
      <div className="card results-card">
        <h3>Calculated Results</h3>
        <p className="subtitle">Results update automatically as you enter marks.</p>

        <div className="result-item">
          <span className="result-label">Student Name:</span>
          <span className="result-value">{studentData.name || '---'}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Roll Number:</span>
          <span className="result-value">{studentData.rollNo || '---'}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Total Marks:</span>
          <span className="result-value"><strong>{liveTotal}</strong> / 500</span>
        </div>

        <div className="result-item">
          <span className="result-label">Average:</span>
          <span className="result-value"><strong>{liveAverage}%</strong></span>
        </div>

        <div className="result-item">
          <span className="result-label">Grade Assigned:</span>
          <span className={`grade-tag grade-${liveGrade}`}>
            {liveGrade}
          </span>
        </div>

        <div className="result-item">
          <span className="result-label">Final Status:</span>
          <span className={`status-tag status-${liveStatus.toLowerCase()}`}>
            {liveStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
