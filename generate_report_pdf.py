import os
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class PDFReport(FPDF):
    def header(self):
        # Clean header without watermark text
        pass

    def footer(self):
        # Footer for Page 2 and onwards
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(150, 150, 150)
            self.cell(0, 10, f"Page {self.page_no()}", align="C")

def draw_table_row(pdf, y, label, value, label_bg_color, border_color):
    # Left Cell (Label)
    pdf.set_fill_color(*label_bg_color)
    pdf.set_draw_color(*border_color)
    pdf.set_line_width(0.2)
    pdf.rect(20, y, 62, 8, "DF")
    
    # Right Cell (Value)
    pdf.set_fill_color(255, 255, 255)
    pdf.rect(82, y, 108, 8, "DF")
    
    # Label Text
    pdf.set_xy(22, y + 1.5)
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(58, 5, label, align="L")
    
    # Value Text
    pdf.set_xy(84, y + 1.5)
    pdf.set_font("Helvetica", "", 8)
    pdf.cell(104, 5, value, align="L")

def generate_pdf_report():
    pdf = PDFReport()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Margins: 20mm left, right, top
    pdf.set_left_margin(20)
    pdf.set_right_margin(20)
    pdf.set_top_margin(20)
    
    # =========================================================================
    # PAGE 1: TITLE COVER (Exact SRM Institute Layout)
    # =========================================================================
    pdf.add_page()
    
    # Top Header Banner
    pdf.set_fill_color(11, 44, 101) # SRM Navy Blue
    pdf.rect(20, 20, 170, 20, "F")
    
    # Banner Text
    pdf.set_xy(20, 23)
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(170, 6, "SRM INSTITUTE OF SCIENCE AND TECHNOLOGY", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(170, 5, "TRICHY CAMPUS | DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING", align="C", new_x="LMARGIN", new_y="NEXT")
    
    # Core Titles
    pdf.ln(18)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(11, 44, 101)
    pdf.cell(170, 9, "FULL STACK WEB DEVELOPMENT", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.ln(1)
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(170, 7, "TASK 2: INTERACTIVE REACTJS APPLICATION DEVELOPMENT", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(75, 85, 99)
    pdf.cell(170, 6, "Subject Code: 21CSE354T  |  Individual Self-Learning Assignment", align="C", new_x="LMARGIN", new_y="NEXT")
    
    # Table 1 - Student Metadata
    t1_data = [
        ("STUDENT NAME", "S.Sam Glad Priyan"),
        ("REGISTER NUMBER", "RA2411003050138"),
        ("PROGRAM / SECTION", "Computer Science Engineering / \"F\" Section"),
        ("YEAR / SEMESTER", "III-Year / V-Semester"),
        ("PROBLEM STATEMENT", "Group 1 (Education) / No. 5: Student Grade Calculator"),
        ("DATE OF SUBMISSION", "01/10/2026")
    ]
    t1_y = 96
    for idx, (lbl, val) in enumerate(t1_data):
        draw_table_row(pdf, t1_y + idx * 8, lbl, val, (221, 235, 247), (189, 215, 238))
        
    # Table 2 - Course Metadata
    t2_data = [
        ("COURSE", "Full Stack Web Development (21CSE354T)"),
        ("FACULTY COORDINATOR", "Dr. P. Hariharan"),
        ("ACADEMIC YEAR", "2024 - 2028")
    ]
    t2_y = 154
    for idx, (lbl, val) in enumerate(t2_data):
        draw_table_row(pdf, t2_y + idx * 8, lbl, val, (242, 242, 242), (217, 217, 217))
        


    # =========================================================================
    # PAGE 2: REPORT CONTENT - Intro, Features, Architecture
    # =========================================================================
    pdf.add_page()
    pdf.set_text_color(31, 41, 55)
    
    def print_section(title):
        pdf.ln(3)
        pdf.set_font("Helvetica", "B", 13)
        pdf.set_text_color(37, 99, 235) # Blue accent
        pdf.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)
        pdf.set_text_color(31, 41, 55)

    def print_subsection(title):
        pdf.ln(2)
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.cell(0, 6, title, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)

    # 1. Introduction
    print_section("1. Introduction")
    pdf.set_font("Helvetica", "", 9.5)
    intro_txt = (
        "This report outlines the design, architecture, and implementation of the Student Grade Calculator "
        "interactive web application developed for Task 2 (Problem Statement No. 5: \"Enter marks, calculate total "
        "and average, assign grades, and display results\"). Built using ReactJS, modern HTML5, and CSS3, the project "
        "conforms strictly to self-learning course requirements. It provides a clean, beginner-friendly architecture "
        "free of unnecessary animations, focusing on clear component-driven state management, responsive user interface "
        "design, and accurate client-side computational logic."
    )
    pdf.multi_cell(0, 5.2, intro_txt)
    
    # 2. Key Features
    print_section("2. Key Features")
    features = [
        ("Marks Entry & Validation", "Accepts student name, roll number, and 5 subject marks (Web Dev, DBMS, DSA, OS, Networks) with strict client-side validation for numbers between 0 and 100."),
        ("Real-Time Calculations", "Automatically computes Total Marks (out of 500), Average Percentage (%), Letter Grade, and Pass/Fail status instantly as marks are entered, with zero page reloads."),
        ("University Grading Scale", "Maps computed percentages to standard letter grades: A+ (>=90%), A (>=80%), B (>=70%), C (>=60%), D (>=50%), and F (<50%)."),
        ("Pass / Fail Evaluation", "Enforces academic passing criteria requiring a minimum of 50 marks in each individual subject. Falling below 50 in any course marks the student as 'Fail'."),
        ("Interactive Records Directory", "Maintains an interactive table supporting full CRUD operations: Add new records, Search by name/roll no, Filter by Grade/Status, Edit existing marks, and Delete records."),
        ("LocalStorage Data Persistence", "Saves all student records in browser localStorage to retain evaluation data across browser sessions.")
    ]
    for title, desc in features:
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.cell(5, 5, "- ")
        pdf.cell(52, 5, title + ": ", new_x=XPos.RIGHT, new_y=YPos.LAST)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.multi_cell(0, 5, desc)
        pdf.ln(1)

    # 3. Architecture & Implementation
    print_section("3. Architecture & Implementation")
    
    print_subsection("Component Hierarchy")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.multi_cell(0, 5.2, "The application is structured into four focused, decoupled React components under src/components/: (1) Navbar.jsx manages tab-based view switching; (2) GradeCalculator.jsx handles the marks input form and live calculated results box; (3) StudentRecords.jsx renders the searchable and filterable directory table; and (4) GradingScale.jsx displays the academic grading reference table.")
    
    print_subsection("State Management & React Hooks (useState & useEffect)")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.multi_cell(0, 5.2, "State is managed centrally in App.jsx using React useState to track activePage, students list, form inputs (studentData), and live computed totals. React useEffect is leveraged in two distinct ways: first, as a reactive observer that auto-calculates total, average, and grade whenever marks inputs mutate; and second, to synchronize the student records array with localStorage on every state change.")
    
    print_subsection("CSS Design & Layout")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.multi_cell(0, 5.2, "Styling is implemented in App.css using clean, semantic CSS grid and flexbox without any complex keyframe animations or transitions. This ensures fast rendering, high legibility, and predictable behavior during live evaluation.")

    # =========================================================================
    # PAGE 3: APPLICATION WORKFLOW & SCREENSHOTS
    # =========================================================================
    pdf.add_page()
    
    print_section("4. Application Workflow & Screenshots")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.multi_cell(0, 5.2, "The user interacts with the system through three dedicated functional views. Below are the verified screenshots captured during live local execution:")
    pdf.ln(2)

    # Screenshot 1
    s1_path = r"C:\Users\Sam\Desktop\student-grade-calculator\screenshots\grade-calculator.png"
    if os.path.exists(s1_path):
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(0, 5, "Figure 1: Grade Calculator View - Form Entry & Live Calculated Results", new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)
        pdf.image(s1_path, x=20, y=pdf.get_y(), w=170, h=64)
        pdf.set_y(pdf.get_y() + 66)
    
    pdf.ln(2)
    # Screenshot 2
    s2_path = r"C:\Users\Sam\Desktop\student-grade-calculator\screenshots\student-records.png"
    if os.path.exists(s2_path):
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(0, 5, "Figure 2: Student Records Directory - Search, Filter by Grade/Status, Edit & Delete", new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)
        pdf.image(s2_path, x=20, y=pdf.get_y(), w=170, h=64)
        pdf.set_y(pdf.get_y() + 66)

    # =========================================================================
    # PAGE 4: SCREENSHOT 3 & CORE CALCULATION SOURCE CODE
    # =========================================================================
    pdf.add_page()
    
    # Screenshot 3
    s3_path = r"C:\Users\Sam\Desktop\student-grade-calculator\screenshots\grading-scale.png"
    if os.path.exists(s3_path):
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(0, 5, "Figure 3: Grading Scheme & Calculation Rules Reference Matrix", new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)
        pdf.image(s3_path, x=20, y=pdf.get_y(), w=170, h=64)
        pdf.set_y(pdf.get_y() + 67)
    
    # 5. Core Source Code (gradeHelper.js)
    print_section("5. Core Source Code Implementation")
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 5, "5.1 Calculation Helper Functions (src/utils/gradeHelper.js)", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)
    
    helper_code = """// Helper functions for Student Grade Calculator (src/utils/gradeHelper.js)
// 1. Calculate Total Marks
export function calculateTotal(marks) {
  const m1 = Number(marks.subject1) || 0;
  const m2 = Number(marks.subject2) || 0;
  const m3 = Number(marks.subject3) || 0;
  const m4 = Number(marks.subject4) || 0;
  const m5 = Number(marks.subject5) || 0;
  return m1 + m2 + m3 + m4 + m5;
}

// 2. Calculate Average Percentage
export function calculateAverage(total, numberOfSubjects = 5) {
  if (numberOfSubjects === 0) return 0;
  return Number((total / numberOfSubjects).toFixed(2));
}

// 3. Assign Letter Grade based on average marks
export function calculateGrade(average) {
  if (average >= 90) return 'A+';
  if (average >= 80) return 'A';
  if (average >= 70) return 'B';
  if (average >= 60) return 'C';
  if (average >= 50) return 'D';
  return 'F';
}

// 4. Determine Pass or Fail (Requires >= 50 in each subject)
export function checkPassStatus(marks) {
  const list = [marks.subject1, marks.subject2, marks.subject3, marks.subject4, marks.subject5];
  return list.some(m => Number(m) < 50) ? 'Fail' : 'Pass';
}"""

    pdf.set_font("Courier", "", 7.5)
    pdf.set_text_color(40, 40, 40)
    pdf.set_fill_color(243, 244, 246)
    pdf.multi_cell(0, 3.8, helper_code, border=1, fill=True)

    # =========================================================================
    # PAGE 5: MAIN APPLICATION CODE & CONCLUSION
    # =========================================================================
    pdf.add_page()
    
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 5, "5.2 State Management & Hooks (src/App.jsx snippet)", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)

    app_snippet = """// React Hooks in src/App.jsx
const [activePage, setActivePage] = useState('calculator');
const [students, setStudents] = useState(() => {
  const saved = localStorage.getItem('grade_calculator_students');
  return saved ? JSON.parse(saved) : sampleStudents;
});
const [studentData, setStudentData] = useState({
  id: null, name: '', rollNo: '',
  marks: { subject1: '', subject2: '', subject3: '', subject4: '', subject5: '' }
});

// Hook 1: LocalStorage Persistence
useEffect(() => {
  localStorage.setItem('grade_calculator_students', JSON.stringify(students));
}, [students]);

// Hook 2: Reactive Real-time Calculation
useEffect(() => {
  const total = calculateTotal(studentData.marks);
  const average = calculateAverage(total, 5);
  const grade = calculateGrade(average);
  const status = checkPassStatus(studentData.marks);

  setLiveTotal(total);
  setLiveAverage(average);
  setLiveGrade(grade);
  setLiveStatus(status);
}, [studentData.marks]);"""

    pdf.set_font("Courier", "", 8)
    pdf.set_text_color(40, 40, 40)
    pdf.set_fill_color(243, 244, 246)
    pdf.multi_cell(0, 3.8, app_snippet, border=1, fill=True)
    pdf.ln(2)

    # 6. Conclusion & Verification
    pdf.set_text_color(31, 41, 55)
    print_section("6. Conclusion, Verification & Deliverables")
    pdf.set_font("Helvetica", "", 9.5)
    conclusion_txt = (
        "The Student Grade Calculator application successfully meets and exceeds all Task 2 requirements. "
        "It provides robust client-side validation, instant reactive calculations, clear grade mappings, and complete "
        "CRUD functionality across three distinct views. The code remains clean, modular, and easy to maintain "
        "without extraneous dependencies or animations."
    )
    pdf.multi_cell(0, 5.2, conclusion_txt)
    pdf.ln(2)

    # Deliverables Table / Box
    pdf.set_font("Helvetica", "B", 9.5)
    pdf.cell(0, 5, "Submission Links & Verification Details:", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)
    
    delivs = [
        ("Public GitHub Repository", "https://github.com/Gladeeyy/student-grade-calculator"),
        ("Local Project Directory", "C:\\Users\\Sam\\Desktop\\student-grade-calculator"),
        ("Development Server", "http://localhost:5173 (Vite + React)"),
        ("PowerPoint Presentation", "Student_Grade_Calculator_Presentation.pptx (8 slides with screenshots)")
    ]
    for lbl, val in delivs:
        pdf.set_font("Helvetica", "B", 9)
        pdf.cell(50, 5, "- " + lbl + ":", new_x=XPos.RIGHT, new_y=YPos.LAST)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(37, 99, 235) if "http" in val else pdf.set_text_color(31, 41, 55)
        pdf.cell(0, 5, val, new_x="LMARGIN", new_y="NEXT")

    # Output paths
    desktop_pdf = r"C:\Users\Sam\Desktop\Student_Grade_Calculator_Report.pdf"
    project_pdf = r"C:\Users\Sam\Desktop\student-grade-calculator\Student_Grade_Calculator_Report.pdf"

    pdf.output(project_pdf)
    print(f"Project PDF generated: {project_pdf}")

    try:
        pdf.output(desktop_pdf)
        print(f"Desktop PDF generated: {desktop_pdf}")
    except PermissionError:
        desktop_alt = r"C:\Users\Sam\Desktop\Student_Grade_Calculator_Report_New.pdf"
        pdf.output(desktop_alt)
        print(f"Desktop file was locked, generated at: {desktop_alt}")

if __name__ == "__main__":
    generate_pdf_report()
