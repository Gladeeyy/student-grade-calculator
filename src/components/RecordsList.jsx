import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit3, 
  Eye, 
  PlusCircle, 
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { exportToCSV } from '../utils/gradeUtils';

export default function RecordsList({
  students,
  onEditStudent,
  onDeleteStudent,
  onViewScorecard,
  onNavigateToCalculator
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [sortBy, setSortBy] = useState('percentage-desc');

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return students
      .filter(s => {
        // Search term matching
        const matchesSearch = 
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.department.toLowerCase().includes(searchTerm.toLowerCase());

        // Grade filter
        const matchesGrade = selectedGrade === 'ALL' || s.overallGrade === selectedGrade;

        // Status filter
        const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;

        // Semester filter
        const matchesSem = selectedSemester === 'ALL' || s.semester.toString() === selectedSemester;

        return matchesSearch && matchesGrade && matchesStatus && matchesSem;
      })
      .sort((a, b) => {
        if (sortBy === 'percentage-desc') return b.average - a.average;
        if (sortBy === 'percentage-asc') return a.average - b.average;
        if (sortBy === 'sgpa-desc') return b.sgpa - a.sgpa;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'roll-asc') return a.rollNo.localeCompare(b.rollNo);
        return 0;
      });
  }, [students, searchTerm, selectedGrade, selectedStatus, selectedSemester, sortBy]);

  const handleExport = () => {
    if (filteredStudents.length === 0) {
      alert('No student records available to export.');
      return;
    }
    exportToCSV(filteredStudents);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGrade('ALL');
    setSelectedStatus('ALL');
    setSelectedSemester('ALL');
    setSortBy('percentage-desc');
  };

  return (
    <div className="records-page card">
      {/* Directory Title & Controls Header */}
      <div className="records-header">
        <div>
          <h2 className="records-title">Student Grade Records Directory</h2>
          <p className="text-muted">Manage, filter, search, view, and export student performance records</p>
        </div>

        <div className="records-header-buttons">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleExport}
            title="Download CSV report of current records"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={onNavigateToCalculator}
          >
            <PlusCircle size={15} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="filter-toolbar">
        {/* Search Input */}
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>

        {/* Filters Group */}
        <div className="filter-selects-group">
          {/* Grade Filter */}
          <div className="filter-select-wrapper">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Grades</option>
              <option value="O">Grade O (90-100%)</option>
              <option value="A+">Grade A+ (80-89%)</option>
              <option value="A">Grade A (70-79%)</option>
              <option value="B+">Grade B+ (60-69%)</option>
              <option value="B">Grade B (55-59%)</option>
              <option value="C">Grade C (50-54%)</option>
              <option value="RA">Grade RA (Fail)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-select-wrapper">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pass">Pass Only</option>
              <option value="Re-appear">Re-appear Only</option>
            </select>
          </div>

          {/* Semester Filter */}
          <div className="filter-select-wrapper">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="filter-select-wrapper">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="percentage-desc">Sort: Highest % First</option>
              <option value="percentage-asc">Sort: Lowest % First</option>
              <option value="sgpa-desc">Sort: Highest SGPA</option>
              <option value="name-asc">Sort: Student Name (A-Z)</option>
              <option value="roll-asc">Sort: Roll Number</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary Bar */}
      <div className="results-count-bar">
        <span>
          Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> student records
        </span>
        {(searchTerm || selectedGrade !== 'ALL' || selectedStatus !== 'ALL' || selectedSemester !== 'ALL') && (
          <button className="btn-link font-sm" onClick={handleClearFilters}>
            Clear all filters
          </button>
        )}
      </div>

      {/* Records Table */}
      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <Search size={36} />
          </div>
          <h3>No Student Records Found</h3>
          <p className="text-muted">Try changing your search terms or filter selections.</p>
          <button className="btn btn-secondary btn-sm" onClick={handleClearFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Branch & Sem</th>
                <th>Total Marks</th>
                <th>Percentage</th>
                <th>SGPA</th>
                <th>Grade</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => {
                const isPass = student.status === 'Pass';
                return (
                  <tr key={student.id} className="student-row">
                    <td className="font-mono font-bold text-primary-dark">
                      {student.rollNo}
                    </td>
                    <td>
                      <div className="student-cell-name font-semibold">{student.name}</div>
                      <div className="font-xs text-muted">{student.academicYear || '2025-2026'}</div>
                    </td>
                    <td>
                      <div className="font-sm">{student.department}</div>
                      <div className="font-xs text-muted">Sem {student.semester}</div>
                    </td>
                    <td className="font-mono">
                      {student.totalMarks} / {student.maxPossibleMarks}
                    </td>
                    <td>
                      <div className="font-bold">{student.average}%</div>
                      <div className="percentage-mini-bar">
                        <div 
                          className="mini-bar-fill" 
                          style={{ 
                            width: `${Math.min(100, student.average)}%`,
                            backgroundColor: student.overallGradeColor 
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="font-mono font-bold" style={{ color: student.overallGradeColor }}>
                      {student.sgpa.toFixed(2)}
                    </td>
                    <td>
                      <span 
                        className="badge-grade"
                        style={{ 
                          backgroundColor: `${student.overallGradeColor}18`, 
                          color: student.overallGradeColor,
                          borderColor: student.overallGradeColor 
                        }}
                      >
                        {student.overallGrade}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${isPass ? 'badge-pass' : 'badge-fail'}`}>
                        {isPass ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
                        <span>{student.status}</span>
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="actions-cell">
                        <button
                          className="btn-action btn-action-view"
                          onClick={() => onViewScorecard(student)}
                          title="View & Print Official Transcript"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-action btn-action-edit"
                          onClick={() => onEditStudent(student)}
                          title="Edit Marks & Details"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className="btn-action btn-action-delete"
                          onClick={() => onDeleteStudent(student.id, student.name)}
                          title="Delete Student Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
