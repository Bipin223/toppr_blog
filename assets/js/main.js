// Theme Switcher
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Semester Tabs Handling
const semesterTabs = document.querySelectorAll('.tab');
const contentArea = document.querySelector('.content-area');

// TU BCA Curriculum subjects
const semesterSubjects = {
    1: [
        { name: 'Computer Fundamentals & Applications', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Society & Technology', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'English I', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Mathematics I', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Digital Logic', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] }
    ],
    2: [
        { name: 'Financial Accounting', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'English II', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Mathematics II', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'C Programming', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Microprocessor & Computer Architecture', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] }
    ],
    3: [
        { name: 'Data Structures & Algorithms', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Probability & Statistics', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'System Analysis & Design', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'OOP in Java', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Web Technology', materials: ['notes', 'assignments', 'mcqs'] }
    ],
    4: [
        { name: 'Operating System', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Numerical Methods', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Software Engineering', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Scripting Language', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Database Management System', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] }
    ],
    5: [
        { name: 'MIS & E-Business', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'DotNet Technology', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Computer Networking', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Computer Graphics & Animation', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Simulation & Modeling', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] }
    ],
    6: [
        { name: 'Mobile Programming', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Distributed System', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Applied Economics', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Network Programming', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Advanced Java Programming', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] }
    ],
    7: [
        { name: 'Cyber Law & Professional Ethics', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Cloud Computing', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Data Mining & Data Warehousing', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Network Security', materials: ['notes', 'lab-reports', 'assignments', 'mcqs'] },
        { name: 'Enterprise Architecture', materials: ['notes', 'assignments', 'mcqs'] }
    ],
    8: [
        { name: 'Operations Research', materials: ['notes', 'assignments', 'mcqs'] },
        { name: 'Internship', materials: ['notes', 'reports'] },
        { name: 'Project Work', materials: ['notes', 'reports', 'documentation'] }
    ]
};

semesterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const semester = tab.getAttribute('data-semester');
        displaySubjects(semester);
    });
});

function displaySubjects(semester) {
    const subjects = semesterSubjects[semester];
    if (!subjects) return;

    let html = `
        <h2>${semester}${getOrdinalSuffix(semester)} Semester Subjects</h2>
        <div class="subjects-grid">
    `;

    subjects.forEach(subject => {
        html += `
            <div class="subject-card">
                <h3>${subject.name}</h3>
                <div class="materials">
                    ${subject.materials.map(material => `
                        <button class="material-btn" onclick="downloadMaterial('${subject.name}', '${material}')">
                            ${material.charAt(0).toUpperCase() + material.slice(1)}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += '</div>';
    contentArea.innerHTML = html;
}

function getOrdinalSuffix(number) {
    const j = number % 10;
    const k = number % 100;
    if (j == 1 && k != 11) return 'st';
    if (j == 2 && k != 12) return 'nd';
    if (j == 3 && k != 13) return 'rd';
    return 'th';
}

function downloadMaterial(subject, materialType) {
    // This function would handle the actual file download
    // You'll need to implement the server-side logic for this
    alert(`Downloading ${materialType} for ${subject}`);
}

// Add some CSS for the new elements
const style = document.createElement('style');
style.textContent = `
    .subjects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 1rem;
    }

    .subject-card {
        background-color: var(--bg-color);
        border: 2px solid var(--primary-color);
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 5px var(--shadow-color);
    }

    .subject-card h3 {
        color: var(--text-color);
        margin-bottom: 1rem;
    }

    .materials {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }

    .material-btn {
        background-color: var(--secondary-color);
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        color: var(--text-color);
        transition: transform 0.2s ease;
    }

    .material-btn:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
