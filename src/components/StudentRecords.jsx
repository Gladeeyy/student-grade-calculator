import React, { useState } from 'react';

export default function StudentRecords({
  students,
  onEditStudent,
  onDeleteStudent,
  onGoToCalculator
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter students based on search term, grade, and status
  const filteredStudents = students.filter(student => {
    // 1. Check if name or roll number matches search text
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Check grade filter
    const matchesGrade = filterGrade === 'ALL' || student.grade === filterGrade;

    // 3. Check status filter (Pass/Fail)
    const matchesStatus = filterStatus === 'ALL' || student.status === filterStatus;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  return (
    <div className="card">
      <div className="records-top-bar">
        <div>
          <h3>Student Records Directory</h3>
          <p className="subtitle">View, search, filter, edit, and delete student records.</p>
        </div>
        <button className="btn btn-primary" onClick={onGoToCalculator}>
          + Calculate New Grade
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls-row">
        {/* Search input */}
        <input
          type="text"
          className="search-field"
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter by Grade */}
        <select
          className="filter-dropdown"
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
        >
          <option value="ALL">All Grades</option>
          <option value="A+">Grade A+</option>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C</option>
          <option value="D">Grade D</option>
          <option value="F">Grade F</option>
        </select>

        {/* Filter by Pass/Fail Status */}
        <select
          className="filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="Pass">Pass Only</option>
          <option value="Fail">Fail Only</option>
        </select>
      </div>

      {/* Records Table */}
      {filteredStudents.length === 0 ? (
        <div className="empty-message">
          <p>No student records found matching your filters.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="simple-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Subject Marks (S1 - S5)</th>
                <th>Total</th>
                <th>Average</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td><strong>{student.rollNo}</strong></td>
                  <td>{student.name}</td>
                  <td>
                    {student.marks.subject1}, {student.marks.subject2}, {student.marks.subject3}, {student.marks.subject4}, {student.marks.subject5}
                  </td>
                  <td>{student.total} / 500</td>
                  <td><strong>{student.average}%</strong></td>
                  <td>
                    <span className={`grade-tag grade-${student.grade}`}>
                      {student.grade}
                    </span>
                  </td>
                  <td>
                    <span className={`status-tag status-${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-sm btn-edit"
                      onClick={() => onEditStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-sm btn-delete"
                      onClick={() => onDeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
