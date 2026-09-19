import React from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Hash,
  User,
  GraduationCap,
  Calendar,
  Layers
} from 'lucide-react';
import { getGradeForMark, DEFAULT_PRESET_SUBJECTS } from '../utils/gradeUtils';

export default function CalculatorForm({
  formData,
  setFormData,
  errors,
  setErrors,
  onSave,
  isEditing,
  onCancelEdit,
  onLoadPreset
}) {
  // Handle top-level student field change
  const handleStudentFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for that field if exists
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Handle subject field change
  const handleSubjectChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(sub => {
        if (sub.id === id) {
          return { ...sub, [field]: value };
        }
        return sub;
      })
    }));

    if (errors.subjectDetails) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.subjectDetails;
        return next;
      });
    }
  };

  // Add a new blank subject row
  const handleAddSubject = () => {
    const newId = `sub-${Date.now()}`;
    const newSubjectNumber = formData.subjects.length + 1;
    setFormData(prev => ({
      ...prev,
      subjects: [
        ...prev.subjects,
        {
          id: newId,
          code: `SUB${newSubjectNumber}`,
          name: '',
          credits: 3,
          marks: '',
          maxMarks: 100
        }
      ]
    }));
  };

  // Remove a subject row
  const handleRemoveSubject = (id) => {
    if (formData.subjects.length <= 1) {
      alert('At least one subject is required.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(sub => sub.id !== id)
    }));
  };

  return (
    <form className="calculator-form" onSubmit={onSave} noValidate>
      {/* Student Academic Details Card */}
      <div className="form-section card">
        <div className="section-header">
          <div className="section-title-group">
            <span className="section-step">1</span>
            <div>
              <h3>Student & Academic Credentials</h3>
              <p className="text-muted">Enter the student's registration details</p>
            </div>
          </div>
          {isEditing && (
            <span className="badge-editing">Editing Record #{formData.rollNo}</span>
          )}
        </div>

        <div className="form-grid-2">
          {/* Student Name */}
          <div className="form-group">
            <label htmlFor="student-name">
              <User size={15} /> Student Full Name <span className="req">*</span>
            </label>
            <input
              id="student-name"
              type="text"
              name="name"
              placeholder="e.g. Samuel Richard"
              value={formData.name}
              onChange={handleStudentFieldChange}
              className={`input-control ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="student-roll">
              <Hash size={15} /> Roll / Registration Number <span className="req">*</span>
            </label>
            <input
              id="student-roll"
              type="text"
              name="rollNo"
              placeholder="e.g. 23CS145"
              value={formData.rollNo}
              onChange={handleStudentFieldChange}
              className={`input-control ${errors.rollNo ? 'input-error' : ''}`}
            />
            {errors.rollNo && <span className="error-text">{errors.rollNo}</span>}
          </div>

          {/* Department */}
          <div className="form-group">
            <label htmlFor="student-dept">
              <GraduationCap size={15} /> Department / Branch <span className="req">*</span>
            </label>
            <select
              id="student-dept"
              name="department"
              value={formData.department}
              onChange={handleStudentFieldChange}
              className={`input-control ${errors.department ? 'input-error' : ''}`}
            >
              <option value="">Select Department</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Electrical & Electronics">Electrical & Electronics</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
            {errors.department && <span className="error-text">{errors.department}</span>}
          </div>

          {/* Semester & Academic Year Row */}
          <div className="form-subgrid-2">
            <div className="form-group">
              <label htmlFor="student-sem">
                <Layers size={15} /> Semester <span className="req">*</span>
              </label>
              <select
                id="student-sem"
                name="semester"
                value={formData.semester}
                onChange={handleStudentFieldChange}
                className={`input-control ${errors.semester ? 'input-error' : ''}`}
              >
                <option value="">Choose</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
              {errors.semester && <span className="error-text">{errors.semester}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="student-year">
                <Calendar size={15} /> Academic Year
              </label>
              <select
                id="student-year"
                name="academicYear"
                value={formData.academicYear || '2025-2026'}
                onChange={handleStudentFieldChange}
                className="input-control"
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Subjects & Marks Section */}
      <div className="form-section card">
        <div className="section-header subject-header">
          <div className="section-title-group">
            <span className="section-step">2</span>
            <div>
              <h3>Subject Courses & Marks Breakdown</h3>
              <p className="text-muted">Enter subject names, credit weights, and marks (0–100)</p>
            </div>
          </div>

          <div className="subject-header-actions">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onLoadPreset}
              title="Populate 5 standard CSE curriculum courses"
            >
              <Sparkles size={14} />
              <span>Load 5 CSE Subjects Preset</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleAddSubject}
            >
              <Plus size={14} />
              <span>Add Subject</span>
            </button>
          </div>
        </div>

        {errors.subjects && (
          <div className="alert-box alert-error">
            <AlertCircle size={16} />
            <span>{errors.subjects}</span>
          </div>
        )}

        <div className="subjects-table-wrapper">
          <table className="subjects-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th style={{ width: '110px' }}>Course Code</th>
                <th>Course / Subject Name <span className="req">*</span></th>
                <th style={{ width: '100px' }}>Credits <span className="req">*</span></th>
                <th style={{ width: '130px' }}>Marks (out of 100) <span className="req">*</span></th>
                <th style={{ width: '120px' }}>Assigned Grade</th>
                <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.subjects.map((sub, index) => {
                const gradeInfo = getGradeForMark(sub.marks);
                const isFail = gradeInfo.grade === 'RA';
                const hasMark = sub.marks !== '' && !isNaN(parseFloat(sub.marks));

                return (
                  <tr key={sub.id} className={hasMark && isFail ? 'row-arrear' : ''}>
                    <td className="text-muted text-center font-mono">{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        placeholder="CS301"
                        value={sub.code}
                        onChange={(e) => handleSubjectChange(sub.id, 'code', e.target.value.toUpperCase())}
                        className="input-table"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="e.g. Object Oriented Programming"
                        value={sub.name}
                        onChange={(e) => handleSubjectChange(sub.id, 'name', e.target.value)}
                        className={`input-table ${!sub.name && errors.subjectDetails ? 'border-red' : ''}`}
                      />
                    </td>
                    <td>
                      <select
                        value={sub.credits}
                        onChange={(e) => handleSubjectChange(sub.id, 'credits', parseInt(e.target.value) || 3)}
                        className="input-table select-credits"
                      >
                        <option value={1}>1 Credit</option>
                        <option value={2}>2 Credits</option>
                        <option value={3}>3 Credits</option>
                        <option value={4}>4 Credits</option>
                        <option value={5}>5 Credits</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        placeholder="0 - 100"
                        value={sub.marks}
                        onChange={(e) => handleSubjectChange(sub.id, 'marks', e.target.value)}
                        className={`input-table input-mark ${
                          sub.marks < 0 || sub.marks > 100 ? 'border-red' : ''
                        }`}
                      />
                    </td>
                    <td>
                      {hasMark ? (
                        <div className="sub-grade-pill" style={{ backgroundColor: `${gradeInfo.color}15`, color: gradeInfo.color, borderColor: gradeInfo.color }}>
                          <strong>{gradeInfo.grade}</strong>
                          <span>({gradeInfo.point} pts)</span>
                        </div>
                      ) : (
                        <span className="text-muted font-sm">—</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(sub.id)}
                        className="btn-icon btn-delete-row"
                        title="Delete course row"
                        disabled={formData.subjects.length <= 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="subjects-table-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleAddSubject}
          >
            <Plus size={15} />
            <span>Add Another Subject</span>
          </button>
          <span className="font-sm text-muted">
            Total Credits: <strong>{formData.subjects.reduce((sum, s) => sum + (parseFloat(s.credits) || 0), 0)}</strong>
          </span>
        </div>
      </div>

      {/* Form Submission Actions */}
      <div className="form-submit-bar">
        {isEditing && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancelEdit}
          >
            Cancel Edit
          </button>
        )}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            if (window.confirm('Clear all input marks and fields?')) {
              onLoadPreset();
            }
          }}
        >
          <RotateCcw size={16} />
          <span>Reset Form</span>
        </button>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
        >
          <Save size={18} />
          <span>{isEditing ? 'Update Student Record' : 'Save to Student Directory'}</span>
        </button>
      </div>
    </form>
  );
}
