import React from 'react';
import { BookOpen, Award, CheckCircle, Calculator, Info } from 'lucide-react';
import { GRADE_SCALE } from '../utils/gradeUtils';

export default function GradingScaleView() {
  return (
    <div className="scale-page card">
      <div className="scale-header">
        <div className="flex-center gap-2">
          <BookOpen className="text-primary" size={26} />
          <div>
            <h2>Academic Grading Scheme & Evaluation Policy</h2>
            <p className="text-muted">Standard UGC 10-Point Letter Grading System and SGPA Computation Guidelines</p>
          </div>
        </div>
      </div>

      {/* Grade Matrix Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Grade</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Grade Points</th>
              <th style={{ width: '150px' }}>Marks Range (%)</th>
              <th>Qualitative Performance</th>
              <th>Academic Definition</th>
            </tr>
          </thead>
          <tbody>
            {GRADE_SCALE.map(tier => (
              <tr key={tier.grade}>
                <td style={{ textAlign: 'center' }}>
                  <span 
                    className="badge-grade font-bold"
                    style={{ 
                      backgroundColor: `${tier.color}20`, 
                      color: tier.color,
                      borderColor: tier.color 
                    }}
                  >
                    {tier.grade}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }} className="font-mono font-bold">
                  {tier.point}
                </td>
                <td className="font-mono">
                  {tier.min} – {tier.max}%
                </td>
                <td className="font-semibold" style={{ color: tier.color }}>
                  {tier.description}
                </td>
                <td className="font-sm text-muted">
                  {tier.grade === 'O' && 'Demonstrates mastery of subject matter far exceeding expectations.'}
                  {tier.grade === 'A+' && 'Demonstrates superior analytical and practical comprehension.'}
                  {tier.grade === 'A' && 'Thorough understanding of concepts and good performance.'}
                  {tier.grade === 'B+' && 'Satisfactory execution with above-standard competencies.'}
                  {tier.grade === 'B' && 'Competent understanding meeting fundamental expectations.'}
                  {tier.grade === 'C' && 'Minimum passing standard achieved.'}
                  {tier.grade === 'RA' && 'Course criteria not cleared. Must re-appear in next examination.'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulas & Calculations Guide */}
      <div className="formula-cards-grid">
        <div className="formula-card">
          <div className="formula-card-header">
            <Calculator size={18} className="text-indigo" />
            <h4>Semester Grade Point Average (SGPA)</h4>
          </div>
          <p className="font-sm text-muted">
            The weighted sum of grade points earned in all courses divided by total credits registered:
          </p>
          <div className="formula-math-box font-mono">
            SGPA = ∑ ( Credits × Grade Point ) / ∑ ( Credits )
          </div>
          <ul className="formula-bullet-list font-xs text-muted">
            <li>Where <strong>Credits</strong> is the credit value assigned to each course.</li>
            <li><strong>Grade Point</strong> is mapped from individual subject marks out of 100.</li>
          </ul>
        </div>

        <div className="formula-card">
          <div className="formula-card-header">
            <Award size={18} className="text-amber" />
            <h4>Degree Honours & Classification</h4>
          </div>
          <ul className="classification-guide-list">
            <li>
              <span className="bullet-dot bg-emerald"></span>
              <div>
                <strong>First Class with Distinction:</strong>
                <p className="font-xs text-muted">Overall Average ≥ 75% or SGPA ≥ 7.50 with NO failed/arrear subjects in first attempt.</p>
              </div>
            </li>
            <li>
              <span className="bullet-dot bg-blue"></span>
              <div>
                <strong>First Class:</strong>
                <p className="font-xs text-muted">Overall Average ≥ 60% and &lt; 75% or SGPA between 6.00 and 7.49.</p>
              </div>
            </li>
            <li>
              <span className="bullet-dot bg-purple"></span>
              <div>
                <strong>Second Class:</strong>
                <p className="font-xs text-muted">Overall Average ≥ 50% and &lt; 60% or SGPA between 5.00 and 5.99.</p>
              </div>
            </li>
            <li>
              <span className="bullet-dot bg-rose"></span>
              <div>
                <strong>Re-appear (RA):</strong>
                <p className="font-xs text-muted">Scoring &lt; 50% in any individual course requires a re-examination attempt.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
