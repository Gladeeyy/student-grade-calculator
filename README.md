# EduGrade Studio — Interactive Student Grade & SGPA Calculator

> **Task 2: Interactive JavaScript and ReactJS Application Development**  
> **Course**: Full Stack Web Development  
> **Section**: III CSE — F Section  
> **Topic Assigned**: Group 1, Problem #5 — *Student Grade Calculator*  
> **Problem Statement**: *"Enter marks, calculate total and average, assign grades, and display results."*

---

## 🌟 Overview & Key Features

**EduGrade Studio** is a responsive, feature-rich ReactJS web application engineered to calculate student marks, determine weighted Semester Grade Point Average (SGPA), assign university standard letter grades (UGC 10-Point Scale), and provide complete academic performance analytics.

### Core Capabilities:
1. **Interactive Grade Calculator (Studio View)**:
   - Dynamic subject rows (add, modify, or remove courses on the fly).
   - Real-time calculations: Total marks, percentage, credit-weighted SGPA, letter grades (`O`, `A+`, `A`, `B+`, `B`, `C`, `RA`), and honours classification.
   - Live real-time preview card that reacts to every keystroke.
   - One-click **"Load 5 CSE Subjects Preset"** for fast demonstration.
   - Celebration confetti animation for high-scoring students (`O` / `A+`).

2. **Strict Form Handling & Client-Side Validation**:
   - Validates student full name (letters only, min 2 characters).
   - Validates roll number format and checks for duplicates.
   - Validates marks input range (`0 <= marks <= 100`) and credits (`1 <= credits <= 8`).
   - Inline error feedback with visual indicators.

3. **Student Records Directory (Full CRUD)**:
   - **Create**: Add evaluated student scorecards with dynamic subjects.
   - **Read**: Interactive table with sorting and filtering.
   - **Update**: Edit existing student marks and credentials with auto-recalculation.
   - **Delete**: Remove records with interactive confirmation prompts.
   - **Search & Filter**: Search by name or roll number; filter by Grade tier (`O`, `A+`, `A`, etc.), Status (`Pass` vs `Re-appear`), and Semester (`1` to `8`).
   - **CSV Export**: Export all filtered records to a standard `.csv` spreadsheet report.

4. **Official Printable Scorecard / Academic Transcript (Modal)**:
   - Institutional transcript layout with course codes, credit hours, points, and total credit points.
   - Built-in **Print / Save as PDF** support (`@media print` clean view).

5. **Class Performance Analytics & Insights Dashboard**:
   - Executive KPIs: Total Students, Class Average %, Pass Percentage %, Class Topper, and At-Risk Count.
   - Visual CSS Bar Chart for **Class Grade Distribution**.
   - **Academic Honor Roll** (Top 3 rankers).
   - **Subject-Wise Performance Analysis** showing average marks across courses.

6. **Grading Scheme Reference Guide**:
   - Complete documentation of the UGC 10-point scale, grade points, percentages, and SGPA calculation formulas.

---

## 🏗️ Project Architecture & Structure

```
student-grade-calculator/
├── index.html                  # HTML5 entry with web fonts and responsive meta
├── package.json                # Dependencies and npm build scripts
├── vite.config.js              # Vite configuration
├── src/
│   ├── main.jsx                # React DOM root entry
│   ├── App.jsx                 # Central application state, routing, and notifications
│   ├── App.css                 # Responsive styling, modern layouts, print media queries
│   ├── index.css               # Global typography, color tokens, and CSS variables
│   ├── utils/
│   │   ├── gradeUtils.js       # Mathematical logic for total, average, SGPA, grades & CSV export
│   │   └── initialData.js      # Pre-seeded classroom sample dataset for instant evaluation
│   └── components/
│       ├── Navbar.jsx          # Brand header, active tab navigation, demo reset actions
│       ├── CalculatorForm.jsx  # Student details + dynamic course mark inputs + validation
│       ├── LivePreviewCard.jsx # Real-time reactive calculation summary card
│       ├── RecordsList.jsx     # Student directory with search, multi-filter, sort & CRUD
│       ├── ScorecardModal.jsx  # Printable official academic transcript
│       ├── AnalyticsView.jsx   # Class KPIs, grade distribution chart & subject breakdown
│       ├── GradingScaleView.jsx# 10-point scale reference & formula guide
│       └── Toast.jsx           # Floating notification toast messages
```

---

## 🧮 Calculation Formulas

### 1. Total Marks & Percentage:
$$\text{Total Marks} = \sum_{i=1}^{n} \text{Marks}_i$$
$$\text{Percentage / Average} = \left( \frac{\text{Total Marks}}{\text{Max Possible Marks}} \right) \times 100$$

### 2. UGC 10-Point Grade Mapping:
| Marks Range (%) | Grade | Grade Point (G) | Description |
|---|---|---|---|
| 90 – 100 | **O** | 10 | Outstanding |
| 80 – 89 | **A+** | 9 | Excellent |
| 70 – 79 | **A** | 8 | Very Good |
| 60 – 69 | **B+** | 7 | Good |
| 55 – 59 | **B** | 6 | Above Average |
| 50 – 54 | **C** | 5 | Average (Pass) |
| 0 – 49 | **RA** | 0 | Re-appear (Fail) |

### 3. Semester Grade Point Average (SGPA):
$$\text{SGPA} = \frac{\sum_{i=1}^{n} (\text{Credits}_i \times \text{Grade Point}_i)}{\sum_{i=1}^{n} \text{Credits}_i}$$

---

## 🚀 How to Run the Project Locally

### Prerequisites:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Steps:
1. Open your terminal / PowerShell in the project directory:
   ```bash
   cd C:\Users\Sam\.gemini\antigravity\scratch\student-grade-calculator
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
   *(On Windows PowerShell, use `npm.cmd install` if script execution policies are restricted).*

3. Start the local development server:
   ```bash
   npm run dev
   ```
   *(or `npm.cmd run dev`)*

4. Open your browser and navigate to the displayed URL (typically `http://localhost:5173`).

5. To create an optimized production build:
   ```bash
   npm run build
   ```

---

## 📤 GitHub Submission Guide

To submit your GitHub repository link as required:

1. Initialize Git in the project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Student Grade Calculator ReactJS application"
   ```

2. Create a new repository on your GitHub account (e.g. `student-grade-calculator`).

3. Link the remote and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/student-grade-calculator.git
   git push -u origin main
   ```

---

## 👨‍🎓 Evaluation Demonstration Workflow

1. **Step 1: Calculator View**
   - Click **"Load 5 CSE Subjects Preset"** to populate pre-configured courses.
   - Enter a student name and roll number.
   - Modify subject marks and show the evaluator how the **Live Preview Card** instantly recalculates SGPA, percentage, and letter grade in real-time.
   - Click **Save to Student Directory** (note the celebration confetti animation!).
2. **Step 2: Records Directory**
   - Demonstrate the search bar by typing a name or roll number.
   - Demonstrate filtering by grade (e.g. filter by `O` or `RA`) and status (`Pass` vs `Re-appear`).
   - Click the **View (Eye)** icon to open the official printable transcript.
   - Click the **Edit (Pencil)** icon to update marks.
   - Click the **Export CSV** button to download a spreadsheet report.
3. **Step 3: Class Analytics**
   - Switch to **Class Analytics** to present the visual grade distribution bar chart, class average, pass percentage, and subject-wise averages.
4. **Step 4: Grading Policy**
   - Switch to **Grading Scheme** to explain the UGC 10-point mathematical formula for SGPA calculation.
