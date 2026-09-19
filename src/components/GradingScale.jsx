import React from 'react';

export default function GradingScale() {
  const gradingRules = [
    { range: '90% – 100%', grade: 'A+', remarks: 'Outstanding / Distinction' },
    { range: '80% – 89%', grade: 'A', remarks: 'Excellent' },
    { range: '70% – 79%', grade: 'B', remarks: 'Very Good' },
    { range: '60% – 69%', grade: 'C', remarks: 'Good / First Class' },
    { range: '50% – 59%', grade: 'D', remarks: 'Satisfactory / Second Class' },
    { range: 'Below 50%', grade: 'F', remarks: 'Fail (Must Re-appear)' }
  ];

  return (
    <div className="card">
      <h3>Grading Scheme & Calculation Rules</h3>
      <p className="subtitle">Reference rules used to assign grades and pass/fail results.</p>

      {/* Grading Rules Table */}
      <table className="simple-table">
        <thead>
          <tr>
            <th>Marks Range (Average %)</th>
            <th>Assigned Grade</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {gradingRules.map((rule, index) => (
            <tr key={index}>
              <td><strong>{rule.range}</strong></td>
              <td>
                <span className={`grade-tag grade-${rule.grade}`}>
                  {rule.grade}
                </span>
              </td>
              <td>{rule.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Explanation of Formulas */}
      <div className="info-box">
        <h4>How Calculations Work:</h4>
        <p>
          1. <strong>Total Marks</strong> = Subject 1 + Subject 2 + Subject 3 + Subject 4 + Subject 5 (Maximum 500)
        </p>
        <p>
          2. <strong>Average Percentage</strong> = (Total Marks / 500) × 100
        </p>
        <p>
          3. <strong>Passing Rule</strong> = A student must score at least <strong>50 marks</strong> in each subject to pass.
        </p>
      </div>
    </div>
  );
}
