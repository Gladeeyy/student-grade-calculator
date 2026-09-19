import React from 'react';

export default function Navbar({ activePage, setActivePage, recordCount }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Student Grade Calculator</h2>
      </div>

      <div className="nav-buttons">
        <button
          className={`nav-btn ${activePage === 'calculator' ? 'active' : ''}`}
          onClick={() => setActivePage('calculator')}
        >
          1. Grade Calculator
        </button>

        <button
          className={`nav-btn ${activePage === 'records' ? 'active' : ''}`}
          onClick={() => setActivePage('records')}
        >
          2. Student Records ({recordCount})
        </button>

        <button
          className={`nav-btn ${activePage === 'scale' ? 'active' : ''}`}
          onClick={() => setActivePage('scale')}
        >
          3. Grading Scale
        </button>
      </div>
    </nav>
  );
}
