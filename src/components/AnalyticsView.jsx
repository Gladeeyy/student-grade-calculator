import React, { useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Users, 
  CheckCircle2, 
  AlertOctagon, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { GRADE_SCALE } from '../utils/gradeUtils';

export default function AnalyticsView({ students, onViewScorecard }) {
  const stats = useMemo(() => {
    if (!students || students.length === 0) {
      return null;
    }

    const total = students.length;
    const passed = students.filter(s => s.status === 'Pass').length;
    const failed = total - passed;
    const passPercentage = Math.round((passed / total) * 100);

    const totalAvg = students.reduce((acc, s) => acc + s.average, 0) / total;
    const totalSgpa = students.reduce((acc, s) => acc + s.sgpa, 0) / total;

    // Highest and lowest
    const sortedByAvg = [...students].sort((a, b) => b.average - a.average);
    const topper = sortedByAvg[0];
    const lowest = sortedByAvg[sortedByAvg.length - 1];

    // Grade counts
    const gradeDistribution = GRADE_SCALE.map(tier => {
      const count = students.filter(s => s.overallGrade === tier.grade).length;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        ...tier,
        count,
        pct
      };
    });

    // Subject averages across all students
    const subjectMap = {};
    students.forEach(student => {
      student.subjects?.forEach(sub => {
        const subName = sub.name || 'Unnamed Course';
        if (!subjectMap[subName]) {
          subjectMap[subName] = { totalMarks: 0, count: 0, credits: sub.credits };
        }
        subjectMap[subName].totalMarks += (parseFloat(sub.marks) || 0);
        subjectMap[subName].count += 1;
      });
    });

    const subjectAverages = Object.keys(subjectMap).map(name => {
      const data = subjectMap[name];
      const avg = Math.round((data.totalMarks / data.count) * 10) / 10;
      return {
        name,
        avg,
        count: data.count
      };
    }).sort((a, b) => b.avg - a.avg);

    return {
      total,
      passed,
      failed,
      passPercentage,
      classAverage: Math.round(totalAvg * 10) / 10,
      classSgpa: Math.round(totalSgpa * 100) / 100,
      topper,
      lowest,
      topStudents: sortedByAvg.slice(0, 3),
      atRiskStudents: students.filter(s => s.status !== 'Pass'),
      gradeDistribution,
      subjectAverages
    };
  }, [students]);

  if (!stats) {
    return (
      <div className="card empty-state">
        <BarChart3 size={48} className="text-muted" />
        <h3>No Data to Analyze</h3>
        <p className="text-muted">Please add student records in the Grade Calculator first.</p>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      {/* KPI Overview Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrap icon-blue">
            <Users size={22} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Total Students</span>
            <span className="kpi-number">{stats.total}</span>
            <span className="kpi-sub font-xs text-muted">Evaluated in class</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap icon-emerald">
            <TrendingUp size={22} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Class Average %</span>
            <span className="kpi-number">{stats.classAverage}%</span>
            <span className="kpi-sub font-xs text-emerald">Mean SGPA: {stats.classSgpa}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap icon-purple">
            <CheckCircle2 size={22} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Pass Percentage</span>
            <span className="kpi-number">{stats.passPercentage}%</span>
            <span className="kpi-sub font-xs text-muted">{stats.passed} Passed / {stats.failed} Arrears</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap icon-amber">
            <Award size={22} />
          </div>
          <div className="kpi-details">
            <span className="kpi-title">Class Topper</span>
            <span className="kpi-number font-lg truncate">{stats.topper?.name}</span>
            <span className="kpi-sub font-xs text-amber font-semibold">
              {stats.topper?.average}% (SGPA: {stats.topper?.sgpa})
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts & Breakdown Row */}
      <div className="analytics-main-grid">
        {/* Grade Distribution Bar Chart */}
        <div className="card chart-card">
          <div className="chart-header">
            <div>
              <h3>Class Grade Distribution</h3>
              <p className="text-muted font-sm">Number and proportion of students per grade band</p>
            </div>
            <span className="badge-outline">UGC 10-Pt Scale</span>
          </div>

          <div className="distribution-bars">
            {stats.gradeDistribution.map(tier => (
              <div key={tier.grade} className="distribution-bar-row">
                <div className="bar-grade-label">
                  <span className="badge-grade-sm" style={{ backgroundColor: tier.color }}>
                    {tier.grade}
                  </span>
                  <span className="bar-grade-range font-xs text-muted">
                    {tier.min}–{tier.max}%
                  </span>
                </div>

                <div className="bar-track">
                  <div 
                    className="bar-fill" 
                    style={{ 
                      width: `${tier.pct}%`, 
                      backgroundColor: tier.color 
                    }}
                  ></div>
                </div>

                <div className="bar-stats-val">
                  <strong>{tier.count}</strong>
                  <span className="text-muted font-xs">({tier.pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Achievers Honor Roll */}
        <div className="card leaders-card">
          <div className="chart-header">
            <div>
              <h3>Academic Honor Roll</h3>
              <p className="text-muted font-sm">Top ranked students of the session</p>
            </div>
            <Sparkles size={18} className="text-amber" />
          </div>

          <div className="toppers-list">
            {stats.topStudents.map((student, rank) => (
              <div key={student.id} className="topper-row" onClick={() => onViewScorecard(student)}>
                <div className={`rank-badge rank-${rank + 1}`}>
                  #{rank + 1}
                </div>
                <div className="topper-info">
                  <div className="topper-name font-semibold">{student.name}</div>
                  <div className="topper-meta font-xs text-muted">
                    {student.rollNo} • {student.department}
                  </div>
                </div>
                <div className="topper-scores">
                  <div className="topper-pct font-bold" style={{ color: student.overallGradeColor }}>
                    {student.average}%
                  </div>
                  <div className="topper-sgpa font-xs">SGPA: {student.sgpa}</div>
                </div>
              </div>
            ))}
          </div>

          {/* At-risk student alert box */}
          {stats.atRiskStudents.length > 0 ? (
            <div className="at-risk-alert">
              <AlertOctagon size={18} className="text-rose" />
              <div>
                <strong>{stats.atRiskStudents.length} Student(s) Require Re-appear</strong>
                <p className="font-xs text-muted">Students with one or more arrears have been flagged for remedial classes.</p>
              </div>
            </div>
          ) : (
            <div className="all-clear-alert">
              <CheckCircle2 size={18} className="text-emerald" />
              <p className="font-xs">100% Pass record! All students have cleared their courses.</p>
            </div>
          )}
        </div>
      </div>

      {/* Subject Averages Table / Performance Comparison */}
      {stats.subjectAverages.length > 0 && (
        <div className="card subject-analytics-card">
          <div className="chart-header">
            <div className="flex-center gap-2">
              <BookOpen size={20} className="text-indigo" />
              <div>
                <h3>Subject-Wise Class Performance</h3>
                <p className="text-muted font-sm">Average marks scored across all evaluated students</p>
              </div>
            </div>
          </div>

          <div className="subject-bars-grid">
            {stats.subjectAverages.map(sub => {
              const isGood = sub.avg >= 75;
              const isFair = sub.avg >= 60;
              const color = isGood ? '#10b981' : isFair ? '#3b82f6' : '#f59e0b';

              return (
                <div key={sub.name} className="subject-bar-item">
                  <div className="sub-bar-top">
                    <span className="sub-bar-name font-semibold truncate">{sub.name}</span>
                    <span className="sub-bar-val font-mono font-bold" style={{ color }}>
                      {sub.avg} / 100
                    </span>
                  </div>
                  <div className="sub-bar-track">
                    <div 
                      className="sub-bar-fill" 
                      style={{ width: `${Math.min(100, sub.avg)}%`, backgroundColor: color }}
                    ></div>
                  </div>
                  <span className="font-xs text-muted">Evaluated for {sub.count} student(s)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
