import React from 'react';
import { 
  Calculator, 
  Users, 
  BarChart3, 
  BookOpen, 
  GraduationCap, 
  PlusCircle, 
  RotateCcw
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  recordsCount, 
  onResetData, 
  onOpenNewCalculation 
}) {
  const navItems = [
    { id: 'calculator', label: 'Grade Calculator', icon: Calculator },
    { id: 'records', label: 'Student Records', icon: Users, badge: recordsCount },
    { id: 'analytics', label: 'Class Analytics', icon: BarChart3 },
    { id: 'scale', label: 'Grading Scheme', icon: BookOpen }
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand" onClick={() => setActiveTab('calculator')}>
          <div className="brand-icon-wrapper">
            <GraduationCap className="brand-icon" size={26} />
          </div>
          <div>
            <h1 className="brand-title">EduGrade <span>Studio</span></h1>
            <p className="brand-subtitle">Student Grade & SGPA Evaluation System</p>
          </div>
        </div>

        <nav className="navbar-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onResetData}
            title="Reload default sample students"
          >
            <RotateCcw size={15} />
            <span className="hide-mobile">Reset Demo Data</span>
          </button>
          
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              onOpenNewCalculation();
              setActiveTab('calculator');
            }}
          >
            <PlusCircle size={15} />
            <span className="hide-mobile">New Calculation</span>
          </button>
        </div>
      </div>
    </header>
  );
}
