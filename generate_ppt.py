import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette - Professional Academic Theme
    DARK_BLUE = RGBColor(15, 23, 42)    # #0f172a
    ACCENT_BLUE = RGBColor(37, 99, 235)  # #2563eb
    LIGHT_BG = RGBColor(248, 250, 252)   # #f8fafc
    TEXT_DARK = RGBColor(30, 41, 59)     # #1e293b
    TEXT_MUTED = RGBColor(100, 116, 139) # #64748b
    WHITE = RGBColor(255, 255, 255)
    CARD_BG = RGBColor(255, 255, 255)
    BORDER_COLOR = RGBColor(203, 213, 225)

    blank_layout = prs.slide_layouts[6]

    def add_header(slide, title_text, subtitle_text):
        # Header banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(1.1))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p1 = tf.paragraphs[0]
        p1.text = title_text
        p1.font.size = Pt(24)
        p1.font.bold = True
        p1.font.color.rgb = DARK_BLUE

        p2 = tf.add_paragraph()
        p2.text = subtitle_text
        p2.font.size = Pt(13)
        p2.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    
    # Background shape
    bg = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = DARK_BLUE
    bg.line.fill.background()

    # Title Card
    tbox = slide1.shapes.add_textbox(Inches(1.2), Inches(1.8), Inches(11.0), Inches(4.5))
    tf1 = tbox.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "Student Grade Calculator"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.space_after = Pt(12)

    p_sub = tf1.add_paragraph()
    p_sub.text = "Interactive JavaScript & ReactJS Application Development"
    p_sub.font.size = Pt(20)
    p_sub.font.color.rgb = RGBColor(96, 165, 250)
    p_sub.space_after = Pt(24)

    p_div = tf1.add_paragraph()
    p_div.text = "Problem Statement: \"Enter marks, calculate total and average, assign grades, and display results.\""
    p_div.font.size = Pt(14)
    p_div.font.color.rgb = RGBColor(226, 232, 240)
    p_div.space_after = Pt(30)

    p_meta = tf1.add_paragraph()
    p_meta.text = "Course: Full Stack Web Development  |  Class: III CSE — F Section\nSubmission for Task 2 Self-Learning Evaluation"
    p_meta.font.size = Pt(14)
    p_meta.font.color.rgb = RGBColor(148, 163, 184)

    # -------------------------------------------------------------
    # SLIDE 2: Project Objectives & Core Features
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "1. Project Overview & Core Features", "Simple, automated marks entry and grade calculation for students")

    # Left Column: Objectives
    left_box = slide2.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0))
    ltf = left_box.text_frame
    ltf.word_wrap = True

    p = ltf.paragraphs[0]
    p.text = "Project Objective"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    p2 = ltf.add_paragraph()
    p2.text = "To develop a clean, responsive single-page web application using ReactJS that eliminates manual calculation errors and provides instant academic grade evaluation."
    p2.font.size = Pt(13)
    p2.font.color.rgb = TEXT_DARK
    p2.space_after = Pt(20)

    p_req = ltf.add_paragraph()
    p_req.text = "Key Requirements Fulfilled"
    p_req.font.size = Pt(18)
    p_req.font.bold = True
    p_req.font.color.rgb = ACCENT_BLUE
    p_req.space_after = Pt(10)

    reqs = [
        "Interactive React components with JSX",
        "State management using useState & useEffect",
        "Form handling with client-side validation (0 - 100 range)",
        "3 functional pages/views without complex page reloads",
        "Interactive CRUD: Add, Search, Filter, Edit, and Delete"
    ]
    for req in reqs:
        pr = ltf.add_paragraph()
        pr.text = "• " + req
        pr.font.size = Pt(12)
        pr.font.color.rgb = TEXT_DARK
        pr.space_after = Pt(6)

    # Right Column: Core Features Card
    right_box = slide2.shapes.add_textbox(Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0))
    rtf = right_box.text_frame
    rtf.word_wrap = True

    p = rtf.paragraphs[0]
    p.text = "Core Features"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    features = [
        ("Student Details Input", "Captures Student Full Name and Roll Number with validation."),
        ("5 Subject Marks Entry", "Inputs marks for Web Dev, DBMS, DSA, OS, and Networks."),
        ("Real-Time Calculations", "Instantly updates Total (out of 500), Average (%), Grade, and Pass/Fail status as marks are typed."),
        ("Student Records Directory", "Saves records in a table with search by name/roll no, filter by grade/status, and edit/delete actions."),
        ("Browser Persistence", "Uses localStorage so student records stay saved on page refresh.")
    ]
    for title, desc in features:
        pf = rtf.add_paragraph()
        pf.text = f"• {title}: "
        pf.font.size = Pt(12)
        pf.font.bold = True
        pf.font.color.rgb = TEXT_DARK
        
        # Add normal text
        run = pf.add_run()
        run.text = desc
        run.font.bold = False
        run.font.color.rgb = TEXT_MUTED
        pf.space_after = Pt(8)

    # -------------------------------------------------------------
    # SLIDE 3: Technical Architecture & React Concepts
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "2. Technical Architecture & React Concepts", "Clean modular structure designed for easy comprehension and explanation")

    # Column 1: Components
    c1 = slide3.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(3.7), Inches(5.0))
    t1 = c1.text_frame
    t1.word_wrap = True

    p = t1.paragraphs[0]
    p.text = "Modular Components"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    comps = [
        ("Navbar.jsx", "Top menu bar to switch between the 3 functional pages."),
        ("GradeCalculator.jsx", "Form to enter student marks and live results display box."),
        ("StudentRecords.jsx", "Table of saved records with search, filter, edit & delete."),
        ("GradingScale.jsx", "Reference table showing grading rules and cutoffs.")
    ]
    for cname, cdesc in comps:
        pc = t1.add_paragraph()
        pc.text = f"• {cname}: "
        pc.font.size = Pt(11)
        pc.font.bold = True
        pc.font.color.rgb = TEXT_DARK
        r = pc.add_run()
        r.text = cdesc
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED
        pc.space_after = Pt(8)

    # Column 2: React Hooks
    c2 = slide3.shapes.add_textbox(Inches(4.8), Inches(1.8), Inches(3.7), Inches(5.0))
    t2 = c2.text_frame
    t2.word_wrap = True

    p = t2.paragraphs[0]
    p.text = "React Hooks Used"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    hooks = [
        ("useState (Navigation)", "Tracks activePage ('calculator', 'records', 'scale')."),
        ("useState (Form Data)", "Stores student name, roll number, and 5 subject marks."),
        ("useState (Records)", "Maintains the list of all saved student records."),
        ("useState (Results)", "Stores computed live total, average, grade, and status."),
        ("useEffect (Auto-Compute)", "Re-calculates totals and grades immediately whenever marks change."),
        ("useEffect (Storage)", "Saves records to browser localStorage automatically.")
    ]
    for hname, hdesc in hooks:
        ph = t2.add_paragraph()
        ph.text = f"• {hname}: "
        ph.font.size = Pt(11)
        ph.font.bold = True
        ph.font.color.rgb = TEXT_DARK
        r = ph.add_run()
        r.text = hdesc
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED
        ph.space_after = Pt(8)

    # Column 3: Pure Math Helpers
    c3 = slide3.shapes.add_textbox(Inches(8.8), Inches(1.8), Inches(3.7), Inches(5.0))
    t3 = c3.text_frame
    t3.word_wrap = True

    p = t3.paragraphs[0]
    p.text = "Helper Logic (gradeHelper.js)"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    helpers = [
        ("calculateTotal()", "Sums all 5 subject marks (maximum 500)."),
        ("calculateAverage()", "Divides total marks by 5 to find percentage."),
        ("calculateGrade()", "Maps average % to letter grades (A+ to F)."),
        ("checkPassStatus()", "Verifies that every subject has ≥ 50 marks. If any subject < 50, marks status as Fail.")
    ]
    for hname, hdesc in helpers:
        ph = t3.add_paragraph()
        ph.text = f"• {hname}: "
        ph.font.size = Pt(11)
        ph.font.bold = True
        ph.font.color.rgb = TEXT_DARK
        r = ph.add_run()
        r.text = hdesc
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED
        ph.space_after = Pt(8)

    # -------------------------------------------------------------
    # SLIDE 4: Application Workflow & Grading Rules
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "3. Application Workflow & Grading Scheme", "Step-by-step user interaction and academic evaluation criteria")

    # Left Column: Step-by-Step Workflow
    w_box = slide4.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(5.8), Inches(5.0))
    wtf = w_box.text_frame
    wtf.word_wrap = True

    p = wtf.paragraphs[0]
    p.text = "Step-by-Step Application Workflow"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    steps = [
        ("Step 1: Input Details", "Enter student name, roll number, and 5 subject marks."),
        ("Step 2: Instant Feedback", "The live results card calculates Total, Average %, Grade, and Pass/Fail status in real time."),
        ("Step 3: Validation Check", "Ensures marks are valid numbers between 0 and 100 and fields are not empty."),
        ("Step 4: Save to Directory", "Clicking 'Calculate & Save Record' adds the student to records and opens the directory view."),
        ("Step 5: Search, Filter & Edit", "Users can search by name/roll no, filter by grade/status, edit existing records, or delete records.")
    ]
    for title, desc in steps:
        ps = wtf.add_paragraph()
        ps.text = f"{title}: "
        ps.font.size = Pt(11.5)
        ps.font.bold = True
        ps.font.color.rgb = TEXT_DARK
        r = ps.add_run()
        r.text = desc
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED
        ps.space_after = Pt(8)

    # Right Column: Grading Rules Table
    g_box = slide4.shapes.add_textbox(Inches(6.9), Inches(1.8), Inches(5.6), Inches(5.0))
    gtf = g_box.text_frame
    gtf.word_wrap = True

    p = gtf.paragraphs[0]
    p.text = "Standard Grading Scheme"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    grades = [
        ("90% – 100%", "A+", "Outstanding / Distinction"),
        ("80% – 89%", "A", "Excellent"),
        ("70% – 79%", "B", "Very Good"),
        ("60% – 69%", "C", "Good / First Class"),
        ("50% – 59%", "D", "Satisfactory / Second Class"),
        ("Below 50%", "F", "Fail / Re-appear")
    ]
    for rng, grd, rem in grades:
        pg = gtf.add_paragraph()
        pg.text = f"• {rng}  ➔  "
        pg.font.size = Pt(11.5)
        pg.font.bold = False
        pg.font.color.rgb = TEXT_DARK

        r1 = pg.add_run()
        r1.text = f"Grade {grd} "
        r1.font.bold = True
        r1.font.color.rgb = ACCENT_BLUE

        r2 = pg.add_run()
        r2.text = f"({rem})"
        r2.font.color.rgb = TEXT_MUTED
        pg.space_after = Pt(6)

    p_rule = gtf.add_paragraph()
    p_rule.text = "\n* Passing Condition: A student must score ≥ 50 marks in each individual subject to pass. Scoring < 50 in even one subject marks the student as 'Fail'."
    p_rule.font.size = Pt(10.5)
    p_rule.font.italic = True
    p_rule.font.color.rgb = RGBColor(185, 28, 28)

    # -------------------------------------------------------------
    # SLIDE 5: Demonstration & Conclusion
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "4. Demonstration, Conclusion & Links", "Live project demonstration highlights and submission deliverables")

    # Left Column: Demo highlights
    d_box = slide5.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(5.8), Inches(5.0))
    dtf = d_box.text_frame
    dtf.word_wrap = True

    p = dtf.paragraphs[0]
    p.text = "Key Demonstration Highlights"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    points = [
        ("Responsive Layout", "Works cleanly across desktop screens and smaller mobile devices."),
        ("No External Clutter", "Pure ReactJS and CSS without heavy animations or transitions for simple explanation."),
        ("Full CRUD Capabilities", "Create new scorecards, Read/Search directory, Update/Edit marks, and Delete."),
        ("Local Persistence", "Data is safely stored in browser localStorage."),
        ("Instant Calculation", "useEffect eliminates any delay in computing average, total, and letter grades.")
    ]
    for title, desc in points:
        pd = dtf.add_paragraph()
        pd.text = f"• {title}: "
        pd.font.size = Pt(11.5)
        pd.font.bold = True
        pd.font.color.rgb = TEXT_DARK
        r = pd.add_run()
        r.text = desc
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED
        pd.space_after = Pt(8)

    # Right Column: Deliverables & Links
    r_box = slide5.shapes.add_textbox(Inches(6.9), Inches(1.8), Inches(5.6), Inches(5.0))
    rtf2 = r_box.text_frame
    rtf2.word_wrap = True

    p = rtf2.paragraphs[0]
    p.text = "Submission Deliverables"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE
    p.space_after = Pt(10)

    deliverables = [
        ("ReactJS Source Code", "Organized into components, utils, and styles."),
        ("Public GitHub Repository", "https://github.com/Gladeeyy/student-grade-calculator"),
        ("Live Development Server", "Running locally at http://localhost:5173"),
        ("Screenshots Included", "Embedded in README.md and repository"),
        ("PowerPoint Presentation", "5 structured slides prepared for evaluation viva")
    ]
    for item, val in deliverables:
        pdel = rtf2.add_paragraph()
        pdel.text = f"✔ {item}:\n   "
        pdel.font.size = Pt(11.5)
        pdel.font.bold = True
        pdel.font.color.rgb = TEXT_DARK

        r = pdel.add_run()
        r.text = val
        r.font.bold = False
        r.font.color.rgb = ACCENT_BLUE if "http" in val else TEXT_MUTED
        pdel.space_after = Pt(8)

    # -------------------------------------------------------------
    # SLIDE 6: Screenshot 1 - Grade Calculator View
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "5. Screenshot: Grade Calculator View", "Real-time calculation of total, average, letter grade, and pass/fail status")
    
    img_path1 = r"C:\Users\Sam\Desktop\student-grade-calculator\screenshots\grade-calculator.png"
    if os.path.exists(img_path1):
        slide6.shapes.add_picture(img_path1, Inches(1.416), Inches(1.6), width=Inches(10.5), height=Inches(5.4))

    # -------------------------------------------------------------
    # SLIDE 7: Screenshot 2 - Student Records Directory
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    add_header(slide7, "6. Screenshot: Student Records Directory", "Interactive table with search by name/roll no, filtering, edit and delete")
    
    img_path2 = r"C:\Users\Sam\Desktop\student-grade-calculator\screenshots\student-records.png"
    if os.path.exists(img_path2):
        slide7.shapes.add_picture(img_path2, Inches(1.416), Inches(1.6), width=Inches(10.5), height=Inches(5.4))

    # -------------------------------------------------------------
    # SLIDE 8: Screenshot 3 - Grading Scheme & Calculation Rules
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    add_header(slide8, "7. Screenshot: Grading Scheme & Rules", "Reference table showing marks percentage cutoffs, assigned grades, and formulas")
    
    img_path3 = r"C:\Users\Sam\Desktop\student-grade-calculator\screenshots\grading-scale.png"
    if os.path.exists(img_path3):
        slide8.shapes.add_picture(img_path3, Inches(1.416), Inches(1.6), width=Inches(10.5), height=Inches(5.4))

    # Save to both project directory and Desktop
    project_ppt = r"C:\Users\Sam\Desktop\student-grade-calculator\Student_Grade_Calculator_Presentation.pptx"
    desktop_ppt = r"C:\Users\Sam\Desktop\Student_Grade_Calculator_Presentation.pptx"

    prs.save(project_ppt)
    prs.save(desktop_ppt)
    print(f"Presentation saved successfully to:\n1. {project_ppt}\n2. {desktop_ppt}")

if __name__ == "__main__":
    create_presentation()
