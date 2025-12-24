# Portfolio Project Page Creation Guidelines

> **Purpose**: This document provides comprehensive specifications for AI agents or developers to create new project pages for Ahmed Kamel's portfolio, ensuring visual consistency, proper messaging, and professional presentation.

---

## Table of Contents

1. [Target Audience & Messaging](#target-audience--messaging)
2. [Project Structure](#project-structure)
3. [Design System](#design-system)
4. [Page Sections Reference](#page-sections-reference)
5. [HTML Template](#html-template)
6. [CSS Reference](#css-reference)
7. [JavaScript Functionality](#javascript-functionality)
8. [Content Guidelines](#content-guidelines)
9. [Asset Requirements](#asset-requirements)
10. [Quality Checklist](#quality-checklist)

---

## Target Audience & Messaging

### Primary Audience
- **Technical Recruiters**: Need quick understanding of skills and impact
- **Hiring Managers**: Want to assess problem-solving ability and technical depth
- **Data Science Teams**: Looking for evidence of rigorous methodology
- **Non-Technical Stakeholders**: Should understand the business value

### Core Messages to Convey

| Message | How to Demonstrate |
|---------|-------------------|
| **Technical Competence** | Show specific technologies, algorithms, and methodologies used |
| **Problem-Solving Ability** | Include Challenges → Solutions section |
| **Business Impact** | Lead with quantifiable metrics ($$, %, time saved) |
| **Attention to Detail** | Professional design, no typos, polished visualizations |
| **Communication Skills** | Clear explanations, interactive dashboards, visual storytelling |

### Tone & Voice
- **Professional but approachable**: Not overly academic
- **Confident without arrogance**: Let results speak for themselves
- **Concise**: Recruiters scan quickly—lead with impact
- **Visual-first**: Show, don't just tell

---

## Project Structure

### File Organization
```
portfolio/
├── index.html              # Main landing page
├── style.css               # Shared landing page styles
├── script.js               # Shared landing page scripts
├── assets/                 # Shared assets (logos, profile photo)
└── projects/
    └── [project-slug]/     # e.g., "rlc-optimizer", "ml-pipeline"
        ├── index.html      # Project page
        ├── style.css       # Project-specific styles
        ├── script.js       # Project-specific scripts
        └── assets/         # Project-specific images, data, embeds
            ├── [infographic].jpg
            ├── [chart1].png
            ├── [chart2].png
            └── [interactive_dashboard].html (optional)
```

### Naming Conventions
- **Project folder**: lowercase with hyphens (e.g., `sentiment-analysis`, `demand-forecasting`)
- **Assets**: descriptive lowercase with underscores (e.g., `model_architecture.png`, `results_comparison.png`)
- **No spaces** in any file or folder names

---

## Design System

### Color Palette

```css
:root {
    /* Backgrounds */
    --bg-dark: #0a0a0f;
    --bg-gradient-start: #0d0d14;
    --surface-dark: #12121a;
    --surface-light: #1a1a24;
    
    /* Accent Colors */
    --accent-primary: #00d9ff;      /* Cyan - primary highlight */
    --accent-secondary: #a855f7;    /* Purple - secondary accent */
    --accent-tertiary: #22d3ee;     /* Light cyan - hover states */
    --accent-success: #10b981;      /* Green - positive metrics */
    --accent-warning: #f59e0b;      /* Orange - warnings/caution */
    
    /* Text */
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    
    /* Glass Effect */
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-bg-hover: rgba(255, 255, 255, 0.06);
    --glass-border: rgba(255, 255, 255, 0.08);
}
```

### Typography

```css
/* Primary Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace (for code/technical) */
font-family: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Weights */
300 - Light (subtle text)
400 - Regular (body text)
500 - Medium (labels, navigation)
600 - Semibold (subtitles, card titles)
700 - Bold (main headings)
```

### Spacing System
```css
/* Section padding */
--section-padding: 100px;

/* Container max-width */
--container-width: 1200px;

/* Card padding */
padding: 24px - 32px;

/* Grid gaps */
gap: 16px - 32px;
```

### Glass Panel Component
All cards and panels use this base style:
```css
.glass-panel {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.glass-panel:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

---

## Page Sections Reference

A project page should include these sections in order. Each section is a full-viewport "slide" with scroll-snap.

### 1. Hero Section
**Purpose**: Immediate impact, establish project identity

| Element | Content |
|---------|---------|
| Badge | Category tag (e.g., "Machine Learning", "Data Engineering") |
| Title | Project name with gradient styling on key words |
| Subtitle | 1-2 sentence description of what the project does |
| Key Metrics | 2-3 cards with headline numbers (use emojis or icons) |
| CTA Button | "Explore the Project" with down arrow |

**Example Metrics Cards**:
```html
<div class="metric-card">
    <span class="metric-value">BYM2 Spatial</span>
    <span class="metric-label">Hierarchical Bayesian with Spatial Correlation</span>
</div>
```

### 2. Framework/Overview Section
**Purpose**: Visual summary of the approach

| Element | Content |
|---------|---------|
| Tag | "The Framework" or "Overview" |
| Title | "From Data to Decisions" or similar |
| Description | Brief explanation of methodology |
| Visual | Full-width infographic showing the data pipeline |

**Infographic Requirements**:
- Dark background to match theme
- Shows data flow: Input → Processing → Output
- Uses cyan/purple accent colors
- Maximum 5-6 steps

### 3. Problem Statement Section
**Purpose**: Establish why this project matters

| Element | Content |
|---------|---------|
| Tag | "The Challenge" |
| Title | "Why This Matters" |
| Cards | 3-4 problem cards in grid layout |

**Problem Card Format**:
```html
<div class="problem-card glass-panel">
    <div class="problem-icon">🚦</div>  <!-- Use relevant emoji -->
    <h3>Problem Title</h3>
    <p>Brief 1-2 sentence description</p>
</div>
```

### 4. Methodology Section
**Purpose**: Show the technical approach

| Element | Content |
|---------|---------|
| Tag | "The Approach" |
| Title | "Methodology Pipeline" |
| Flow | Horizontal step-by-step flow with arrows |

**Step Format**:
```html
<div class="flow-step glass-panel">
    <div class="step-number">1</div>
    <h3>Step Name</h3>
    <p>Brief description of what happens</p>
</div>
<div class="flow-arrow">→</div>
```

### 5. Technical Deep Dive Section (Carousel)
**Purpose**: Detailed technical explanation for interested viewers

| Element | Content |
|---------|---------|
| Tag | "Under the Hood" |
| Title | "Technical Deep Dive" |
| Carousel | 3-5 cards with detailed technical info |

**Technical Card Format**:
```html
<div class="tech-card glass-panel">
    <div class="tech-icon">🧠</div>
    <h3>Technical Component Name</h3>
    <p><strong>Key metric or achievement</strong> description of the approach and why it matters.</p>
    <div class="tech-tags">
        <span class="tag">Technology1</span>
        <span class="tag">Technology2</span>
    </div>
</div>
```

### 6. Key Innovation Section (Carousel)
**Purpose**: Highlight what makes this project unique

| Element | Content |
|---------|---------|
| Tag | "Key Innovation" |
| Title | Specific innovation name |
| Carousel | Before/after comparisons, visualizations |

### 7. Challenges & Solutions Section (Carousel)
**Purpose**: Demonstrate problem-solving ability

| Element | Content |
|---------|---------|
| Tag | "Problem Solving" |
| Title | "Challenges & Solutions" |
| Carousel | 3-5 challenge → solution pairs |

**Challenge Card Format**:
```html
<div class="challenge-card glass-panel">
    <div class="challenge-problem">
        <span class="label">Challenge</span>
        <h3>Problem Title</h3>
        <p>Description of the problem</p>
    </div>
    <div class="challenge-arrow">→</div>
    <div class="challenge-solution">
        <span class="label solution-label">Solution</span>
        <h3>Solution Title</h3>
        <p>How you solved it, with <strong>quantified impact</strong></p>
    </div>
</div>
```

### 8. Results Section
**Purpose**: Showcase outcomes with proof

| Element | Content |
|---------|---------|
| Tag | "Outcomes" |
| Title | "Results & Impact" |
| Metrics | 3 result cards with icons and numbers |
| Gallery | Carousel of result visualizations |

**Result Metric Format**:
```html
<div class="result-metric glass-panel">
    <span class="result-icon">💰</span>
    <div class="result-content">
        <span class="result-value">$9.2M</span>
        <span class="result-label">Net Societal Benefit</span>
    </div>
</div>
```

### 9. Interactive Dashboard Section (Optional)
**Purpose**: Allow exploration of results

| Element | Content |
|---------|---------|
| Tag | "Explore" |
| Title | "Interactive Dashboard" |
| Embed | Full-width iframe containing interactive visualization |

**Dashboard Requirements**:
- Should work as standalone HTML file
- Dark theme to match portfolio
- Include controls (sliders, toggles)
- Mobile-responsive

### 10. Skills Section
**Purpose**: Summarize demonstrated competencies

| Element | Content |
|---------|---------|
| Tag | "Expertise" |
| Title | "Skills Demonstrated" |
| Grid | 4-6 skill categories with badges |

**Skill Category Format**:
```html
<div class="skill-category glass-panel">
    <h3>Category Name</h3>
    <div class="skill-items">
        <span class="skill-badge">Skill 1</span>
        <span class="skill-badge">Skill 2</span>
    </div>
</div>
```

### 11. Footer/Summary Section
**Purpose**: Key takeaway and links

| Element | Content |
|---------|---------|
| Tag | "Summary" |
| Title | "Key Takeaway" |
| Text | 2-3 sentence summary of project impact |
| Affiliations | Logos of collaborating organizations (if any) |
| Links | Resume (placeholder), LinkedIn |
| Copyright | "© [Year] Ahmed Kamel" |

---

## HTML Template

Use this as a starting point for new project pages:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Project Name] | Portfolio | Ahmed Kamel</title>
    <meta name="description" content="[Brief description for SEO]">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="../../index.html" class="nav-back" style="color: var(--text-secondary); margin-right: 24px; display: flex; align-items: center; gap: 6px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Portfolio
            </a>
            <a href="#hero" class="nav-logo">[Project]<span>Name</span></a>
            <ul class="nav-links">
                <li><a href="#problem">Problem</a></li>
                <li><a href="#methodology">Methodology</a></li>
                <li><a href="#technical">Technical</a></li>
                <li><a href="#results">Results</a></li>
                <li><a href="#skills">Skills</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
        <!-- ... hero content ... -->
    </section>

    <!-- Additional sections follow the patterns above -->

    <!-- Scripts -->
    <script src="script.js"></script>
</body>
</html>
```

---

## CSS Reference

### Critical Classes to Use

| Class | Purpose |
|-------|---------|
| `.section` | Full-viewport section with scroll-snap |
| `.section-alt` | Alternate background color for contrast |
| `.container` | Centered content container (max-width 1200px) |
| `.glass-panel` | Glassmorphism card effect |
| `.section-header` | Centered section header with tag + title |
| `.section-tag` | Small uppercase label above title |
| `.section-title` | Main section heading |
| `.gradient-text` | Cyan-to-purple gradient text |
| `.carousel` | Horizontal scrolling carousel |
| `.carousel-item` | Individual carousel slide |

### Copy the style.css from rlc-optimizer
The RLC Optimizer project has the complete CSS file. Copy it for new projects and modify as needed.

---

## JavaScript Functionality

### Required Features

1. **Scroll Snapping**: Keyboard navigation (↑/↓ arrows)
2. **Carousel Controls**: Prev/next buttons, dots, keyboard (←/→)
3. **Section Navigation Dots**: Right-side dot indicators
4. **Intersection Observer**: Reveal animations on scroll
5. **Smooth Scrolling**: For navigation links

### Copy script.js from rlc-optimizer
The existing script.js handles all functionality. Copy and adjust selectors as needed.

---

## Content Guidelines

### Writing Style

1. **Lead with impact**: Start descriptions with the most impressive outcome
2. **Use active voice**: "Developed" not "Was developed"
3. **Quantify everything**: Numbers are more memorable than adjectives
4. **Be specific**: "60% RMSE reduction" not "significant improvement"

### Metric Formatting

| Type | Format | Example |
|------|--------|---------|
| Money | $X.XM or $XXK | $9.2M, $120K |
| Percentages | XX% | 60%, 3.93:1 |
| Multiples | XX× or X.X:1 | 15×, 3.9:1 |
| Counts | ~XX or X,XXX | ~43, 1,500+ |
| Time | Xh to Xs, Xms | "hours to 30 seconds" |

### Emoji Usage
Use emojis sparingly for visual interest in cards:
- 🧠 AI/ML/Models
- ⚡ Speed/Performance
- 🎯 Optimization/Accuracy
- 📊 Analytics/Visualization
- 💰 Business Value/Money
- 🚦 Domain-specific (traffic)
- 📂 Data/Files

---

## Asset Requirements

### Infographic (Required)
- **Dimensions**: 1200×600px or similar aspect ratio
- **Format**: JPG or PNG
- **Background**: Dark (#0a0a0f to #12121a gradient)
- **Content**: Data pipeline showing Input → Process → Output
- **Colors**: Use accent colors (cyan #00d9ff, purple #a855f7)

### Result Charts (3-5 Required)
- **Dimensions**: 800×600px or similar
- **Format**: PNG with transparent or dark background
- **Style**: Consistent with matplotlib dark theme
- **Include**: Clear titles, labels, legends

### Project Thumbnail (Required for Landing Page)
- **Dimensions**: 1200×800px or similar
- **Format**: JPG or PNG
- **Content**: Most visually impressive output or infographic
- **Location**: Copy to `portfolio/assets/[project]_thumbnail.jpg`

### Interactive Dashboard (Optional)
- **Format**: Self-contained HTML file
- **Dependencies**: Inline or CDN-linked
- **Theme**: Dark to match portfolio

---

## Quality Checklist

Before publishing a new project page, verify:

### Content
- [ ] All sections have content (no Lorem ipsum)
- [ ] All metrics are accurate and sourced
- [ ] No spelling or grammar errors
- [ ] All links work (navigation, back to portfolio)
- [ ] SEO meta description is set

### Visual
- [ ] All images load correctly
- [ ] Images are not cropped unexpectedly
- [ ] Dark theme is consistent throughout
- [ ] Carousels scroll smoothly
- [ ] Section navigation dots work
- [ ] Keyboard navigation works (↑/↓/←/→)

### Technical
- [ ] No console errors
- [ ] Responsive on mobile (768px breakpoint)
- [ ] Fast load time (optimize images)
- [ ] Back to portfolio link works

### Integration
- [ ] Project card added to landing page `index.html`
- [ ] Thumbnail added to `portfolio/assets/`
- [ ] Folder structure follows conventions

---

## Example: Adding a New Project

### Step 1: Create Folder Structure
```powershell
mkdir portfolio/projects/new-project
mkdir portfolio/projects/new-project/assets
```

### Step 2: Copy Template Files
```powershell
copy portfolio/projects/rlc-optimizer/style.css portfolio/projects/new-project/
copy portfolio/projects/rlc-optimizer/script.js portfolio/projects/new-project/
```

### Step 3: Create index.html
Use the HTML template above, replacing placeholders with project-specific content.

### Step 4: Add Assets
Place all images in `portfolio/projects/new-project/assets/`

### Step 5: Update Landing Page
Add project card to `portfolio/index.html`:
```html
<a href="projects/new-project/index.html" class="project-card glass-panel">
    <div class="project-thumbnail">
        <img src="assets/new_project_thumbnail.jpg" alt="Project Description">
        <div class="project-overlay">
            <span>View Project →</span>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Brief description</p>
        <div class="project-tags">
            <span class="tag">Tech1</span>
            <span class="tag">Tech2</span>
        </div>
        <div class="project-metrics">
            <div class="metric">
                <span class="metric-value">XX%</span>
                <span class="metric-label">Key Metric</span>
            </div>
        </div>
    </div>
</a>
```

### Step 6: Test
1. Open landing page in browser
2. Click new project card
3. Navigate through all sections
4. Test keyboard navigation
5. Check mobile responsiveness

---

## Contact

For questions about these guidelines:
- **Owner**: Ahmed Kamel
- **LinkedIn**: https://www.linkedin.com/in/akamel01/

---

*Last Updated: December 2024*
